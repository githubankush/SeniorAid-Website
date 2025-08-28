import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";
import { getAllUsers, assignVolunteer } from "../controllers/adminController.js";

const router = express.Router();

// Only admins can access
router.get("/users", protect, requireRole("admin"), getAllUsers);
router.put("/assign/:requestId", protect, requireRole("admin"), assignVolunteer);

export default router;
