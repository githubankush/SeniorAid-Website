import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LogOut,
  LogIn,
  Home,
  ArrowLeft,
  ArrowRight,
  HeartHandshake,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isVolunteer = user?.role === "volunteer";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 shadow-lg ${
        isVolunteer
          ? "bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900"
          : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
      } text-white`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <h1 className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
          <Link to="/" className="hover:text-yellow-400 transition-colors">
            Senior<span className="text-yellow-400">Aid</span>
          </Link>

          {/* Volunteer Badge */}
          {isVolunteer && (
            <span className="ml-2 px-3 py-1 text-xs font-bold bg-yellow-400 text-purple-900 rounded-full animate-pulse">
              Volunteer
            </span>
          )}
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-lg">
          <NavLink
            to="/"
           className={({ isActive }) =>
          isActive
            ? "flex items-center gap-1 text-yellow-400 hover:text-yellow-400 transition"
            : "flex items-center gap-1 hover:text-yellow-600 transition"
        }
           
          >
            <Home size={18} /> Home
          </NavLink>

          {!user ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
          isActive
            ? "flex items-center gap-1 text-yellow-400 hover:text-yellow-400 transition"
            : "flex items-center gap-1 hover:text-yellow-600 transition"
        }
              >
                <LogIn size={18} /> Login
              </NavLink>
              <NavLink to="/register" 
              className={({ isActive }) =>
          isActive
            ? "flex items-center gap-1 text-yellow-400 hover:text-yellow-400 transition"
            : "flex items-center gap-1 hover:text-yellow-600 transition"
        }
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
          isActive
            ? "flex items-center gap-1 text-yellow-400 hover:text-yellow-400 transition"
            : "flex items-center gap-1 hover:text-yellow-600 transition"
        }
              >
                <User size={18} /> Profile
              </NavLink>

              {/* Volunteer Extra Features */}
              {isVolunteer && (
                <NavLink
                  to="/volunteer-dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-1 text-yellow-400 hover:text-yellow-400 transition"
                      : "flex items-center gap-1 hover:text-yellow-600 transition"
                  }
                >
                  <HeartHandshake size={18} /> Help Requests
                </NavLink>
              )}
            </>
          )}
        </div>

        {/* Back / Next */}
        <div className="hidden md:flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="bg-yellow-500 text-black px-4 py-2 rounded-xl shadow hover:bg-yellow-600 transition"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => navigate(1)}
            className="bg-yellow-500 text-black px-4 py-2 rounded-xl shadow hover:bg-yellow-600 transition"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden shadow-lg rounded-b-2xl mx-3 mt-2 p-4 flex flex-col gap-4 ${
              isVolunteer ? "bg-purple-800" : "bg-gray-800"
            }`}
          >
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 hover:text-yellow-400"
            >
              <Home size={18} /> Home
            </Link>

            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 hover:text-yellow-400"
                >
                  <LogIn size={18} /> Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-yellow-400"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 hover:text-yellow-400"
                >
                  <User size={18} /> Profile
                </Link>

                {/* Volunteer Extra Feature in Mobile */}
                {isVolunteer && (
                  <Link
                    to="/volunteer-dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-yellow-400 font-semibold hover:text-white"
                  >
                    <HeartHandshake size={18} /> Help Requests
                  </Link>
                )}
              </>
            )}

            {/* Back / Next inside mobile menu */}
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => {
                  navigate(-1);
                  setIsOpen(false);
                }}
                className="bg-yellow-500 text-black px-3 py-2 rounded-lg hover:bg-yellow-600 w-full flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} /> Back
              </button>
              <button
                onClick={() => {
                  navigate(1);
                  setIsOpen(false);
                }}
                className="bg-yellow-500 text-black px-3 py-2 rounded-lg hover:bg-yellow-600 w-full flex items-center justify-center gap-2"
              >
                Next <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
