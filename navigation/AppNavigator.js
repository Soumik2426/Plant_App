/* // ==========================================
// FILE: navigation/AppNavigator.js
// ==========================================
import React, { useState, createContext, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import MainTabNavigator from './MainTabNavigator';

const Stack = createStackNavigator();

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default function AppNavigator() {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Simulate login - in production, this would call an API
    setUser({
      id: 'user_' + Date.now(),
      name: email.split('@')[0],
      email: email
    });
  };

  const signup = (name, email, password) => {
    // Simulate signup - in production, this would call an API
    setUser({
      id: 'user_' + Date.now(),
      name: name,
      email: email
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}

 */


// ==========================================
// FILE: navigation/AppNavigator.js
// ==========================================
import React, { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import MainTabNavigator from './MainTabNavigator';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator();
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load stored user session on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading stored user:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // ✅ Simulate login - production would call API
  const login = async (email, password) => {
    const userData = {
      id: 'user_' + Date.now(),
      name: email.split('@')[0],
      email: email,
    };
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // ✅ Simulate signup - production would call API
  const signup = async (name, email, password) => {
    const userData = {
      id: 'user_' + Date.now(),
      name,
      email,
    };
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // ✅ Logout clears AsyncStorage
  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    // While restoring session
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}