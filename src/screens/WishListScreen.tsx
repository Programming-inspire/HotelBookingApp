import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchUserBookings, cancelBooking } from '../redux/slices/bookingSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../assets/color';

const WishlistScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const bookings = useSelector((state: RootState) => state.bookings.userBookings);

  useEffect(() => {
    if (user.id) {
      dispatch(fetchUserBookings(user.id));
    }
  }, [dispatch, user.id]);

  useEffect(() => {
    console.log('Bookings:', bookings);
  }, [bookings]);

  const handleCancelBooking = (bookingId: string) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => dispatch(cancelBooking(bookingId)) },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {bookings.length > 0 ? (
        bookings.map((booking) => {
          const startDate = new Date(booking.startDate);
          const endDate = new Date(booking.endDate);
          console.log('Start Date:', startDate);
          console.log('End Date:', endDate);
          return (
            <View key={booking._id} style={styles.bookingItem}>
              <Text style={styles.hotelName}>{booking.hotelName}</Text>
              <View style={styles.detailContainer}>
                <Icon name="map-marker" size={16} color={colors.primary} />
                <Text style={styles.location}>{booking.location}</Text>
              </View>
              <View style={styles.detailContainer}>
                <Icon name="calendar" size={16} color={colors.primary} />
                <Text style={styles.dates}>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</Text>
              </View>
              <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancelBooking(booking._id)}>
                <Text style={styles.cancelButtonText}>Cancel Booking</Text>
              </TouchableOpacity>
            </View>
          );
        })
      ) : (
        <Text style={styles.noBookingsText}>No bookings found</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  bookingItem: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 5,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'Roboto-Regular',
    marginLeft: 5,
  },
  dates: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'Roboto-Regular',
    marginLeft: 5,
  },
  cancelButton: {
    backgroundColor: colors.error,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  noBookingsText: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Roboto-Regular',
  },
});

export default WishlistScreen;
