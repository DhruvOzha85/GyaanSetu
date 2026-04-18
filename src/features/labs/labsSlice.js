import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  catalog: [],
  current: null,
  submissions: [],
  isLoading: false,
  error: null,
};

const labsSlice = createSlice({
  name: 'labs',
  initialState,
  reducers: {
    setCatalog: (state, action) => {
      state.catalog = action.payload;
    },
    setCurrentLab: (state, action) => {
      state.current = action.payload;
    },
    setSubmissions: (state, action) => {
      state.submissions = action.payload;
    },
    addSubmission: (state, action) => {
      state.submissions.unshift(action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCatalog, setCurrentLab, setSubmissions, addSubmission, setLoading, setError } =
  labsSlice.actions;

export default labsSlice.reducer;
