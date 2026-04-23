import { createSlice } from "@reduxjs/toolkit";
import { safeGet, STORAGE_KEYS } from "@/lib/storage";

const initialState = {
  user: safeGet(STORAGE_KEYS.user, null),
  token: safeGet(STORAGE_KEYS.token, null),
  isAuthenticated: !!safeGet(STORAGE_KEYS.token, null),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
