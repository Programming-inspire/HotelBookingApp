import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchUserBookings, cancelBooking } from '../redux/slices/bookingSlice';

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
              <Text>{booking.hotelName}</Text>
              <Text>{booking.location}</Text>
              <Text>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</Text>
              <Button title="Cancel Booking" color="red" onPress={() => handleCancelBooking(booking._id)} />
            </View>
          );
        })
      ) : (
        <Text>No bookings found</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  bookingItem: { marginBottom: 20, padding: 10, borderWidth: 1, borderColor: '#ccc' },
});

export default WishlistScreen;
