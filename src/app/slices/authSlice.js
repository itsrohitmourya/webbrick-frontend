import { createSlice } from "@reduxjs/toolkit";

// ✅ Load initial auth state from localStorage
const storedUser = JSON.parse(localStorage.getItem("user"));
const storedToken = localStorage.getItem("token");

// ✅ Helper function to check token expiration
const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() >= expirationTime; // Check if expired
  } catch (error) {
    console.error("Invalid token format", error);
    return true; // Treat as expired if invalid format
  }
};

const initialState = {
  user: storedUser || null,
  token: storedToken || null,
  isAuthenticated: storedToken && !isTokenExpired(storedToken),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;

      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      // ✅ Save token & user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // ✅ Remove from localStorage on logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    checkTokenExpiration: (state) => {
      if (isTokenExpired(state.token)) {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;

        // ✅ Clear localStorage if token expired
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
  },
});

export const { loginSuccess, logout, checkTokenExpiration } = authSlice.actions;
export default authSlice.reducer;
