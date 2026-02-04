import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    // For email/password users only
    password: {
      type: String,
      select: false, // IMPORTANT: never return password by default
    },

    image: {
      type: String, // profile picture (Google or uploaded)
    },

    phone: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true,
    },

    authProvider: {
      type: String,
      enum: ["credentials", "google"],
      required: true,
      default: "credentials",
    },

    providerId: {
      type: String, // Google sub / provider user id
      index: true,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
