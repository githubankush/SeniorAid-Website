import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

// Connect to DB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173", // use env for flexibility
  credentials: true, 
}));
app.use(cookieParser());
app.use(express.json()); // parse JSON requests

// Routes
app.get("/", (req, res) => res.send("API is running..."));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);  
app.use("/api/requests", requestRoutes);

// Error handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Global error handler (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
