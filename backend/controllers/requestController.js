// controllers/requestController.js
import Request from "../models/Request.js";
import User from "../models/User.js";
// Create a new help request (Citizen only)
export const createRequest = async (req, res) => {
  try {
    const { title, description, type } = req.body;

    if (!title || !type) {
      return res.status(400).json({ message: "Title and Type are required" });
    }

    const newRequest = await Request.create({
      title,
      description,
      type, // ✅ added type
      createdBy: req.user._id, // user making the request
    });

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all help requests (for Volunteers/Admins)
export const getRequests = async (req, res) => {
  try {
    const { status } = req.query; // e.g. Pending, Accepted, Completed
    let filter = {};

    // Citizens: only their own requests
    if (req.user.role === "senior") {
      filter.createdBy = req.user._id;
      if (status) filter.status = status;
    }

    // Volunteers
    if (req.user.role === "volunteer") {
      if (status === "Pending") {
        // show only requests that no volunteer has taken yet
        filter.status = "Pending";
      } else if (status === "Accepted" || status === "Completed") {
        // show only requests accepted/completed by this volunteer
        filter.status = status;
        filter.acceptedBy = req.user._id;
      }
    }

    // Admin: can see everything
    if (req.user.role === "admin") {
      if (status) filter.status = status;
    }

    const requests = await Request.find(filter)
      .populate("createdBy", "name email")
      .populate("acceptedBy", "name email");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Update status (Pending | Accepted | Completed)


export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const volunteerId = req.user._id;

    let request;

    // ACCEPT REQUEST
    if (status === "Accepted") {
      request = await Request.findOneAndUpdate(
        { _id: id, status: "Pending" }, // only allow if pending
        { status: "Accepted", acceptedBy: volunteerId },
        { new: true }
      );

      if (!request) {
        return res.status(400).json({ message: "Request already accepted by another volunteer" });
      }

      // add to volunteer's acceptedRequests
      await User.findByIdAndUpdate(volunteerId, {
        $addToSet: { acceptedRequests: request._id }, // prevent duplicates
      });
    }

    // COMPLETE REQUEST
    else if (status === "Completed") {
      request = await Request.findOneAndUpdate(
        { _id: id, status: "Accepted", acceptedBy: volunteerId },
        { status: "Completed" },
        { new: true }
      );

      if (!request) {
        return res.status(400).json({ message: "You cannot complete this request" });
      }

      // remove from volunteer's acceptedRequests
      await User.findByIdAndUpdate(volunteerId, {
        $pull: { acceptedRequests: request._id },
      });
    }

    // UNASSIGN (make it pending again)
    else if (status === "Pending") {
      request = await Request.findOneAndUpdate(
        { _id: id, status: "Accepted", acceptedBy: volunteerId },
        { status: "Pending", acceptedBy: null },
        { new: true }
      );

      if (!request) {
        return res.status(400).json({ message: "You cannot unassign this request" });
      }

      // remove from volunteer's acceptedRequests
      await User.findByIdAndUpdate(volunteerId, {
        $pull: { acceptedRequests: request._id },
      });
    }

    else {
      return res.status(400).json({ message: "Invalid status update" });
    }

    res.json({ message: `Request updated to ${status}`, request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Accept request
export const acceptRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.status !== "Pending")
      return res.status(400).json({ message: "Request is not pending" });

    request.status = "Accepted";
    request.acceptedBy = req.user._id; // ✅ mark who accepted
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Complete request
export const completeRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.acceptedBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized to complete this request" });

    request.status = "Completed";
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel (Unassign) request
export const cancelRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.acceptedBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized to unassign this request" });

    request.status = "Pending";
    request.acceptedBy = null; // ✅ make available again
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



