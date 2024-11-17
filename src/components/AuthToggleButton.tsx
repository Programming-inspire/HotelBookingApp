import React from 'react';
import { View, Text, TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native';
import colors from '../assets/color';

type AuthToggleButtonProps = {
  isSignIn: boolean;
  toggle: () => void;
};

const AuthToggleButton: React.FC<AuthToggleButtonProps> = ({ isSignIn, toggle }) => {
  const translateX = new Animated.Value(isSignIn ? 0 : 110);

  Animated.timing(translateX, {
    toValue: isSignIn ? 0 : 110,
    duration: 300,
    useNativeDriver: true,
  }).start();

  return (
    <TouchableWithoutFeedback onPress={toggle}>
      <View style={styles.toggleContainer}>
        <Animated.View style={[styles.slider, { transform: [{ translateX }] }]} />
        <View style={styles.labelsContainer}>
          <Text style={[styles.label, isSignIn && styles.activeLabel]}>Sign In</Text>
          <Text style={[styles.label, !isSignIn && styles.activeLabel]}>Sign Up</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    width: 220,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.white,
    position: 'relative',
    justifyContent: 'center',
    borderColor: colors.primary,
    borderWidth: 1,
    overflow: 'hidden',
  },
  slider: {
    width: '50%',
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 25,
    position: 'absolute',
    borderWidth: 0.5,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    lineHeight: 50,
    color: colors.text,
  },
  activeLabel: {
    color: colors.white,
  },
});

export default AuthToggleButton;
