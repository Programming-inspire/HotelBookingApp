import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import axios from 'axios';
import { addBooking, fetchUserBookings } from '../redux/slices/bookingSlice';
import colors from '../assets/color';

type BookingRouteProp = RouteProp<{ params: {
  hotelId: string;
  hotelName: string;
  location: string;
  userId: string;
  price: string;
} }, 'params'>;

const BookingScreen: React.FC = () => {
  const route = useRoute<BookingRouteProp>();
  const { hotelId, hotelName, location, userId, price } = route.params;
  const dispatch = useDispatch<AppDispatch>();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);

  const calculateTotalAmount = () => {
    const days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    const amount = days * parseFloat(price.replace(/,/g, ''));
    const roundedAmount = Math.round(amount * 100) / 100;
    setTotalAmount(roundedAmount);
  };

  const checkAvailability = async () => {
    try {
      const response = await axios.post('http://localhost:5000/check-availability', {
        hotelName,
        location,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });
      Alert.alert('Success', response.data.message);
      setIsAvailable(true);
      calculateTotalAmount();
    } catch (error) {
      if ((error as any).response && (error as any).response.data && (error as any).response.data.error) {
        Alert.alert('Error', (error as any).response.data.error);
      } else {
        Alert.alert('Error', 'Failed to check availability');
      }
      setIsAvailable(false);
    }
  };

  const handlePayment = async () => {
    if (parseFloat(paymentAmount) !== totalAmount) {
      Alert.alert('Error', 'Payment amount does not match the total amount');
      return;
    }

    try {
      console.log('Sending booking request:', {
        hotelId,
        hotelName,
        location,
        userId,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        adults,
        kids,
        totalAmount,
      });

      const response = await axios.post('http://localhost:5000/book', {
        hotelId,
        hotelName,
        location,
        userId,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        adults,
        kids,
        totalAmount,
      });

      const newBooking = response.data;
      dispatch(addBooking(newBooking));
      dispatch(fetchUserBookings(userId));

      Alert.alert('Success', response.data.message);
    } catch (error) {
      const err = error as any;
      if (err.response && err.response.data && err.response.data.error) {
        Alert.alert('Error', (err.response.data as { error: string }).error);
      } else {
        Alert.alert('Error', 'Failed to create booking');
      }
    }
  };

  const onStartDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const onEndDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.datePickerButton}>
          <Text style={styles.datePickerText}>Start Date: {startDate.toDateString()}</Text>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onStartDateChange}
          />
        )}

        <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.datePickerButton}>
          <Text style={styles.datePickerText}>End Date: {endDate.toDateString()}</Text>
        </TouchableOpacity>
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onEndDateChange}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Number of Adults"
          value={String(adults)}
          onChangeText={(text) => setAdults(Number(text))}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Number of Kids"
          value={String(kids)}
          onChangeText={(text) => setKids(Number(text))}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.checkAvailabilityButton} onPress={checkAvailability}>
          <Text style={styles.checkAvailabilityButtonText}>Check Availability</Text>
        </TouchableOpacity>

        {isAvailable && (
          <>
            <TouchableOpacity style={styles.calculateButton} onPress={calculateTotalAmount}>
              <Text style={styles.calculateButtonText}>Calculate Total Amount</Text>
            </TouchableOpacity>
            <Text style={styles.totalAmount}>Total Amount: ₹{totalAmount}</Text>

            <TextInput
              style={styles.input}
              placeholder="Payment Amount"
              value={paymentAmount}
              onChangeText={setPaymentAmount}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
              <Text style={styles.payButtonText}>Pay</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 20,
    backgroundColor: colors.white,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    fontFamily: 'Roboto-Regular',
    color: colors.text,
  },
  checkAvailabilityButton: {
    backgroundColor: colors.accent,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  checkAvailabilityButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  calculateButton: {
    backgroundColor: colors.accent,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  calculateButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    fontFamily: 'Montserrat-Bold',
    color: colors.primary,
  },
  payButton: {
    backgroundColor: colors.success,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  payButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
});

export default BookingScreen;
