import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView
} from 'react-native';
import PlantCamera from '../components/PlantCamera';
import MLService from '../services/MLService';
import { styles } from '../styles/HomeStyles';
import Icon from 'react-native-vector-icons/Ionicons';

export default function DiagnoseScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [plantType, setPlantType] = useState('coffee');
  const [mlInitialized, setMlInitialized] = useState(false);
  const [initializingML, setInitializingML] = useState(true);

  useEffect(() => {
    initializeMLService();
  }, []);

  const initializeMLService = async () => {
    try {
      setInitializingML(true);
      await MLService.initialize();
      setMlInitialized(true);
      console.log('ML Service ready');
    } catch (error) {
      console.error('Failed to initialize ML:', error);
      Alert.alert(
        'Initialization Error',
        'Failed to load AI models. Please restart the app.',
        [{ text: 'OK' }]
      );
    } finally {
      setInitializingML(false);
    }
  };

  const handleCapture = (imageUri) => {
    setImage(imageUri);
  };

  const analyzeImage = async () => {
    if (!image) {
      Alert.alert('Error', 'Please capture an image first');
      return;
    }

    if (!mlInitialized) {
      Alert.alert('Error', 'AI models are not ready yet. Please wait.');
      return;
    }

    setAnalyzing(true);
    try {
      // Use real ML model
      const result = await MLService.predictDisease(image, plantType);
      
      setAnalyzing(false);
      navigation.navigate('Result', { result, imageUri: image });
    } catch (error) {
      setAnalyzing(false);
      console.error('Analysis error:', error);
      Alert.alert(
        'Analysis Failed',
        'Failed to analyze the image. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  if (initializingML) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading AI Models...</Text>
          <Text style={styles.loadingSubtext}>
            This may take a few moments on first launch
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.screenTitle}>AI Plant Diagnosis 🔍</Text>

      {/* Plant Type Selector */}
      <View style={styles.plantTypeSelector}>
        <Text style={styles.selectorLabel}>Select Plant Type:</Text>
        <View style={styles.plantTypeButtons}>
          <TouchableOpacity
            style={[
              styles.plantTypeButton,
              plantType === 'coffee' && styles.plantTypeButtonActive
            ]}
            onPress={() => setPlantType('coffee')}
          >
            <Icon 
              name="cafe" 
              size={24} 
              color={plantType === 'coffee' ? '#fff' : '#4CAF50'} 
            />
            <Text
              style={[
                styles.plantTypeButtonText,
                plantType === 'coffee' && styles.plantTypeButtonTextActive
              ]}
            >
              Coffee
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.plantTypeButton,
              plantType === 'jute' && styles.plantTypeButtonActive
            ]}
            onPress={() => setPlantType('jute')}
          >
            <Icon 
              name="leaf" 
              size={24} 
              color={plantType === 'jute' ? '#fff' : '#4CAF50'} 
            />
            <Text
              style={[
                styles.plantTypeButtonText,
                plantType === 'jute' && styles.plantTypeButtonTextActive
              ]}
            >
              Jute
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.diagnoseContainer}>
        <PlantCamera onCapture={handleCapture} capturedImage={image} />

        {image && !analyzing && (
          <View style={styles.diagnoseActions}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setImage(null)}
            >
              <Text style={styles.secondaryButtonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={analyzeImage}
            >
              <Text style={styles.primaryButtonText}>
                Analyze {plantType.charAt(0).toUpperCase() + plantType.slice(1)}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {analyzing && (
          <View style={styles.analyzingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.analyzingText}>
              AI Analysis in Progress...
            </Text>
            <Text style={styles.analyzingSubtext}>
              Analyzing {plantType} plant for diseases and pests
            </Text>
          </View>
        )}
      </View>

      {/* Tips */}
      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>📸 Photo Tips</Text>
        <View style={styles.tipItem}>
          <Icon name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.tipText}>
            Take photo in good natural lighting
          </Text>
        </View>
        <View style={styles.tipItem}>
          <Icon name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.tipText}>
            Focus on affected leaves if disease is suspected
          </Text>
        </View>
        <View style={styles.tipItem}>
          <Icon name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.tipText}>
            Keep camera steady and avoid blurry images
          </Text>
        </View>
        <View style={styles.tipItem}>
          <Icon name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.tipText}>
            Fill the frame with the plant leaf
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}