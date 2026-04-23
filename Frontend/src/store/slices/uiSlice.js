import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  isSidebarOpen: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { setTheme, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
