import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { 
  getRequests, 
  acceptRequest, 
  completeRequest, 
  cancelRequest, 
  updateRequestStatus, 
  createRequest} from "../controllers/requestController.js";
import { requireRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Citizen creates a request
router.post("/", protect, createRequest);

// Get requests (supports filtering with query params)
router.get("/", protect, getRequests);

// Update request status (Pending, Accepted, Completed)
// requireRole ensures only volunteers can accept/complete/unassign
router.put("/:id", protect, requireRole("volunteer"), updateRequestStatus);
// Actions
router.put("/:id/accept", protect, acceptRequest);
router.put("/:id/complete", protect, completeRequest);
router.put("/:id/cancel", protect, cancelRequest);
export default router;
