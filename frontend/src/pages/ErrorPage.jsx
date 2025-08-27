import React from "react";
import Lottie from "lottie-react";
import animation404 from "../assets/404 error.json"
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]  bg-gray-50  text-center">
      <Lottie
        animationData={animation404}
        loop={true}
        className="w-80 h-80"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Oops! Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
