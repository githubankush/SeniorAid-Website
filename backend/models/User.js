import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["senior", "volunteer", "admin"],
    default: "senior",
  },
  address: { type: String },
  phone: { type: String },
  age: { type: Number },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }],
  acceptedRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }],


}, { timestamps: true });

export default mongoose.model("User", userSchema);
