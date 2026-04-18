import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  catalog: [],
  featured: [],
  enrolled: [],
  current: null,
  filters: {
    language: '',
    category: '',
    difficulty: '',
    price: '',
  },
  isLoading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCatalog: (state, action) => {
      state.catalog = action.payload;
    },
    setFeatured: (state, action) => {
      state.featured = action.payload;
    },
    setEnrolled: (state, action) => {
      state.enrolled = action.payload;
    },
    setCurrentCourse: (state, action) => {
      state.current = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCatalog,
  setFeatured,
  setEnrolled,
  setCurrentCourse,
  setFilters,
  setLoading,
  setError,
} = coursesSlice.actions;

export default coursesSlice.reducer;
