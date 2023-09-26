// store.js
import { configureStore } from '@reduxjs/toolkit';
import Notify from './Slices/Notify';
import ProductSlice from './Slices/ProductSlice';
import Localization from './Slices/Localization';
import ThemeSlice from './Slices/Them';
import AuthSlice from './Slices/authSlice'; // Import the AuthSlice

export const Store = configureStore({
  reducer: {
    ProductSlice,
    Localization,
    Notify,
    ThemeSlice,
    AuthSlice, 
  },
});
