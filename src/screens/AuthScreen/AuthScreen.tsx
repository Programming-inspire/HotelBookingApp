import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AuthToggleButton from '../../components/AuthToggleButton';

const AuthScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleToggle = () => setIsSignIn(!isSignIn);

  const handleSignUpSuccess = () => {
    setIsSignIn(true);
  };

  return (
    <View style={styles.background}>
      <View style={styles.overlay} />
      <View style={styles.contentContainer}>
        <View style={styles.formContainer}>
          {isSignIn ? (
            <SignIn navigation={navigation} />
          ) : (
            <SignUp onSignUpSuccess={handleSignUpSuccess} />
          )}
        </View>
      </View>
      <View style={styles.togglebuttonContainer}>
        <AuthToggleButton isSignIn={isSignIn} toggle={handleToggle} />
      </View>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  formContainer: {
    marginBottom: 20,
  },
  togglebuttonContainer: {
    bottom: 0,
  },
});
