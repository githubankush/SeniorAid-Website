import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Heart, ClipboardList, MapPin } from "lucide-react";
export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const isVolunteer = user?.role === "volunteer";
  const isAdmin = user?.role === "admin";
  if (isAdmin) {
    return navigate("/admin-dashboard");
  }
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] bg-gradient-to-b from-blue-50 to-white text-center ">
        <h2 className="text-5xl font-extrabold mb-3 text-blue-700 drop-shadow">
          Welcome to <span className="text-gray-800">Senior<span className="text-yellow-500">Aid</span></span>
        </h2>
        <p className="mb-6 text-xl text-gray-600 max-w-xl">
          A caring community built to support seniors worldwide — request
          assistance, connect with volunteers, and never feel alone.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-md">
          <button
            onClick={() => navigate("/login")}
            className="flex-1 px-6 py-3 text-lg rounded-2xl bg-blue-600 text-white hover:bg-blue-700 shadow-md transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="flex-1 px-6 py-3 text-lg rounded-2xl bg-green-600 text-white hover:bg-green-700 shadow-md transition"
          >
            Register
          </button>
        </div>
      </div>
    );
  }
  if(isVolunteer) {
   return (
  <div className="min-h-[calc(100vh-16rem)] bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100">
    {/* Header */}
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 flex items-center justify-between rounded-b-3xl shadow-lg">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 flex items-center justify-center bg-white/20 rounded-full shadow-md backdrop-blur-md">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-white drop-shadow">
            Hello, {user?.name || "Volunteer"}
          </h1>
          <p className="text-indigo-100">
            Welcome back to your kindness hub 🌟
          </p>
        </div>
      </div>
    </header>

    {/* Main content */}
    <main className="p-8 max-w-7xl mx-auto">
      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        <button
          onClick={() => navigate("/volunteer-dashboard")}
          className="flex flex-col items-center justify-center p-8 bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition transform cursor-pointer"
        >
          <ClipboardList className="w-12 h-12 text-purple-600 mb-4" />
          <span className="font-semibold text-gray-800 text-lg">
            View Requests
          </span>
          <p className="text-gray-600 text-sm mt-2 text-center">
            Check requests assigned to you or nearby seniors
          </p>
        </button>

        <button
          onClick={() => navigate("/volunteer-dashboard")}
          className="flex flex-col items-center justify-center p-8 bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition transform cursor-pointer"
        >
          <MapPin className="w-12 h-12 text-blue-600 mb-4" />
          <span className="font-semibold text-gray-800 text-lg">
            Add Help Location
          </span>
          <p className="text-gray-600 text-sm mt-2 text-center">
            Mark your availability or areas where you can help
          </p>
        </button>

        <button
          onClick={() => navigate("/volunteer-dashboard")}
          className="flex flex-col items-center justify-center p-8 bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition transform cursor-pointer"
        >
          <Heart className="w-12 h-12 text-red-500 mb-4" />
          <span className="font-semibold text-gray-800 text-lg">
            My Contributions
          </span>
          <p className="text-gray-600 text-sm mt-2 text-center">
            Track your volunteering history and hours
          </p>
        </button>
      </div>

      {/* Motivational Section */}
      <div className="mt-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-40"></div>
        <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-12 rounded-3xl shadow-2xl text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            🌍 Every Act of Kindness Counts!
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Your time, your effort, and your compassion transform lives.  
            Keep spreading positivity and making a difference 💜
          </p>
        </div>
      </div>
    </main>
  </div>
);

  }
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center bg-gradient-to-b from-blue-50 via-white to-gray-50 px-4 py-8">
      {/* Greeting Section */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-2 text-center">
        👋 Hello, {user?.name || "Friend"}
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">
        We’re here to support you with everyday needs. Choose a service below
        and let us make life a little easier 💙
      </p>

      {/* Grid for Request Types */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 w-full max-w-3xl">
        {[
          { icon: "💊", label: "Medicine", color: "from-pink-100 to-pink-50" },
          { icon: "🛒", label: "Grocery", color: "from-green-100 to-green-50" },
          { icon: "🚕", label: "Transport", color: "from-yellow-100 to-yellow-50" },
          { icon: "👥", label: "Companion", color: "from-purple-100 to-purple-50" },
          { icon: "❤️", label: "SOS", color: "from-red-100 to-red-50" },
        ].map((action, i) => (
          <button
            key={i}
            onClick={() =>
              navigate("/request", { state: { type: action.label } })
            }
            className={`flex flex-col items-center justify-center p-6 text-lg font-semibold 
            bg-gradient-to-b ${action.color} text-gray-800 rounded-2xl 
            shadow-md hover:shadow-xl hover:scale-105 transition min-h-[140px]`}
          >
            <span className="text-4xl mb-2">{action.icon}</span>
            {action.label}
          </button>
        ))}
      </div>

      {/* Floating SOS Button */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 animate-bounce">
        <button
          onClick={() => navigate("/request")}
          className="px-8 py-5 rounded-full bg-red-600 text-white font-bold text-lg shadow-lg 
          hover:bg-red-700 hover:scale-105 transition"
        >
          🆘 Quick Help
        </button>
      </div>
    </div>
  );
}
