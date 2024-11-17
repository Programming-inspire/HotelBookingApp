import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AuthToggleButton from '../../components/AuthToggleButton';
import colors from '../../assets/color';

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
      <View style={styles.toggleButtonContainer}>
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
    backgroundColor: colors.background,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  formContainer: {
    marginBottom: 20,
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toggleButtonContainer: {
    position: 'absolute',
    bottom: 20,
  },
});
