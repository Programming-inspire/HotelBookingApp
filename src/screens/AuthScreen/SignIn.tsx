import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../assets/color';

const { width } = Dimensions.get('window');

const SignIn: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const { token, user } = response.data;

      await AsyncStorage.setItem('token', token);

      dispatch(setUser({ id: user._id, name: user.username, email: user.email }));

      Alert.alert('Success', 'User logged in successfully', [
        { text: 'OK', onPress: () => navigation.navigate('Dashboard') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Invalid credentials. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.text}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.text}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    padding: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    borderColor: colors.primary,
    borderWidth: 1,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.primary,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: colors.primary,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: colors.text,
    borderRadius: 5,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
  },
  forgotPasswordText: {
    color: colors.secondary,
    marginTop: 10,
  },
});
