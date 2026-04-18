import { createSlice } from '@reduxjs/toolkit';
import storage from '../../utils/storage';

const initialState = {
  user: storage.getItem('user', null),
  token: storage.getItem('token', null),
  isAuthenticated: !!storage.getItem('token', null),
  isLoading: false,
  error: null,
  onboardingComplete: storage.getItem('onboardingComplete', false),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      storage.setItem('user', user);
      storage.setItem('token', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.onboardingComplete = false;
      storage.removeItem('user');
      storage.removeItem('token');
      storage.removeItem('onboardingComplete');
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setOnboardingComplete: (state, action) => {
      state.onboardingComplete = action.payload;
      storage.setItem('onboardingComplete', action.payload);
    },
  },
});

export const { setCredentials, logout, setLoading, setError, setOnboardingComplete } =
  authSlice.actions;

export default authSlice.reducer;
