import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';

type HotelDetailRouteProp = RouteProp<{ params: {
  name: string;
  location: string;
  rating: number;
  beds: number;
  bathrooms: number;
  guests: number;
  images: string[];
  price: number;
  highlights: string[];
  description: string;
} }, 'params'>;

const HotelDetailScreen: React.FC = () => {
  const route = useRoute<HotelDetailRouteProp>();
  const {
    name,
    location,
    rating,
    beds,
    bathrooms,
    guests,
    images,
    price,
    highlights,
    description,
  } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      <Text style={styles.location}>{location}</Text>
      <View style={styles.ratingContainer}>
        <Icon name="star" size={16} color="#FFD700" />
        <Text style={styles.rating}>{rating}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{beds} Beds | {bathrooms} Baths | {guests} Guests</Text>
      </View>

      <Text style={styles.sectionTitle}>Highlights</Text>
      <View style={styles.highlightsContainer}>
        {highlights.map((highlight, index) => (
          <View key={index} style={styles.highlightItem}>
            <Text style={styles.highlightText}>{highlight}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>${price} total</Text>
      </View>

      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#FFF',
  },
  wrapper: {
    height: 250,
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
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  rating: {
    fontSize: 16,
    marginLeft: 5,
    color: '#333',
  },
  infoContainer: {
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  priceContainer: {
    marginVertical: 15,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  bookButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
  },
  highlightItem: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  highlightText: {
    fontSize: 14,
    color: '#555',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
  },
});

export default HotelDetailScreen;
