import React, { createContext, useState, useEffect } from "react";
import { getProfile, login, logout, register } from "../services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const profile = await getProfile();
      setUser(profile);
    } catch {
      setUser(null);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogin = async (data) => {
    await login(data);
    fetchProfile();
  };

  const handleRegister = async (data) => {
    await register(data);
    fetchProfile();
  };

  const handleLogout = async () => {
  try {
    await logout(); // your API call
    setUser(null);
    toast.success("You have been logged out!",{
        position: "top-right",
        autoClose: 3000,
      }); 
  } catch (err) {
    toast.error("Logout failed, please try again.");
    console.error(err);
  }
};

  return (
    <AuthContext.Provider value={{ user,loading, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
