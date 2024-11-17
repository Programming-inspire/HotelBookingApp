import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Booking {
  _id: string;
  hotelName: string;
  location: string;
  startDate: string;
  endDate: string;
  adults: number;
  kids: number;
  totalAmount: number;
}

interface BookingState {
  userBookings: Booking[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BookingState = {
  userBookings: [],
  status: 'idle',
  error: null,
};

export const fetchUserBookings = createAsyncThunk(
  'bookings/fetchUserBookings',
  async (userId: string) => {
    console.log(`Fetching bookings for user ID: ${userId}`);
    const response = await axios.get(`http://localhost:5000/bookings?userId=${userId}`);
    console.log('Fetched bookings response:', response.data);
    return response.data;
  }
);


export const cancelBooking = createAsyncThunk(
  'bookings/cancelBooking',
  async (bookingId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/cancel-booking/${bookingId}`);
      return bookingId;
    } catch (error) {
      console.error("Error cancelling booking:", error);
      return rejectWithValue('Error cancelling booking');
    }
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.userBookings.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        console.log('Updating state with fetched bookings:', action.payload);
        state.status = 'succeeded';
        state.userBookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch bookings';
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.userBookings = state.userBookings.filter(
          (booking) => booking._id !== action.payload
        );
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { addBooking } = bookingsSlice.actions;
export default bookingsSlice.reducer;
