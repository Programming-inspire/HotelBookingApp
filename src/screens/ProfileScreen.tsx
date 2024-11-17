import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../assets/color';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      dispatch(clearUser());
      navigation.replace('AuthScreen');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="user-circle" size={100} color={colors.primary} style={styles.userIcon} />
      <Text style={styles.greetingText}>Hello, {user.name}!</Text>
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
    backgroundColor: colors.background,
  },
  userIcon: {
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.error,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
});
