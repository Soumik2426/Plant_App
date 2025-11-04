import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'react-native-fs';
import axios from 'axios';

export class ModelManager {
  constructor() {
    this.modelCacheDir = `${FileSystem.DocumentDirectoryPath}/models`;
    this.modelVersionKey = 'model_versions';
  }

  /**
   * Check if local model exists
   */
  async hasLocalModel(plantType) {
    const modelPath = `${this.modelCacheDir}/${plantType}`;
    return await FileSystem.exists(modelPath);
  }

  /**
   * Get model version
   */
  async getModelVersion(plantType) {
    try {
      const versions = await AsyncStorage.getItem(this.modelVersionKey);
      if (versions) {
        const versionObj = JSON.parse(versions);
        return versionObj[plantType] || null;
      }
      return null;
    } catch (error) {
      console.error('Error getting model version:', error);
      return null;
    }
  }

  /**
   * Check for model updates
   */
  async checkForUpdates(plantType) {
    try {
      const response = await axios.get(
        `https://your-api.com/models/${plantType}/version`
      );
      const latestVersion = response.data.version;
      const currentVersion = await this.getModelVersion(plantType);

      return {
        updateAvailable: latestVersion !== currentVersion,
        latestVersion,
        currentVersion
      };
    } catch (error) {
      console.error('Error checking for updates:', error);
      return { updateAvailable: false };
    }
  }

  /**
   * Download model from server
   */
  async downloadModel(plantType, url) {
    try {
      const modelDir = `${this.modelCacheDir}/${plantType}`;
      
      // Create directory if it doesn't exist
      await FileSystem.mkdir(modelDir);

      // Download model.json
      const modelJsonPath = `${modelDir}/model.json`;
      await FileSystem.downloadFile({
        fromUrl: `${url}/model.json`,
        toFile: modelJsonPath
      }).promise;

      // Download weights
      const weightsPath = `${modelDir}/weights.bin`;
      await FileSystem.downloadFile({
        fromUrl: `${url}/weights.bin`,
        toFile: weightsPath
      }).promise;

      console.log(`Model downloaded for ${plantType}`);
      return true;
    } catch (error) {
      console.error('Error downloading model:', error);
      throw error;
    }
  }

  /**
   * Save model version
   */
  async saveModelVersion(plantType, version) {
    try {
      const versions = await AsyncStorage.getItem(this.modelVersionKey);
      const versionObj = versions ? JSON.parse(versions) : {};
      versionObj[plantType] = version;
      await AsyncStorage.setItem(this.modelVersionKey, JSON.stringify(versionObj));
    } catch (error) {
      console.error('Error saving model version:', error);
    }
  }

  /**
   * Clear model cache
   */
  async clearCache(plantType) {
    try {
      const modelDir = `${this.modelCacheDir}/${plantType}`;
      if (await FileSystem.exists(modelDir)) {
        await FileSystem.unlink(modelDir);
      }
      console.log(`Cache cleared for ${plantType}`);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }
}