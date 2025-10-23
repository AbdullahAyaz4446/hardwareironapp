import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  flag: false,
};

export const flagSlice = createSlice({
  name: 'flag',
  initialState,
  reducers: {
    setFlag(state, action) {
      state.flag = action.payload;
    },
    getFlag(state) {
      state = state;
    },
  },
});

export const { setFlag } = flagSlice.actions;
export default flagSlice.reducer;
