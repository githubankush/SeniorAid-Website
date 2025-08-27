// src/services/authService.js
import api from "../api";

// Register
export const register = async (userData) => {
  const res = await api.post("/auth/register", userData,{withCredentials: true});
  return res.data;
};

// Login
export const login = async (userData) => {
  const res = await api.post("/auth/login", userData,{withCredentials: true});
  return res.data;
};

// Logout
export const logout = async () => {
  const res = await api.post("/auth/logout",{withCredentials: true});
  return res.data;
};

// Get current user (protected route)
export const getProfile = async () => {
  const res = await api.get("/users/profile",{withCredentials: true});
  return res.data;
};
