import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "senior",
    address: "",
    phone: "",
    age: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const { handleRegister } = useContext(AuthContext);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleRegister(form);
      toast.success("Registration successful! 🎉", { autoClose: 3000 });
      setForm({
        name: "",
        email: "",
        password: "",
        role: "senior",
        address: "",
        phone: "",
        age: "",
        gender: "",
      });
      Navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-16rem)]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96 transition-transform transform hover:scale-[1.01]"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-[#FDC700]">
          Create Account
        </h2>

        {/* Name */}
        <label className="block mb-2 font-medium text-gray-700">Full Name</label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
          className="w-full p-3 mb-4 border rounded-xl focus:ring-2 focus:ring-[#FDC700]"
        />

        {/* Email */}
        <label className="block mb-2 font-medium text-gray-700">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          className="w-full p-3 mb-4 border rounded-xl focus:ring-2 focus:ring-[#FDC700]"
        />

        {/* Password */}
        <label className="block mb-2 font-medium text-gray-700">Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Create a password"
          required
          className="w-full p-3 mb-4 border rounded-xl focus:ring-2 focus:ring-[#FDC700]"
        />

        {/* Address */}
        <label className="block mb-2 font-medium text-gray-700">Addresss <span className="text-gray-700 text-sm">(optional)</span></label>
        <input
          name="address"
          type="text"
          value={form.address}
          onChange={handleChange}
          placeholder="Enter your address"
          className="w-full p-3 mb-4 border rounded-xl focus:ring-2 focus:ring-[#FDC700]"
        />

        {/* Phone */}
        <label className="block mb-2 font-medium text-gray-700">Phone <span className="text-gray-700 text-sm">(optional)</span></label>
        <input
          name="phone"
          type="text"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="w-full p-3 mb-4 border rounded-xl focus:ring-2 focus:ring-[#FDC700]"
        />

        {/* Age */}
        <label className="block mb-2 font-medium text-gray-700">Age <span className="text-gray-700 text-sm">(optional)</span></label>
        <input
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          placeholder="Enter your age"
          min="1"
          className="w-full p-3 mb-4 border rounded-xl focus:ring-2 focus:ring-[#FDC700]"
        />

        {/* Gender */}
        <label className="block mb-2 font-medium text-gray-700">Gender <span className="text-gray-700 text-sm">(optional)</span></label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-xl focus:ring-2 focus:ring-[#FDC700]"
        >
          <option value="">Select Gender</option>
          <option value="male">♂️ Male</option>
          <option value="female">♀️ Female</option>
          <option value="other">⚧️ Other</option>
        </select>

        {/* Role */}
        <label className="block mb-2 font-medium text-gray-700">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-3 mb-6 border rounded-xl focus:ring-2 focus:ring-[#FDC700]"
        >
          <option value="senior">👵 Senior Citizen</option>
          <option value="volunteer">🙋 Volunteer</option>
        </select>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-[#FDC700]" : "bg-[#FDC700] hover:bg-green-700"
          } text-white font-semibold py-3 rounded-xl transition duration-200`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="mt-4 text-center text-gray-600">
          Already registered?{" "}
          <Link to="/login" className="text-blue-800 font-semibold">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
