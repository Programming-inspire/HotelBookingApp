// src/redux/slices/hotelSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
}

interface HotelsState {
  hotels: Hotel[];
  searchQuery: string; // Add this line
}

const initialState: HotelsState = {
  hotels: [],
  searchQuery: '', // Add this line
};

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    setHotels(state, action: PayloadAction<Hotel[]>) {
      state.hotels = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) { // Add this reducer
      state.searchQuery = action.payload;
    },
  },
});

export const { setHotels, setSearchQuery } = hotelsSlice.actions;
export default hotelsSlice.reducer;
