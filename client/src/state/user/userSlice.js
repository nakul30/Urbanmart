import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  current:  JSON.parse(localStorage.getItem('user')) || null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    requestAuth: (state) => {
      state.loading = true;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.current = action.payload;
      state.error = null;
    },
    authError: (state, action) => {
      state.loading = false;
      state.current = null;
      state.error = action.payload;
    },
  },
});

export const { requestAuth, authSuccess, authError } = userSlice.actions;

export default userSlice.reducer;
