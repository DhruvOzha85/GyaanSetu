import { createSlice } from '@reduxjs/toolkit';
import i18n from '../../i18n';

const initialState = {
  current: i18n.language || 'en',
  available: [
    { code: 'en', name: 'English', nativeName: 'English', isLive: true },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', isLive: true },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', isLive: true },
  ],
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.current = action.payload;
      i18n.changeLanguage(action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
