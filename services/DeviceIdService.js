// ==========================================
// FILE: services/DeviceIdService.js
// ==========================================
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEVICE_ID_KEY = 'device_id_v1';
let cachedDeviceId = null;

function generateDeviceId() {
  const random = Math.random().toString(36).substring(2, 10);
  return `device_${Date.now()}_${random}`;
}

export async function getDeviceId() {
  if (cachedDeviceId) {
    return cachedDeviceId;
  }

  try {
    const stored = await AsyncStorage.getItem(DEVICE_ID_KEY);
    if (stored) {
      cachedDeviceId = stored;
      return stored;
    }
  } catch (error) {
    console.error('Error reading device ID from storage:', error);
  }

  const newId = generateDeviceId();
  cachedDeviceId = newId;

  try {
    await AsyncStorage.setItem(DEVICE_ID_KEY, newId);
  } catch (error) {
    console.error('Error saving device ID to storage:', error);
  }

  return newId;
}
