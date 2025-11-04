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
import { styles } from '../styles/ResultStyles';

export default function ResultScreen({ route, navigation }) {
  const { result, imageUri } = route.params;
  const [plantName, setPlantName] = useState('');
  const [showSaveForm, setShowSaveForm] = useState(false);

  const handleSave = () => {
    if (!plantName.trim()) {
      Alert.alert('Error', 'Please enter a plant name');
      return;
    }

    // Save plant with diagnosis info
    const plantData = {
      name: plantName,
      species: result.plantType,
      status: result.status,
      diagnosis: result.diagnosis,
      confidence: result.confidence,
      dateAdded: Date.now(),
      lastDiagnosis: result,
      imageUri: imageUri
    };

    // In real app: save to AsyncStorage or backend
    Alert.alert('Success', `${plantName} saved to your collection!`, [
      {
        text: 'OK',
        onPress: () => navigation.navigate('My Plants')
      }
    ]);
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
          result.status === 'healthy'
            ? styles.healthyCard
            : styles.diseasedCard
        ]}
      >
        {/* Captured Image */}
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.resultImage} />
        )}

        {/* Status */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusIcon}>
            {result.status === 'healthy' ? '✅' : '⚠️'}
          </Text>
          <Text style={styles.diagnosisTitle}>{result.diagnosis}</Text>
          
          {/* Plant Type Badge */}
          <View style={styles.plantTypeBadge}>
            <Icon name="leaf" size={16} color="#4CAF50" />
            <Text style={styles.plantTypeText}>
              {result.plantType.charAt(0).toUpperCase() + result.plantType.slice(1)}
            </Text>
          </View>

          {/* Confidence */}
          <View
            style={[
              styles.confidenceBadge,
              result.status === 'healthy'
                ? styles.healthyBadge
                : styles.diseasedBadge
            ]}
          >
            <Text style={styles.confidenceText}>
              Confidence: {(result.confidence * 100).toFixed(1)}%
            </Text>
          </View>

          {/* Severity */}
          {result.severity !== 'none' && (
            <View style={[
              styles.severityBadge,
              { backgroundColor: getSeverityColor(result.severity) + '20' }
            ]}>
              <Text style={[
                styles.severityText,
                { color: getSeverityColor(result.severity) }
              ]}>
                Severity: {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)}
              </Text>
            </View>
          )}
        </View>

        {/* Description */}
        <View style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{result.description}</Text>
        </View>

        {/* Treatment (if needed) */}
        {result.treatment && (
          <View style={styles.treatmentCard}>
            <Icon name="medkit" size={20} color="#f44336" />
            <Text style={styles.treatmentText}>{result.treatment}</Text>
          </View>
        )}

        {/* Recommendations */}
        <View style={styles.recommendationsCard}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {result.recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationItem}>
              <Icon name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.recommendationText}>{rec}</Text>
            </View>
          ))}
        </View>

        {/* All Predictions (for debugging/transparency) */}
        {result.allPredictions && (
          <TouchableOpacity
            style={styles.showDetailsButton}
            onPress={() => setShowAllPredictions(!showAllPredictions)}
          >
            <Text style={styles.showDetailsText}>
              Show All Predictions
            </Text>
            <Icon 
              name={showAllPredictions ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#4CAF50" 
            />
          </TouchableOpacity>
        )}

        {showAllPredictions && (
          <View style={styles.allPredictionsCard}>
            {result.allPredictions.map((pred, index) => (
              <View key={index} style={styles.predictionRow}>
                <Text style={styles.predictionClass}>{pred.class}</Text>
                <Text style={styles.predictionProb}>{pred.percentage}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Action Buttons */}
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
          // Implement share functionality
          Alert.alert('Share', 'Share diagnosis results with community');
        }}
      >
        <Icon name="share-social" size={20} color="#4CAF50" />
        <Text style={styles.shareButtonText}>Share Results</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const showAllPredictions = false; // Add this state at the top of component