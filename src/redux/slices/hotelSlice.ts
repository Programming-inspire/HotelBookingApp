import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Hotel {
  id: number;
  name: string;
  images: string[];
  location: string;
  rating: number;
  beds: number;
  bathrooms: number;
  guests: number;
  price: string;
  highlights: string[];
  description: string;
  available?: boolean;
}

interface HotelsState {
  hotels: Hotel[];
  searchQuery: string;
  filteredHotels: Hotel[];
  filterLocation: string;
}

const initialState: HotelsState = {
  hotels: [],
  searchQuery: '',
  filteredHotels: [],
  filterLocation: '',
};

export const filterHotels = createAsyncThunk(
  'hotels/filterHotels',
  async (filterCriteria: { city: string; startDate: string; endDate: string }) => {
    console.log('Filtering hotels with criteria:', filterCriteria);
    const response = await axios.post('http://localhost:5000/filter-hotels', filterCriteria);
    console.log('Filtered hotels response:', response.data);
    return response.data;
  }
);

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
    setFilterLocation(state, action: PayloadAction<string>) {
      state.filterLocation = action.payload;
    },
    clearFilter(state) {
      state.filteredHotels = state.hotels;
      state.filterLocation = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(filterHotels.fulfilled, (state, action) => {
      console.log('Updating state with filtered hotels:', action.payload);
      state.filteredHotels = action.payload;
    });
  },
});

export const { setHotels, setSearchQuery, setFilteredHotels, setFilterLocation, clearFilter } = hotelsSlice.actions;
export default hotelsSlice.reducer;
