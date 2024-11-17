import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { setHotels, setSearchQuery, clearFilter } from '../redux/slices/hotelSlice';
import HotelCard from '../components/HotelCard';
import SearchBar from '../components/SearchBar';
import { hotelsData } from '../data/hotelData';
import { RootState } from '../redux/store';
import colors from '../assets/color';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const hotels = useSelector((state: RootState) => state.hotels.filteredHotels);
  const searchQuery = useSelector((state: RootState) => state.hotels.searchQuery);
  const filterLocation = useSelector((state: RootState) => state.hotels.filterLocation);

  useEffect(() => {
    dispatch(setHotels(hotelsData));
  }, [dispatch]);

  const handleSearchChange = (text: string) => {
    dispatch(setSearchQuery(text));
  };

  const handleRemoveFilter = () => {
    dispatch(clearFilter());
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
      {filterLocation && (
        <View style={styles.filterTagContainer}>
          <TouchableOpacity style={styles.filterTag} onPress={handleRemoveFilter}>
            <Text style={styles.filterTagText}>x {filterLocation}</Text>
          </TouchableOpacity>
        </View>
      )}
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
    backgroundColor: colors.background,
    padding: 10,
  },
  filterTagContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  filterTag: {
    backgroundColor: colors.secondary,
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  filterTagText: {
    color: colors.white,
  },
  hotelContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: colors.white,
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
    color: colors.text,
  },
});

export default HomeScreen;
