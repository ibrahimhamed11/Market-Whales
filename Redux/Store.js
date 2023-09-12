import { configureStore, createSlice } from '@reduxjs/toolkit';
import  Notify  from "./Slices/Notify"
import ProductSlice from './Slices/ProductSlice'
import Localization from './Slices/Localization'
import ThemeSlice from './Slices/Them'
export const Store = configureStore({
    reducer: {
        ProductSlice,
        Localization,
        Notify,
        ThemeSlice

    }
})

