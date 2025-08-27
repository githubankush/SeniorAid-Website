import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import RequestPage from "./pages/RequestPage";
import { ToastContainer } from "react-toastify";
import ErrorPage from "./pages/ErrorPage";
import RequireRole from "./components/RequireRole";
import VolunteerDashboard from "./pages/VolunteerDashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar is always visible */}
      <Navbar />

      {/* Main Page Content */}
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="*" element={<ErrorPage />} />

          <Route path="/volunteer-dashboard" element={
            <RequireRole roles={["volunteer", "admin"]}>
              <VolunteerDashboard />
            </RequireRole>
          }/>
          

        </Routes>

      </main>
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
