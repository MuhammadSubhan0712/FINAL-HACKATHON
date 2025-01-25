import mongoose from "mongoose";

const loanCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    enum: [
      "Wedding Loans",
      "Home Construction Loans",
      "Business Startup Loans",
      "Education Loans",
    ],
  },
  maxLoanAmount: {
    type: Number,
    required: true,
  },
  loanPeriodYears: {
    type: Number,
    required: true,
  },
  subcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
    },
  ],
});

const LoanCategory = mongoose.model("LoanCategory", loanCategorySchema);
module.exports = LoanCategory;
