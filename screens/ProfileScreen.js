// ==========================================
// FILE: screens/ProfileScreen.js
// ==========================================
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../navigation/AppNavigator';
import { styles } from '../styles/HomeStyles';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Profile 👤</Text>

      <View style={styles.profileCard}>
        <View style={styles.profileAvatarContainer}>
          <Text style={styles.profileAvatarText}>
            {(user?.name || 'User').charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={styles.profileInfoRow}>
          <Icon name="person" size={20} color="#4CAF50" />
          <Text style={styles.profileLabel}>Name</Text>
        </View>
        <Text style={styles.profileValue}>{user?.name || 'Guest User'}</Text>

        <View style={styles.profileInfoRow}>
          <Icon name="mail" size={20} color="#4CAF50" />
          <Text style={styles.profileLabel}>Email</Text>
        </View>
        <Text style={styles.profileValue}>{user?.email || 'Not available'}</Text>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={logout}>
        <Text style={styles.primaryButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
