import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem("authUser")) || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user,
    isAuthenticated: !!user,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("authUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("authUser");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
