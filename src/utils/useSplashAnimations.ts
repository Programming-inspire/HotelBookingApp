import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const useSplashAnimations = () => {
  const springAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(springAnim, {
      toValue: 1,
      friction: 50,
      tension: 40,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [springAnim, fadeAnim]);

  return { springAnim, fadeAnim };
};