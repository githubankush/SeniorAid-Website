import { useEffect, useState } from "react";
import api from "../api";
import { Users, ClipboardList, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then((res) => setUsers(res.data));
    api.get("/requests").then((res) => setRequests(res.data));
  }, []);

  const assignVolunteer = (requestId, volunteerId) => {
    api
      .put(`/admin/assign/${requestId}`, { volunteerId })
      .then(() => {
        alert("Volunteer assigned!");
        api.get("/requests").then((res) => setRequests(res.data));
      });
  };

  return (
    <motion.div
      className="p-6 grid gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ClipboardList className="text-blue-600" /> Admin Dashboard
        </h1>
        <span className="text-gray-600">Manage users & requests</span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Users */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-3 border hover:shadow-lg transition"
          whileHover={{ scale: 1.03 }}
        >
          <Users className="text-green-600 w-8 h-8" />
          <div>
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-gray-600">{users.length}</p>
          </div>
        </motion.div>

        {/* Requests */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-3 border hover:shadow-lg transition"
          whileHover={{ scale: 1.03 }}
        >
          <ClipboardList className="text-blue-600 w-8 h-8" />
          <div>
            <h2 className="text-lg font-semibold">Requests</h2>
            <p className="text-gray-600">{requests.length}</p>
          </div>
        </motion.div>

        {/* Volunteers */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-3 border hover:shadow-lg transition"
          whileHover={{ scale: 1.03 }}
        >
          <CheckCircle className="text-purple-600 w-8 h-8" />
          <div>
            <h2 className="text-lg font-semibold">Volunteers</h2>
            <p className="text-gray-600">
              {users.filter((u) => u.role === "Volunteer").length}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Requests Management */}
      <div>
        <h2 className="text-xl font-bold mb-4">Manage Requests</h2>
        <div className="grid gap-4">
          {requests.map((req) => (
            <motion.div
              key={req._id}
              className="bg-white border rounded-2xl p-4 shadow-md hover:shadow-xl transition"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="font-semibold text-lg">{req.description}</h3>
              <p className="text-sm text-gray-600">
                Status:{" "}
                <span
                  className={`font-medium ${
                    req.status === "Pending"
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {req.status}
                </span>
              </p>

              <div className="mt-3 flex gap-3 items-center">
                <select
                  className="border rounded-lg p-2 w-60 bg-gray-50"
                  onChange={(e) => assignVolunteer(req._id, e.target.value)}
                >
                  <option>Select Volunteer</option>
                  {users
                    .filter((u) => u.role === "Volunteer")
                    .map((vol) => (
                      <option key={vol._id} value={vol._id}>
                        {vol.name}
                      </option>
                    ))}
                </select>

                <button
                  onClick={() => alert("Request Closed (future feature)")}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
                >
                  Close Request
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
