// src/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from '../screens/DashboardScreen';
import HotelDetailsScreen from '../screens/HotelDetailsScreen';
import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/AuthScreen/AuthScreen';
import ForgotPassword from '../screens/AuthScreen/ForgotPassword';
import AvailabilityScreen from '../screens/AvailabilityScreen';
import BookingScreen from '../screens/BookingScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AuthScreen" component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Availability" component={AvailabilityScreen} options={{ title: 'Check Availability' }} />
        <Stack.Screen name="HotelDetails" component={HotelDetailsScreen} options={{ title: 'Hotel Details' }} />
        <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Booking' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
