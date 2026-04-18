/**
 * GyaanSetu — Redux Store Configuration
 *
 * Combines all feature slices into a single store.
 * Redux DevTools are enabled automatically in development.
 */
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '@/features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    // auth: authReducer,        // Added in Part 2
    // user: userReducer,        // Added in Part 2
    // courses: coursesReducer,  // Added in Part 2
    // labs: labsReducer,        // Added in Part 2
    // language: languageReducer, // Added in Part 2
  },
  devTools: import.meta.env.DEV,
});

export default store;
