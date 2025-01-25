import mongoose from "mongoose";

const recieptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tokenNumber: {
    type: String,
    required: true,
  },
  qrCode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  branchLocation: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Receipt", recieptSchema);
