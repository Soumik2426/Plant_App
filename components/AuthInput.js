// ==========================================
// FILE: components/AuthInput.js
// ==========================================
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AuthInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  icon
}) {
  return (
    <View style={styles.container}>
      {icon && (
        <Icon name={icon} size={20} color="#666" style={styles.icon} />
      )}
      <TextInput
        style={[styles.input, icon && styles.inputWithIcon]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    position: 'relative'
  },
  icon: {
    position: 'absolute',
    left: 15,
    top: 15,
    zIndex: 1
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  inputWithIcon: {
    paddingLeft: 45
  }
});