import mongoose from "mongoose";

const guarantorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    cnic: {
      type: String,
      required: true,
    },
    bankDetails: {
      bankName: {
        type: String,
        required: true,
      },
      accountNumber: {
        type: String,
        required: true,
      },
      branchCode: {
        type: String,
        required: true,
      },
    },
    permissionAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Guarantor", guarantorSchema);
