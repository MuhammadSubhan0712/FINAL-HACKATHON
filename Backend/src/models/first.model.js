import mongoose from "mongoose";

const FirstSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("First", FirstSchema);
