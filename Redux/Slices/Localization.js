import * as Localization from 'expo-localization';
import { createSlice } from '@reduxjs/toolkit';

const userLocale = Localization.locale;

const LocalizationSlice = createSlice({
    name: 'localizationstat',
    initialState: {
        language: userLocale.substring(0, 2), 
    },
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
    },
});

export const { setLanguage } = LocalizationSlice.actions;

export default LocalizationSlice.reducer;
