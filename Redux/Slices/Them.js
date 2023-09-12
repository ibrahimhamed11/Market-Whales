// themeSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';

const defaultTheme = Appearance.getColorScheme() || 'light';

const ThemeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: defaultTheme,
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = ThemeSlice.actions;

export default ThemeSlice.reducer;
