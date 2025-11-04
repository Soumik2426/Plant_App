// ==========================================
// FILE: components/PlantCard.js
// ==========================================
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PlantCard({ plant, onRemove }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{plant.name}</Text>
          <Text style={styles.species}>{plant.species || 'Unknown species'}</Text>
        </View>
        <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
          <Icon name="close-circle" size={24} color="#f44336" />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.statusBadge,
          plant.status === 'healthy' ? styles.healthyBadge : styles.diseasedBadge
        ]}
      >
        <Icon
          name={plant.status === 'healthy' ? 'checkmark-circle' : 'alert-circle'}
          size={16}
          color={plant.status === 'healthy' ? '#4CAF50' : '#FFC107'}
        />
        <Text
          style={[
            styles.statusText,
            plant.status === 'healthy' ? styles.healthyText : styles.diseasedText
          ]}
        >
          {plant.status === 'healthy' ? 'Healthy' : plant.diagnosis}
        </Text>
      </View>

      <Text style={styles.dateText}>
        Added: {new Date(plant.dateAdded).toLocaleDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4
  },
  species: {
    fontSize: 14,
    color: '#666'
  },
  removeButton: {
    padding: 4
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12
  },
  healthyBadge: {
    backgroundColor: '#E8F5E9'
  },
  diseasedBadge: {
    backgroundColor: '#FFF9C4'
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6
  },
  healthyText: {
    color: '#4CAF50'
  },
  diseasedText: {
    color: '#F57C00'
  },
  dateText: {
    fontSize: 12,
    color: '#999'
  }
});