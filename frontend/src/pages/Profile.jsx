import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { LogOut, User, List } from "lucide-react";
import api from "../api";

export default function Profile() {
  const { user, handleLogout } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const isVolunteer = user?.role === "volunteer";

  if (!user)
    return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 px-4">
  <div class="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-sm border border-gray-100">
    <div class="text-6xl mb-4 animate-bounce">👋</div>
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Welcome Back!</h2>
    <p class="text-gray-600 mb-6">Please login to access your profile and request help.</p>
    <button onClick={() => (window.location.href = "/login")} className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-600 transition-all">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H3m12 0l-4-4m4 4l-4 4m6 4v-1a4 4 0 00-4-4H5a4 4 0 00-4 4v1"></path>
      </svg>
      Login
    </button>
  </div>
</div>

    );

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

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center space-y-6 border border-gray-100"
      >
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-md">
          <User className="text-white w-12 h-12" />
        </div>

        {/* User Info */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full justify-center items-center">

          { !isVolunteer && (<button
            onClick={handleViewRequests}
            className="flex w-1/3 items-center justify-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition-all"
          >
            <List className="w-5 h-5" />
            View My Requests
          </button>)}
          

          <button
            onClick={handleLogout}
            className="flex w-1/3 items-center justify-center gap-2 px-6 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Requests Section */}
        {showRequests && (
          <div className="w-full mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              My Requests
            </h3>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : requests.length === 0 ? (
              <p className="text-gray-500">No requests found.</p>
            ) : (
              <ul className="space-y-4">
                {requests.slice().reverse().map((req) => (
                  <motion.li
                    key={req._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-5 border rounded-xl shadow-sm bg-gray-50 hover:shadow-md transition-all"
                  >
                    {/* Title */}
                    <h4 className="font-bold text-lg text-gray-800 mb-1">
                      {req.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">
                      {req.description}
                    </p>

                    {/* Extra Info */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <p>
                        <span className="font-medium text-gray-700">Type:</span>{" "}
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
                          className={`px-2 py-0.5 rounded-full text-xs ${
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
          </div>
        )}
      </motion.div>
    </div>
  );
}
