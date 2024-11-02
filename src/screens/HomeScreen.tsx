// src/screens/HomeScreen.tsx

import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setHotels, setSearchQuery } from '../redux/slices/hotelSlice';
import HotelCard from '../components/HotelCard';
import SearchBar from '../components/SearchBar'; // Import the SearchBar
import { hotelsData } from '../data/hotelData'; // Make sure to import your mock data
import { RootState } from '../redux/store';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const hotels = useSelector((state: RootState) => state.hotels.hotels);
  const searchQuery = useSelector((state: RootState) => state.hotels.searchQuery); // Get search query from Redux

  useEffect(() => {
    // Dispatch action to set hotels in the Redux store
    dispatch(setHotels(hotelsData));
  }, [dispatch]);

  const handleSearchChange = (text: string) => {
    dispatch(setSearchQuery(text)); // Update the search query in Redux
  };

  // Filter hotels based on search query
  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChange={handleSearchChange} /> {/* Add SearchBar */}
      <ScrollView>
        {filteredHotels.map((hotel) => (
          <HotelCard key={hotel.id} {...hotel} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000',
    padding: 10,
  },
});

export default HomeScreen;
