import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import axios from 'axios';
import colors from '../../assets/color';

const { width } = Dimensions.get('window');

const SignUp: React.FC<{ onSignUpSuccess: () => void }> = ({ onSignUpSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignUp = async () => {
    try {
      await axios.post('http://localhost:5000/register', { username, email, password, phone });
      Alert.alert('Success', 'User registered successfully', [
        { text: 'OK', onPress: onSignUpSuccess },
      ]);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        Alert.alert('Error', error.response.data.error);
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={colors.text}
        value={username}
        onChangeText={setUsername}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Phone"
        placeholderTextColor={colors.text}
        value={phone}
        onChangeText={setPhone}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

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
});
