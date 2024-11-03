// src/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from '../screens/DashboardScreen';
import HotelDetailsScreen from '../screens/HotelDetailsScreen'; // Import HotelDetailsScreen
import SplashScreen from '../screens/SplashScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HotelDetails" component={HotelDetailsScreen} options={{ title: 'Hotel Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
