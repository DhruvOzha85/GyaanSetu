/**
 * GyaanSetu — UI Slice (Redux)
 *
 * Manages global UI state: theme, sidebar, loaders, and modal state.
 */
import { createSlice } from '@reduxjs/toolkit';
import { getItem, setItem } from '@/utils/storage';
import { STORAGE_KEYS } from '@/utils/constants';

const savedTheme = getItem(STORAGE_KEYS.THEME, 'light');
const savedFontSize = getItem('gs_font_size', 2);
const savedReducedMotion = getItem('gs_reduced_motion', false);
const savedHighContrast = getItem('gs_high_contrast', false);

const initialState = {
  theme: savedTheme,         // 'light' | 'dark' | 'system'
  fontSize: savedFontSize,    // 1: Small, 2: Normal, 3: Large, 4: XL
  reducedMotion: savedReducedMotion,
  highContrast: savedHighContrast,
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
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
      setItem('gs_font_size', state.fontSize);
    },
    setReducedMotion: (state, action) => {
      state.reducedMotion = action.payload;
      setItem('gs_reduced_motion', state.reducedMotion);
    },
    setHighContrast: (state, action) => {
      state.highContrast = action.payload;
      setItem('gs_high_contrast', state.highContrast);
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
  setFontSize,
  setReducedMotion,
  setHighContrast,
  toggleSidebar,
  setSidebarOpen,
  setGlobalLoader,
  openModal,
  closeModal,
} = uiSlice.actions;

export default uiSlice.reducer;
