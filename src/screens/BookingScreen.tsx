import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

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
    const roundedAmount = Math.round(amount * 100) / 100; // Round to two decimal places
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
      if (error.response && error.response.data && error.response.data.error) {
        Alert.alert('Error', error.response.data.error);
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

      Alert.alert('Success', response.data.message);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        Alert.alert('Error', error.response.data.error);
      } else {
        Alert.alert('Error', 'Failed to create booking');
      }
    }
  };

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
            <Text style={styles.totalAmount}>Total Amount: ${totalAmount}</Text>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    padding: 20,
    backgroundColor: '#FFF',
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  checkAvailabilityButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  checkAvailabilityButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  calculateButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  calculateButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  payButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookingScreen;
