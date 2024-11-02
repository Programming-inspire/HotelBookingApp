import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the Icon component

interface HotelCardProps {
  name: string;
  location: string;
  rating: number;
  beds: number;
  bathrooms: number;
  guests: number;
  images: string[];
  price: number;
}

const HotelCard: React.FC<HotelCardProps> = ({ name, location, rating, beds, bathrooms, guests, images, price }) => {
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
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Icon name="map-marker" size={16} color="#000" />
          <Text style={styles.details}>{location}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.details}>{rating}</Text>
        </View>
        <View style={styles.detailItem}>
        <Icon name="money" size={20} color="green" />
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Icon name="bed" size={16} color="#000" />
          <Text style={styles.details}>{beds} Beds</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="bath" size={16} color="#000" />
          <Text style={styles.details}>{bathrooms} Baths</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="users" size={16} color="#000" />
          <Text style={styles.details}>{guests} Guests</Text>
        </View>
      </View>
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
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    color: 'black',
    fontSize: 16,
    marginLeft: 5, // Add margin for spacing between icon and text
  },
  price: {
    fontWeight: 'bold',
    fontSize: 20, // Increased font size
    color: 'green', // Set text color to green
    marginLeft: 5, // Add margin for spacing between icon and price text
  },
});

export default HotelCard;
