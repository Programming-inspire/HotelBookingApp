import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../asset/Original_logo.png';
import { useSplashAnimations } from '../utils/useSplashAnimations';


const SplashScreen = ({ navigation }) => {
  const { springAnim, fadeAnim } = useSplashAnimations();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('AuthScreen');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image 
        source={Logo} 
        style={[styles.image, { transform: [{ scale: springAnim }] }]} 
      />
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
       Easy Stay
      </Animated.Text>
      <View style={styles.iconContainer}>
        <View style={styles.line} />
        <Icon name="star" size={35} color="#000000" />
        <View style={styles.line} />
      </View>
      <Animated.Text style={[styles.subText, { opacity: fadeAnim }]}>
         Find Your Perfect Stay, Anywhere, Anytime.
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 312,
    height: 273,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Caudex-Bold',
    fontSize: 40,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 41,

  },
  line: {
    height: 5,
    width: 130,
    backgroundColor: '#000',
    marginHorizontal: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  subText: {
    fontFamily: 'Caudex-Bold',
    fontSize: 14,
    marginTop: 10,
  },
});

export default SplashScreen;