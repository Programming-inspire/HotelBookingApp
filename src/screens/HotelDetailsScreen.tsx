import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import MapView, { Marker } from 'react-native-maps';
import colors from '../assets/color';

type HotelDetailRouteProp = RouteProp<{ params: {
  id: number;
  name: string;
  location: string;
  rating: number;
  beds: number;
  bathrooms: number;
  guests: number;
  images: string[];
  price: string;
  highlights: string[];
  description: string;
  Latitude: number;
  Longitude: number;
} }, 'params'>;

type BookingNavigationProp = StackNavigationProp<RootStackParamList, 'Booking'>;

const HotelDetailScreen: React.FC = () => {
  const route = useRoute<HotelDetailRouteProp>();
  const navigation = useNavigation<BookingNavigationProp>();
  const {
    id: hotelId,
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
    Latitude,
    Longitude,
  } = route.params;

  const userId = useSelector((state: RootState) => state.user.id); // Assuming you have user ID in your Redux store

  const handleBookNow = () => {
    navigation.navigate('Booking', {
      hotelId,
      hotelName: name,
      location,
      userId,
      price,
    });
  };

  return (
    <View style={styles.safeArea}>
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

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: Latitude,
              longitude: Longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: Latitude,
                longitude: Longitude,
              }}
              title={name}
              description={location}
            />
          </MapView>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{price} total</Text>
        </View>

        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    margin: 10,
    backgroundColor: colors.background,
  },
  container: {
    padding: 10,
    backgroundColor: colors.white,
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
    backgroundColor: colors.primary,
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: colors.primary,
    fontFamily: 'Montserrat-Bold',
  },
  location: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 10,
    fontFamily: 'Roboto-Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  rating: {
    fontSize: 16,
    marginLeft: 5,
    color: colors.text,
    fontFamily: 'Roboto-Regular',
  },
  infoContainer: {
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'Roboto-Regular',
  },
  priceContainer: {
    marginVertical: 15,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    fontFamily: 'Montserrat-Bold',
  },
  bookButton: {
    backgroundColor: colors.success,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  bookButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: colors.primary,
    fontFamily: 'Montserrat-Bold',
  },
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
  },
  highlightItem: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  highlightText: {
    fontSize: 14,
    color: colors.white,
    fontFamily: 'Roboto-Regular',
  },
  description: {
    fontSize: 16,
    color: colors.text,
    marginVertical: 10,
    fontFamily: 'Roboto-Regular',
  },
  mapContainer: {
    height: 200,
    marginVertical: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default HotelDetailScreen;
