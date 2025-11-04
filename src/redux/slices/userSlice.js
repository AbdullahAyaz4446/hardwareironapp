import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: '',
    email: '',
    phone: '',
    password: '',
  },
  onBording: false,
  cart: [],
  Favorites: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSignup(state, action) {
      state.user = action.payload;
    },
    setOnBording(state, action) {
      state.onBording = action.payload;
    },
    setCart(state, action) {
      state.cart = action.payload;
    },
    resetCart(state) {
      state.cart = [];
    },
    setFavourite(state, action) {
      state.Favorites = action.payload;
    },

    reset: () => initialState,
  },
});

export const {
  setSignup,
  setOnBording,
  setCart,
  reset,
  resetCart,
  setFavourite,
} = userSlice.actions;
export default userSlice.reducer;
