// ==========================================
// FILE: navigation/MainTabNavigator.js
// ==========================================
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import MyPlantsScreen from '../screens/MyPlantsScreen';
import DiagnoseScreen from '../screens/DiagnoseScreen';
import ResultScreen from '../screens/ResultScreen';
import CommunityScreen from '../screens/CommunityScreen';
import StoreScreen from '../screens/StoreScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const DiagnoseStack = createStackNavigator();

function DiagnoseStackNavigator() {
  return (
    <DiagnoseStack.Navigator screenOptions={{ headerShown: false }}>
      <DiagnoseStack.Screen name="DiagnoseMain" component={DiagnoseScreen} />
      <DiagnoseStack.Screen name="Result" component={ResultScreen} />
    </DiagnoseStack.Navigator>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'My Plants') {
            iconName = focused ? 'leaf' : 'leaf-outline';
          } else if (route.name === 'Diagnose') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'Community') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Store') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Plants" component={MyPlantsScreen} />
      <Tab.Screen name="Diagnose" component={DiagnoseStackNavigator} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Store" component={StoreScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}