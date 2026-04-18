import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import coursesReducer from '../features/courses/coursesSlice';
import labsReducer from '../features/labs/labsSlice';
import uiReducer from '../features/ui/uiSlice';
import languageReducer from '../features/language/languageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    courses: coursesReducer,
    labs: labsReducer,
    ui: uiReducer,
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // For flexibility with complex data objects if needed
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
