import * as tf from '@tensorflow/tfjs';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as FileSystem from 'react-native-fs';

export class ImagePreprocessor {
  constructor() {
    // Configure based on your model's input requirements
    this.imageSize = 224; // Common sizes: 224, 299, 512
    this.numChannels = 3; // RGB
  }

  /**
   * Load image from URI and preprocess
   */
  async loadAndPreprocessImage(imageUri) {
    try {
      // Step 1: Read image file as base64
      const imageBase64 = await FileSystem.readFile(imageUri, 'base64');
      const imageBuffer = Buffer.from(imageBase64, 'base64');
      const uint8Array = new Uint8Array(imageBuffer);

      // Step 2: Decode JPEG to tensor
      const imageTensor = decodeJpeg(uint8Array);

      // Step 3: Resize image
      const resized = tf.image.resizeBilinear(
        imageTensor,
        [this.imageSize, this.imageSize]
      );

      // Step 4: Normalize pixel values
      // Option A: Normalize to [0, 1]
      const normalized = resized.div(255.0);

      // Option B: Standardize (if your model was trained with standardization)
      // const mean = [0.485, 0.456, 0.406];
      // const std = [0.229, 0.224, 0.225];
      // const normalized = resized.div(255.0).sub(mean).div(std);

      // Step 5: Add batch dimension
      const batched = normalized.expandDims(0);

      // Cleanup intermediate tensors
      imageTensor.dispose();
      resized.dispose();
      normalized.dispose();

      return batched;

    } catch (error) {
      console.error('Image preprocessing error:', error);
      throw error;
    }
  }

  /**
   * Apply data augmentation (optional, for training)
   */
  augmentImage(imageTensor) {
    // Random flip
    const flipped = tf.image.flipLeftRight(imageTensor);
    
    // Random brightness
    const brightness = tf.image.adjustBrightness(flipped, Math.random() * 0.2 - 0.1);
    
    // Random contrast
    const contrasted = tf.image.adjustContrast(brightness, 1 + Math.random() * 0.2 - 0.1);
    
    return contrasted;
  }
}