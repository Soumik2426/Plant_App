// ==========================================
// FILE: screens/HomeScreen.js
// ==========================================
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../navigation/AppNavigator';
import { styles } from '../styles/HomeStyles';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();

  const quickActions = [
    {
      icon: 'camera',
      title: 'Diagnose Plant',
      description: 'AI-powered disease detection',
      color: '#2196F3',
      onPress: () => navigation.navigate('Diagnose')
    },
    {
      icon: 'leaf',
      title: 'My Plants',
      description: 'View your collection',
      color: '#4CAF50',
      onPress: () => navigation.navigate('My Plants')
    },
    {
      icon: 'people',
      title: 'Community',
      description: 'Connect with plant lovers',
      color: '#9C27B0',
      onPress: () => navigation.navigate('Community')
    },
    {
      icon: 'cart',
      title: 'Shop',
      description: 'Plant care products',
      color: '#FF9800',
      onPress: () => navigation.navigate('Store')
    }
  ];

  const tips = [
    'Water your plants early in the morning for best absorption',
    'Check soil moisture before watering - overwatering is common!',
    'Rotate plants weekly for even growth and light exposure',
    'Keep leaves clean by wiping with a damp cloth monthly'
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>
            Welcome back, {user?.name || 'User'}! 👋
          </Text>
          <Text style={styles.subtitleText}>
            How are your plants doing today?
          </Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Icon name="log-out-outline" size={24} color="#f44336" />
        </TouchableOpacity>
      </View>

      <View style={styles.quickActionsGrid}>
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.quickActionCard, { backgroundColor: action.color }]}
            onPress={action.onPress}
          >
            <Icon name={action.icon} size={32} color="#fff" />
            <Text style={styles.quickActionTitle}>{action.title}</Text>
            <Text style={styles.quickActionDescription}>
              {action.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Plant Care Tips 💡</Text>
        {tips.map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <Icon name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}