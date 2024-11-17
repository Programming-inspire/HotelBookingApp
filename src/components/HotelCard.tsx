import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import colors from '../assets/color';

interface HotelCardProps {
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
  available?: boolean;
}

type HotelCardNavigationProp = StackNavigationProp<RootStackParamList, 'HotelDetails'>;

const HotelCard: React.FC<HotelCardProps> = ({ id, name, location, rating, beds, bathrooms, guests, images, price, highlights, description, available = true }) => {
  const navigation = useNavigation<HotelCardNavigationProp>();

  const handlePress = () => {
    if (available) {
      navigation.navigate('HotelDetails', {
        id,
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
      });
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card} disabled={!available}>
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
          <Icon name="map-marker" size={16} color={colors.text} />
          <Text style={styles.details}>{location}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.details}>{rating}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="rupee" size={20} color="green" />
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Icon name="bed" size={16} color={colors.text} />
          <Text style={styles.details}>{beds} Beds</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="bath" size={16} color={colors.text} />
          <Text style={styles.details}>{bathrooms} Baths</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="users" size={16} color={colors.text} />
          <Text style={styles.details}>{guests} Guests</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  wrapper: {
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
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
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 5,
    color: colors.primary,
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
    color: colors.text,
    fontSize: 16,
    marginLeft: 5,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'green',
    marginLeft: 5,
  },
});

export default HotelCard;
