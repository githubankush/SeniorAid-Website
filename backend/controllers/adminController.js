// controllers/adminController.js
import User from "../models/User.js";
import Request from "../models/Request.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

export const assignVolunteer = async (req, res) => {
  const { volunteerId } = req.body;
  const request = await Request.findById(req.params.requestId);

  if (!request) return res.status(404).json({ message: "Request not found" });

  request.assignedTo = volunteerId;
  request.status = "Accepted";
  await request.save();

  res.json({ message: "Volunteer assigned successfully", request });
};
