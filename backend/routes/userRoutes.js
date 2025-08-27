// routes/userRoutes.js
import express from "express";
import { getProfile, updateProfile, getAllUsers, deleteUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Profile (logged-in user only)
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

// Admin-only routes
router.get("/", protect, admin, getAllUsers);
router.delete("/:id", protect, admin, deleteUser);

export default router;
