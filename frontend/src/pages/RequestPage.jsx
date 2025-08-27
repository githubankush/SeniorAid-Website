// src/pages/RequestPage.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

const RequestPage = () => {
  const location = useLocation();
  const prefilledType = location.state?.type || "General";

  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    type: prefilledType,
    title: "",
    description: "",
    urgency: "",
    destination: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch all requests
  const fetchRequests = async () => {
    try {
      const { data } = await api.get(
        `${import.meta.env.VITE_BACKEND_URL}/requests`,
        {
          withCredentials: true,
        }
      );
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(
        `/requests`,
        {
          title: form.title,
          description: form.description,
          type: form.type,
          urgency: form.type === "Medicine" ? form.urgency : undefined,
          destination: form.type === "Transport" ? form.destination : undefined,
        },
        { withCredentials: true }
      );
       toast.success("Request created successfully 🎉", {
        position: "top-right",
        autoClose: 3000,
      });
      
      // Reset form but keep prefilledType
      setForm({
        type: prefilledType,
        title: "",
        description: "",
        urgency: "",
        destination: "",
      });

      fetchRequests(); // refresh list
    } catch (error) {
      console.error("Error creating request:", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Request Form */}
      <h2 className="text-2xl font-bold mb-4">Create a Request</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 mb-8 space-y-4"
      >
        {/* Request Type */}
        <div>
          <label className="block font-medium">Request Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          >
            <option value="General">General</option>
            <option value="Medicine">Medicine</option>
            <option value="Grocery">Grocery</option>
            <option value="Transport">Transport</option>
            <option value="Companion">Companion</option>
            <option value="SOS">SOS</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        {/* Conditional fields */}
        {form.type === "Medicine" && (
          <div>
            <label className="block font-medium">Urgency</label>
            <select
              name="urgency"
              value={form.urgency}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
            >
              <option value="">Select urgency</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
          </div>
        )}

        {form.type === "Transport" && (
          <div>
            <label className="block font-medium">Destination</label>
            <input
              type="text"
              name="destination"
              value={form.destination}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>

      {/* Requests List */}
      <h2 className="text-2xl font-bold mb-4">All Requests</h2>
      <div className="space-y-4">
        {requests.slice().reverse().map((req) => (
          <div
            key={req._id}
            className="bg-gray-50 shadow rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{req.title}</h3>
              <p className="text-sm text-gray-600">{req.description}</p>
              <span className="text-xs text-gray-500">
                Type: {req.type || "General"}
              </span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                req.status === "Pending"
                  ? "bg-yellow-200 text-yellow-800"
                  : req.status === "Accepted"
                  ? "bg-blue-200 text-blue-800"
                  : "bg-green-200 text-green-800"
              }`}
            >
              {req.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestPage;
