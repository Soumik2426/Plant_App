import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as FileSystem from 'react-native-fs';
import { ImagePreprocessor } from './ImagePreprocessor';
import { DiseaseClassifier } from './DiseaseClassifier';

class MLService {
  constructor() {
    this.models = {
      coffee: null,
      jute: null
    };
    this.isInitialized = false;
    this.preprocessor = new ImagePreprocessor();
    this.classifier = new DiseaseClassifier();
  }

  /**
   * Initialize TensorFlow and load models
   */
  async initialize() {
    if (this.isInitialized) return;

    try {
      // Wait for TensorFlow to be ready
      await tf.ready();
      console.log('TensorFlow.js initialized');

      // Load both models
      await this.loadModels();
      
      this.isInitialized = true;
      console.log('ML Service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize ML Service:', error);
      throw error;
    }
  }

  /**
   * Load trained models for coffee and jute
   */
  async loadModels() {
    try {
      // Option A: Load from local bundle (recommended)
      // Place your model.json and weight files in assets/models/
      
      // Coffee model
      const coffeeModelJson = require('../assets/models/coffee/model.json');
      const coffeeModelWeights = require('../assets/models/coffee/weights.bin');
      this.models.coffee = await tf.loadLayersModel(
        bundleResourceIO(coffeeModelJson, coffeeModelWeights)
      );
      console.log('Coffee model loaded');

      // Jute model
      const juteModelJson = require('../assets/models/jute/model.json');
      const juteModelWeights = require('../assets/models/jute/weights.bin');
      this.models.jute = await tf.loadLayersModel(
        bundleResourceIO(juteModelJson, juteModelWeights)
      );
      console.log('Jute model loaded');

      // Option B: Load from remote URL (for updates without app release)
      // this.models.coffee = await tf.loadLayersModel(
      //   'https://your-server.com/models/coffee/model.json'
      // );
      // this.models.jute = await tf.loadLayersModel(
      //   'https://your-server.com/models/jute/model.json'
      // );

    } catch (error) {
      console.error('Failed to load models:', error);
      throw error;
    }
  }

  /**
   * Detect plant type from image
   */
  async detectPlantType(imageUri) {
    // Simple heuristic or use a separate classifier
    // For now, you can ask user to select plant type
    // Or train a separate model to detect plant type first
    return 'coffee'; // or 'jute'
  }

  /**
   * Predict disease from image
   * @param {string} imageUri - URI of the captured image
   * @param {string} plantType - 'coffee' or 'jute'
   */
  async predictDisease(imageUri, plantType = 'coffee') {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      console.log(`Analyzing ${plantType} plant image...`);

      // Step 1: Load and preprocess image
      const imageTensor = await this.preprocessor.loadAndPreprocessImage(imageUri);

      // Step 2: Select appropriate model
      const model = this.models[plantType];
      if (!model) {
        throw new Error(`Model for ${plantType} not loaded`);
      }

      // Step 3: Make prediction
      const predictions = await model.predict(imageTensor);
      const predictionData = await predictions.data();

      // Step 4: Clean up tensors to prevent memory leaks
      imageTensor.dispose();
      predictions.dispose();

      // Step 5: Process predictions
      const result = this.classifier.processePredictions(
        predictionData,
        plantType
      );

      console.log('Prediction result:', result);
      return result;

    } catch (error) {
      console.error('Prediction error:', error);
      throw error;
    }
  }

  /**
   * Batch prediction for multiple images
   */
  async predictBatch(imageUris, plantType = 'coffee') {
    const results = [];
    for (const uri of imageUris) {
      const result = await this.predictDisease(uri, plantType);
      results.push(result);
    }
    return results;
  }

  /**
   * Cleanup resources
   */
  dispose() {
    if (this.models.coffee) {
      this.models.coffee.dispose();
    }
    if (this.models.jute) {
      this.models.jute.dispose();
    }
    this.isInitialized = false;
  }
}

// Singleton instance
export default new MLService();