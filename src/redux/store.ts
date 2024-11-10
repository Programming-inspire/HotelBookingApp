// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import hotelsReducer from './slices/hotelSlice';
import userReducer from './slices/userSlice'; // Import user slice

const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
    user: userReducer, // Add user slice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
