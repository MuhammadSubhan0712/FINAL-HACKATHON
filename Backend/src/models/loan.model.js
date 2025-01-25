import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    loanPeriod: {
      type: Number,
      required: true,
    },
    guarantors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Guarantor",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Loan", loanSchema);
