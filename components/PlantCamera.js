// ==========================================
// FILE: components/PlantCamera.js
// ==========================================
import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PlantCamera({ onCapture, capturedImage }) {
  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      saveToPhotos: false
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        Alert.alert('Error', 'Failed to open camera');
        return;
      }
      if (response.assets && response.assets[0]) {
        onCapture(response.assets[0].uri);
      }
    });
  };

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        Alert.alert('Error', 'Failed to open gallery');
        return;
      }
      if (response.assets && response.assets[0]) {
        onCapture(response.assets[0].uri);
      }
    });
  };

  if (capturedImage) {
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: capturedImage }} style={styles.preview} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraPlaceholder}>
        <Icon name="camera" size={80} color="#4CAF50" />
        <Text style={styles.instructionText}>
          Capture a clear image of your plant's leaves
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
          <Icon name="camera" size={24} color="#fff" />
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.galleryButton} onPress={openGallery}>
          <Icon name="images" size={24} color="#4CAF50" />
          <Text style={styles.galleryButtonText}>Choose from Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraPlaceholder: {
    width: 300,
    height: 300,
    backgroundColor: '#E8F5E9',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24
  },
  instructionText: {
    marginTop: 16,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20
  },
  cameraButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8
  },
  galleryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12
  },
  galleryButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  preview: {
    width: 300,
    height: 300,
    borderRadius: 24
  }
});