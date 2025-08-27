import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },

    // Type of request
    type: {
      type: String,
      enum: ["Medicine", "Grocery", "Transport", "Companion", "SOS"],
      required: true,
    },

    // Urgency level
    urgency: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Low",
    },

    // Destination (for Transport/Grocery delivery etc.)
    destination: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Completed"],
      default: "Pending",
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Request", requestSchema);
