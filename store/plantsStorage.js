// ==========================================
// FILE: store/plantsStorage.js
// ==========================================
import AsyncStorage from '@react-native-async-storage/async-storage';

const PLANTS_KEY = 'plants_history_v1';

export async function loadPlants() {
  try {
    const stored = await AsyncStorage.getItem(PLANTS_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error loading plants history:', error);
    return [];
  }
}

export async function savePlants(plants) {
  try {
    await AsyncStorage.setItem(PLANTS_KEY, JSON.stringify(plants || []));
  } catch (error) {
    console.error('Error saving plants history:', error);
  }
}

export async function addPlant(plant) {
  const current = await loadPlants();
  const updated = [plant, ...current];
  await savePlants(updated);
  return updated;
}

export async function removePlantById(id) {
  const current = await loadPlants();
  const updated = current.filter((plant) => plant.id !== id);
  await savePlants(updated);
  return updated;
}
