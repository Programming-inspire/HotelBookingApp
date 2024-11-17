import { configureStore } from '@reduxjs/toolkit';
import hotelsReducer from './slices/hotelSlice';
import userReducer from './slices/userSlice';
import bookingsReducer from './slices/bookingSlice';

const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
    user: userReducer,
    bookings: bookingsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
