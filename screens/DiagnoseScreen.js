// ==========================================
// FILE: screens/DiagnoseScreen.js
// ==========================================
import React, { useState } from 'react';
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

  const handleCapture = (imageUri) => {
    setImage(imageUri);
  };

  const analyzeImage = async () => {
    if (!image) {
      Alert.alert('Error', 'Please capture or select an image first');
      return;
    }

    setAnalyzing(true);
    try {
      const result = await MLService.predictDiseaseRemote(image);
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
              plantType === 'Sugarcane' && styles.plantTypeButtonActive
            ]}
            onPress={() => setPlantType('Sugarcane')}
          >
            <Icon
              name="leaf"
              size={24}
              color={plantType === 'Sugarcane' ? '#fff' : '#4CAF50'}
            />
            <Text
              style={[
                styles.plantTypeButtonText,
                plantType === 'Sugarcane' && styles.plantTypeButtonTextActive
              ]}
            >
              Sugarcane
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
              Uploading and analyzing {plantType} plant for diseases
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
