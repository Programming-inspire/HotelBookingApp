import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View, Platform, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { filterHotels, setFilterLocation } from '../redux/slices/hotelSlice';

const AvailabilityScreen = () => {
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const handleFilter = () => {
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    dispatch(filterHotels({ city, startDate: formattedStartDate, endDate: formattedEndDate }));
    dispatch(setFilterLocation(city)); // Set the filter location
    navigation.navigate('Dashboard');
  };

  const showDatePicker = (type: 'start' | 'end') => {
    if (type === 'start') {
      setShowStartDatePicker(true);
    } else {
      setShowEndDatePicker(true);
    }
  };

  const onDateChange = (event: any, selectedDate: Date | undefined, type: 'start' | 'end') => {
    if (type === 'start') {
      setShowStartDatePicker(Platform.OS === 'ios');
      if (selectedDate) {
        setStartDate(selectedDate);
      }
    } else {
      setShowEndDatePicker(Platform.OS === 'ios');
      if (selectedDate) {
        setEndDate(selectedDate);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Check Availability</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={city} onValueChange={(itemValue) => setCity(itemValue)} style={styles.picker}>
            <Picker.Item label="Select City" value="" />
            <Picker.Item label="Maldives" value="Maldives" />
            <Picker.Item label="Swiss Alps" value="Swiss Alps" />
            <Picker.Item label="New York City" value="New York City" />
            <Picker.Item label="Hawaii" value="Hawaii" />
            <Picker.Item label="Lake Tahoe" value="Lake Tahoe" />
          </Picker>
        </View>
        <TouchableOpacity onPress={() => showDatePicker('start')} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>Select Start Date: {startDate.toDateString()}</Text>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(event, date) => onDateChange(event, date, 'start')}
          />
        )}
        <TouchableOpacity onPress={() => showDatePicker('end')} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>Select End Date: {endDate.toDateString()}</Text>
        </TouchableOpacity>
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={(event, date) => onDateChange(event, date, 'end')}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={handleFilter}>
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  pickerContainer: {
    borderRadius: 5,
    marginBottom: 150,
  },
  picker: {
    height: 50,
  },
  dateButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  dateButtonText: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AvailabilityScreen;
