import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Clear any stored user data or tokens here
    // For example, if you're using AsyncStorage:
    // await AsyncStorage.removeItem('userToken');

    // Navigate to the AuthScreen
    navigation.replace('AuthScreen');
  };

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff0000',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
