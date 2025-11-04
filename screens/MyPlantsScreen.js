// ==========================================
// FILE: screens/MyPlantsScreen.js
// ==========================================
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PlantCard from '../components/PlantCard';
import { styles } from '../styles/HomeStyles';

export default function MyPlantsScreen({ navigation }) {
  const [plants, setPlants] = useState([]);

  const removePlant = (id) => {
    setPlants(plants.filter(plant => plant.id !== id));
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
