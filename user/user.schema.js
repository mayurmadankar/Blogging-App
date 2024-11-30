import { createHmac, randomBytes } from "crypto";
import mongoose from "mongoose";

// Mongoose user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER"
  }
});
// Export the user model
export const userModel = mongoose.model("User", userSchema);
