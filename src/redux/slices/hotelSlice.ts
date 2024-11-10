// src/redux/slices/hotelSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { hotelsData } from '../../data/hotelData'; // Import mock data

interface Hotel {
  id: number;
  name: string;
  images: string[];
  location: string;
  rating: number;
  beds: number;
  bathrooms: number;
  guests: number;
  price: number;
  highlights: string[];
  description: string;
  available?: boolean; // Add this line to handle availability
}

interface HotelsState {
  hotels: Hotel[];
  searchQuery: string;
  filteredHotels: Hotel[];
}

const initialState: HotelsState = {
  hotels: [],
  searchQuery: '',
  filteredHotels: [],
};

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    setHotels(state, action: PayloadAction<Hotel[]>) {
      state.hotels = action.payload.map(hotel => ({ ...hotel, available: true }));
      state.filteredHotels = state.hotels;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setFilteredHotels(state, action: PayloadAction<Hotel[]>) {
      state.filteredHotels = action.payload;
    },
  },
});

export const { setHotels, setSearchQuery, setFilteredHotels } = hotelsSlice.actions;

export const filterHotels = (filterCriteria: { city: string }) => (dispatch: AppDispatch) => {
  const filteredHotels = hotelsData.filter(hotel => hotel.location === filterCriteria.city);
  dispatch(setFilteredHotels(filteredHotels));
};

export default hotelsSlice.reducer;
