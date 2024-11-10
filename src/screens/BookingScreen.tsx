// src/screens/BookingScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import axios from 'axios';

type BookingRouteProp = RouteProp<{ params: {
  hotelId: number;
  userId: number;
  price: string;
} }, 'params'>;

const BookingScreen: React.FC = () => {
  const route = useRoute<BookingRouteProp>();
  const { hotelId, userId, price } = route.params;

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState('');

  const calculateTotalAmount = () => {
    const days = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24);
    const amount = days * parseFloat(price.replace(/,/g, '')); // Ensure price is parsed as a number
    setTotalAmount(amount);
  };

  const handlePayment = async () => {
    if (parseFloat(paymentAmount) !== totalAmount) {
      Alert.alert('Error', 'Payment amount does not match the total amount');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/book', {
        hotelId,
        userId,
        startDate,
        endDate,
        adults,
        kids,
        totalAmount,
      });
      Alert.alert('Success', response.data.message);
    } catch (error) {
      Alert.alert('Error', 'Failed to create booking');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Start Date (YYYY-MM-DD)"
          value={startDate}
          onChangeText={setStartDate}
        />
        <TextInput
          style={styles.input}
          placeholder="End Date (YYYY-MM-DD)"
          value={endDate}
          onChangeText={setEndDate}
        />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
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
