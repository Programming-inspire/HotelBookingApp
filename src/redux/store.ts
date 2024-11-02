// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import hotelsReducer from './slices/hotelSlice';

export const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
