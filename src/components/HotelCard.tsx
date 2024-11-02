// src/components/HotelCard.tsx

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';

interface HotelCardProps {
  name: string;
  location: string;
  rating: number;
  beds: number;
  bathrooms: number;
  guests: number;
  images: string[];
}

const HotelCard: React.FC<HotelCardProps> = ({ name, location, rating, beds, bathrooms, guests, images }) => {
  return (
    <View style={styles.card}>
      <Swiper
        style={styles.wrapper}
        autoplay={true}
        autoplayTimeout={3}
        showsPagination={true}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ))}
      </Swiper>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.details}>
        Location: {location}   |   Rating: {rating}  
      </Text>
      <Text style={styles.details}>
        Beds: {beds}   |   Baths: {bathrooms}   |   Guests: {guests}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 5,
    padding: 10,
    elevation: 3, // Add shadow effect for Android
  },
  wrapper: {
    height: 200, // Adjust as needed
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 5,
  },
  details: {
    color: 'black',
    fontSize: 14,
  },
});

export default HotelCard;
