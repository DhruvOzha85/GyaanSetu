/**
 * GyaanSetu — UI Slice (Redux)
 *
 * Manages global UI state: theme, sidebar, loaders, and modal state.
 */
import { createSlice } from '@reduxjs/toolkit';
import { getItem, setItem } from '@/utils/storage';
import { STORAGE_KEYS } from '@/utils/constants';

const savedTheme = getItem(STORAGE_KEYS.THEME, 'light');

const initialState = {
  theme: savedTheme,         // 'light' | 'dark'
  sidebarOpen: true,
  globalLoader: false,
  activeModal: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      setItem(STORAGE_KEYS.THEME, state.theme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      setItem(STORAGE_KEYS.THEME, state.theme);
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setGlobalLoader: (state, action) => {
      state.globalLoader = action.payload;
    },
    openModal: (state, action) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  setGlobalLoader,
  openModal,
  closeModal,
} = uiSlice.actions;

export default uiSlice.reducer;
