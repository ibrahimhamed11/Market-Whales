// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: 0,
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = 1;
    },
    logout: (state) => {
      state.isAuthenticated = 0;
    },
  },
});

export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
