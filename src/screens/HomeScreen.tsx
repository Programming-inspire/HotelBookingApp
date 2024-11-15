import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { setHotels, setSearchQuery } from '../redux/slices/hotelSlice';
import HotelCard from '../components/HotelCard';
import SearchBar from '../components/SearchBar';
import { hotelsData } from '../data/hotelData';
import { RootState } from '../redux/store';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const hotels = useSelector((state: RootState) => state.hotels.filteredHotels);
  const searchQuery = useSelector((state: RootState) => state.hotels.searchQuery);

  useEffect(() => {
    dispatch(setHotels(hotelsData));
  }, [dispatch]);

  const handleSearchChange = (text: string) => {
    dispatch(setSearchQuery(text));
  };

  useEffect(() => {
    console.log('Filtered hotels:', hotels);
  }, [hotels]);

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar value={searchQuery} onChange={handleSearchChange} />
      <ScrollView>
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <View key={hotel.id} style={styles.hotelContainer}>
              <HotelCard {...hotel} />
              {!hotel.available && (
                <View style={styles.overlay}>
                  <Text style={styles.overlayText}>Not Available</Text>
                </View>
              )}
            </View>
          ))
        ) : (
          <View style={styles.noHotelsContainer}>
            <Text style={styles.noHotelsText}>No hotels available</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  hotelContainer: {
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  noHotelsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noHotelsText: {
    fontSize: 18,
    color: 'gray',
  },
});

export default HomeScreen;
