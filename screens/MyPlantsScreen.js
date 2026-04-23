// ==========================================
// FILE: screens/MyPlantsScreen.js
// ==========================================
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import PlantCard from '../components/PlantCard';
import { styles } from '../styles/HomeStyles';
import { loadPlants, removePlantById } from '../store/plantsStorage';

export default function MyPlantsScreen({ navigation }) {
  const [plants, setPlants] = useState([]);
  
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchPlants = async () => {
        const savedPlants = await loadPlants();
        if (isActive) {
          setPlants(savedPlants);
        }
      };

      fetchPlants();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const removePlant = async (id) => {
    const updated = await removePlantById(id);
    setPlants(updated);
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>My Plants 🌿</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Diagnose')}
        >
          <Icon name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add Plant</Text>
        </TouchableOpacity>
      </View>

      {plants.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>🪴</Text>
          <Text style={styles.emptyStateTitle}>No plants yet</Text>
          <Text style={styles.emptyStateText}>
            Start by diagnosing your first plant!
          </Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Diagnose')}
          >
            <Text style={styles.primaryButtonText}>Diagnose a Plant</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.scrollContent}>
          {plants.map(plant => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onRemove={() => removePlant(plant.id)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
