import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  phoneNumber: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSignup(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.password = action.payload.password;
      console.log(state);
    },
    reSetUser(state) {
      state.name = '';
      state.email = '';
      state.phoneNumber = '';
    },
  },
});

export const { setSignup, reSetUser } = userSlice.actions;
export default userSlice.reducer;
