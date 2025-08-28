import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { LogOut, User, List } from "lucide-react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const isVolunteer = user?.role === "volunteer";

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Fetch user requests
  const handleViewRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get("/requests", { withCredentials: true });
      setRequests(res.data);
      setShowRequests(true);
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  // Proper logout flow
  const handleLogoutClick = async () => {
    try {
      await handleLogout(); // clears AuthContext + tokens
      navigate("/"); // redirect immediately
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-3xl border border-gray-200 relative overflow-hidden"
      >
        {/* Floating gradient background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 via-purple-100 to-transparent opacity-40 pointer-events-none"></div>

        {/* Avatar + Info */}
        <div className="relative z-10 flex flex-col items-center space-y-3">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg ring-4 ring-white"
          >
            <User className="text-white w-14 h-14" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-800">{user?.name}</h2>
          <p className="text-gray-500">{user?.email}</p>
          <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
            {user?.role}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="relative z-10 mt-8 flex flex-wrap gap-4 justify-center">
          {!isVolunteer && (
            <button
              onClick={handleViewRequests}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-600 hover:scale-105 transition-all"
            >
              <List className="w-5 h-5" />
              View My Requests
            </button>
          )}
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-xl shadow-lg hover:bg-red-600 hover:scale-105 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Requests Section */}
        {showRequests && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10 relative z-10"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              My Requests
            </h3>
            {loading ? (
              <p className="text-gray-500 text-center">Loading...</p>
            ) : requests.length === 0 ? (
              <p className="text-gray-500 text-center">No requests found.</p>
            ) : (
              <ul className="space-y-4">
                {requests
                  .slice()
                  .reverse()
                  .map((req) => (
                    <motion.li
                      key={req._id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="p-6 border rounded-2xl shadow-md bg-gradient-to-br from-gray-50 to-white hover:shadow-xl hover:scale-[1.01] transition-all"
                    >
                      {/* Title */}
                      <h4 className="font-bold text-lg text-gray-800 mb-2">
                        {req.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-4">
                        {req.description}
                      </p>

                      {/* Extra Info */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <p>
                          <span className="font-medium text-gray-700">
                            Type:
                          </span>{" "}
                          {req.type}
                        </p>
                        <p>
                          <span className="font-medium text-gray-700">
                            Urgency:
                          </span>{" "}
                          {req.urgency}
                        </p>
                        <p>
                          <span className="font-medium text-gray-700">
                            Destination:
                          </span>{" "}
                          {req.destination || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium text-gray-700">
                            Status:
                          </span>{" "}
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              req.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : req.status === "Approved"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {req.status}
                          </span>
                        </p>
                        <p className="col-span-2">
                          <span className="font-medium text-gray-700">
                            Date Applied:
                          </span>{" "}
                          {new Date(req.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </motion.li>
                  ))}
              </ul>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
