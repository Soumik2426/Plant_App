// ==========================================
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

