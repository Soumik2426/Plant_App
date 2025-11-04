// ==========================================
// FILE: screens/SignupScreen.js
// ==========================================
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useAuth } from '../navigation/AppNavigator';
import AuthInput from '../components/AuthInput';
import { styles } from '../styles/HomeStyles';

export default function SignupScreen({ navigation }) {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    signup(name, email, password);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.authContainer}
    >
      <View style={styles.authCard}>
        <Text style={styles.authLogo}>🌱</Text>
        <Text style={styles.authTitle}>Create Account</Text>
        <Text style={styles.authSubtitle}>Join the plant care community</Text>

        <View style={styles.authForm}>
          <AuthInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            icon="person"
          />

          <AuthInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail"
          />

          <AuthInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            icon="lock-closed"
          />

          <TouchableOpacity style={styles.authButton} onPress={handleSignup}>
            <Text style={styles.authButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.authLink}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}