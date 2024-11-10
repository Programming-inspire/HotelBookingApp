// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import hotelsReducer from './slices/hotelSlice';

const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
