import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/slices/userSlice';
import flagReducer from '../redux/slices/flagSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    flag: flagReducer,
  },
});
