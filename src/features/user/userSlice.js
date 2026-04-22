import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  preferences: {
    language: 'en',
    theme: 'light',
    notifications: {
      courses: true,
      labs: true,
      achievements: true,
      leaderboard: true,
      messages: true,
      announcements: true,
      reports: true,
    },
  },
  stats: {
    coursesEnrolled: 0,
    labsCompleted: 0,
    projectsSubmitted: 0,
    xpPoints: 0,
  },
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setPreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearUser: (state) => {
      state.profile = null;
      state.stats = initialState.stats;
    },
  },
});

export const { setProfile, setPreferences, updateStats, setLoading, clearUser } = userSlice.actions;

export default userSlice.reducer;
