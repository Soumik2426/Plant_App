// ==========================================
// FILE: services/MLService.js
// ==========================================
import axios from 'axios';
import { getDeviceId } from './DeviceIdService';

class MLService {
  constructor() {
    // Prediction endpoint through ADB reverse port forwarding
    // Phone connects to localhost:8000 which tunnels to PC:8000 via ADB
    this.apiUrl = 'http://localhost:8000/predict';
  }

  /**
   * Send image to remote model API for prediction
   * @param {string} imageUri - URI of the image picked from gallery or camera
   * @returns {Promise<{Class: string, Confidence: number}>}
   */
  async predictDiseaseRemote(imageUri) {
    try {
      const deviceId = await getDeviceId();
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'photo.jpg'
      });

      // API requires a device identifier along with the image
      formData.append('device_id', deviceId);

      console.log('Uploading image to model API with device ID:', deviceId);
      const response = await axios.post(this.apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Raw model response:', response.data);

      // The backend returns shape like:
      // { prediction: 'Rust Sugarcane Leaf', confidence: '85.28%', image_url: '...' }
      const data = response.data || {};

      const prediction =
        data.prediction ||
        data.Prediction ||
        data.class ||
        data.Class ||
        null;

      let confidenceValue = 0;
      const rawConfidence = data.confidence ?? data.Confidence;

      if (typeof rawConfidence === 'string') {
        // Extract numeric part, e.g. "85.28%" -> 85.28
        const match = rawConfidence.match(/[-+]?[0-9]*\.?[0-9]+/);
        if (match) {
          const numeric = parseFloat(match[0]);
          // Backend appears to return 0-100%; convert to 0-1 range
          confidenceValue = isNaN(numeric) ? 0 : numeric / 100;
        }
      } else if (typeof rawConfidence === 'number') {
        // If backend ever returns a pure number, handle both 0-1 and 0-100
        confidenceValue = rawConfidence > 1 ? rawConfidence / 100 : rawConfidence;
      }

      const mappedResult = {
        Class: prediction,
        Confidence: confidenceValue,
        raw: data,
      };

      console.log('Mapped model result:', mappedResult);
      return mappedResult;

    } catch (error) {
      console.error('=== ERROR PREDICTING DISEASE ===');
      console.error('Error message:', error.message);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      console.error('Full error:', JSON.stringify(error, null, 2));
      
      const errorMsg = error.response?.data?.detail || error.response?.data?.message || error.message;
      throw new Error(`Prediction failed: ${errorMsg}`);
    }
  }
}

export default new MLService();
