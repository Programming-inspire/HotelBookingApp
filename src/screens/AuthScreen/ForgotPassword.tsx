import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import colors from '../../assets/color';

const { width } = Dimensions.get('window');

const ForgotPassword: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleForgotPassword = async () => {
    try {
      await axios.post('http://localhost:5000/forgot-password', { phone });
      Alert.alert('Success', 'OTP sent to your mobile number', [
        { text: 'OK', onPress: () => setStep(2) },
      ]);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        Alert.alert('Error', error.response.data.error);
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/verify-otp', { phone, otp });
      setUserId(response.data.userId);
      setStep(3);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        Alert.alert('Error', error.response.data.error);
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  const handleResetPassword = async () => {
    try {
      await axios.post('http://localhost:5000/reset-password', { userId, password: newPassword });
      Alert.alert('Success', 'Password has been reset', [
        { text: 'OK', onPress: () => navigation.navigate('SignIn') },
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <View style={styles.innerContainer}>
          {step === 1 && (
            <>
              <Text style={styles.title}>Forgot Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Phone"
                placeholderTextColor={colors.text}
                value={phone}
                onChangeText={setPhone}
              />
              <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
                <Text style={styles.buttonText}>Send OTP</Text>
              </TouchableOpacity>
            </>
          )}
          {step === 2 && (
            <>
              <Text style={styles.title}>Enter OTP</Text>
              <TextInput
                style={styles.input}
                placeholder="OTP"
                placeholderTextColor={colors.text}
                value={otp}
                onChangeText={setOtp}
              />
              <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
            </>
          )}
          {step === 3 && (
            <>
              <Text style={styles.title}>Reset Password</Text>
              <TextInput
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor={colors.text}
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Reset Password</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  innerContainer: {
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
