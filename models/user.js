import { createHmac, randomBytes } from "crypto";
import mongoose from "mongoose";

const secret = "abcdefg";
const hash = createHmac("sha256", secret)
  .update("I love cupcakes")
  .digest("hex");
console.log(hash);

// Mongoose user schema
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    salt: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    profileImageURL: {
      type: String,
      default: "/public/images/default.png"
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    }
  },
  { timestamps: true }
);
// Export the user model
export const userModel = mongoose.model("User", userSchema);
