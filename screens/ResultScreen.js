// ==========================================
// FILE: screens/ResultScreen.js
// ==========================================
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { addPlant } from '../store/plantsStorage';
import { styles } from '../styles/ResultStyles';

// ✅ All known diseases from your dataset
const diseaseDetails = {
  'Healthy Coffee Leaf': {
    status: 'healthy',
    severity: 'none',
    description: 'Your coffee plant appears healthy with no visible disease symptoms.',
    recommendations: [
      'Maintain regular watering and fertilizer schedule.',
      'Inspect leaves weekly for early disease detection.',
      'Ensure proper sunlight and airflow around plants.'
    ]
  },
  'Healthy Sugarcane Leaf': {
    status: 'healthy',
    severity: 'none',
    description: 'Your sugarcane crop is healthy with no signs of infection.',
    recommendations: [
      'Keep soil moisture balanced and avoid waterlogging.',
      'Monitor for any early signs of fungal infection.',
      'Ensure proper fertilization and drainage.'
    ]
  },
  'Cercospora': {
    status: 'diseased',
    severity: 'moderate',
    description: 'A fungal infection causing brown leaf spots with yellow halos.',
    recommendations: [
      'Remove and destroy infected leaves.',
      'Apply copper-based fungicide every 14 days.',
      'Avoid overhead watering and ensure spacing between plants.'
    ]
  },
  'Rust Coffee Leaf': {
    status: 'diseased',
    severity: 'high',
    description: 'A serious fungal disease producing orange or yellow powdery spots on coffee leaves.',
    recommendations: [
      'Apply systemic fungicide immediately.',
      'Prune heavily infected leaves.',
      'Avoid wet foliage and ensure good airflow.'
    ]
  },
  'Rust Sugarcane Leaf': {
    status: 'diseased',
    severity: 'high',
    description: 'Fungal disease causing reddish-brown pustules on the leaf surface.',
    recommendations: [
      'Remove and destroy infected leaves.',
      'Apply sulfur-based fungicides.',
      'Use resistant sugarcane varieties.'
    ]
  },
  'Bacterial Blight': {
    status: 'diseased',
    severity: 'high',
    description: 'Bacterial infection causing water-soaked lesions that turn brown or black.',
    recommendations: [
      'Avoid overhead irrigation and reduce humidity.',
      'Apply copper-based bactericide sprays.',
      'Remove affected plant parts immediately.'
    ]
  },
  'RedRot': {
    status: 'diseased',
    severity: 'high',
    description: 'A severe fungal disease that affects sugarcane stalks, causing red discoloration inside stems.',
    recommendations: [
      'Remove and destroy infected stalks.',
      'Rotate crops and avoid replanting in infected fields.',
      'Use disease-free seed cane for planting.'
    ]
  },
  'Mosaic': {
    status: 'diseased',
    severity: 'moderate',
    description: 'Viral disease causing irregular green and yellow patches on leaves.',
    recommendations: [
      'Remove and destroy infected plants.',
      'Control insect vectors like aphids.',
      'Use certified virus-free seeds.'
    ]
  },
  'Yellow': {
    status: 'diseased',
    severity: 'low',
    description: 'Chlorosis caused by nutrient deficiency or early viral infection.',
    recommendations: [
      'Check soil nitrogen and iron levels.',
      'Apply balanced fertilizer with micronutrients.',
      'Inspect for pests like whiteflies or aphids.'
    ]
  }
};

export default function ResultScreen({ route, navigation }) {
  const { result, imageUri } = route.params;
  const [plantName, setPlantName] = useState('');
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [showAllPredictions, setShowAllPredictions] = useState(false);

  // Map the API result to local format
  const disease = diseaseDetails[result.Class] || {
    status: 'unknown',
    severity: 'none',
    description: 'Unknown disease class returned by model.',
    recommendations: ['Try capturing the image again in better lighting.']
  };

  const confidence = result.Confidence || 0;
  const confidencePercent = (confidence * 100).toFixed(1);

  const handleSave = async () => {
    if (!plantName.trim()) {
      Alert.alert('Error', 'Please enter a plant name');
      return;
    }

    const now = Date.now();
    const plantData = {
      id: now,
      name: plantName,
      diagnosis: result.Class,
      confidence: confidence,
      dateAdded: now,
      status: disease.status === 'healthy' ? 'healthy' : 'diseased',
      lastDiagnosis: disease,
      imageUri: imageUri
    };

    try {
      await addPlant(plantData);
      Alert.alert('Success', `${plantName} saved to your collection!`, [
        { text: 'OK', onPress: () => navigation.navigate('My Plants') }
      ]);
    } catch (error) {
      console.error('Error saving plant:', error);
      Alert.alert('Error', 'Could not save plant. Please try again.');
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#f44336';
      case 'moderate': return '#FF9800';
      case 'low': return '#FFC107';
      default: return '#4CAF50';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Diagnosis Results</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Result Card */}
      <View
        style={[
          styles.resultCard,
          disease.status === 'healthy'
            ? styles.healthyCard
            : styles.diseasedCard
        ]}
      >
        {imageUri && <Image source={{ uri: imageUri }} style={styles.resultImage} />}

        {/* Status */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusIcon}>
            {disease.status === 'healthy' ? '✅' : '⚠️'}
          </Text>
          <Text style={styles.diagnosisTitle}>{result.Class}</Text>

          {/* Confidence */}
          <View
            style={[
              styles.confidenceBadge,
              disease.status === 'healthy'
                ? styles.healthyBadge
                : styles.diseasedBadge
            ]}
          >
            <Text style={styles.confidenceText}>
              Confidence: {confidencePercent}%
            </Text>
          </View>

          {/* Severity */}
          {disease.severity !== 'none' && (
            <View
              style={[
                styles.severityBadge,
                { backgroundColor: getSeverityColor(disease.severity) + '20' }
              ]}
            >
              <Text
                style={[
                  styles.severityText,
                  { color: getSeverityColor(disease.severity) }
                ]}
              >
                Severity: {disease.severity.charAt(0).toUpperCase() + disease.severity.slice(1)}
              </Text>
            </View>
          )}
        </View>

        {/* Description */}
        <View style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{disease.description}</Text>
        </View>

        {/* Recommendations */}
        <View style={styles.recommendationsCard}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {disease.recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationItem}>
              <Icon name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.recommendationText}>{rec}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Save / Action Buttons */}
      {!showSaveForm ? (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="camera" size={20} color="#333" />
            <Text style={styles.secondaryButtonText}>Take Another</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setShowSaveForm(true)}
          >
            <Icon name="save" size={20} color="#fff" />
            <Text style={styles.primaryButtonText}>Save Plant</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.saveForm}>
          <Text style={styles.saveFormTitle}>Save to My Plants</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter plant name..."
            value={plantName}
            onChangeText={setPlantName}
            autoFocus
          />
          <View style={styles.saveFormButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowSaveForm(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Share Button */}
      <TouchableOpacity
        style={styles.shareButton}
        onPress={() => {
          Alert.alert('Share', 'Share diagnosis results with community');
        }}
      >
        <Icon name="share-social" size={20} color="#4CAF50" />
        <Text style={styles.shareButtonText}>Share Results</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
