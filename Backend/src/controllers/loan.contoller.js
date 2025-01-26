import Loan from "../models/loan.model.js";
import Guarantor from "../models/guranator.model.js";
import mongoose from "mongoose";


// Function to calculate the EMI (Equated Monthly Installment)
const calculateLoanEMI = (
  loanAmount,
  annualInterestRate,
  loanPeriodInMonths
) => {
  const monthlyInterestRate = annualInterestRate / 12 / 100; // Monthly interest rate
  const emi =
    (loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, loanPeriodInMonths)) /
    (Math.pow(1 + monthlyInterestRate, loanPeriodInMonths) - 1);

  return emi;
};

// Create loan function
export const createLoan = async (req, res) => {
  const { user, category, subcategory, amount, loanPeriod, guarantors } =
    req.body;

  if (!user || !category || !subcategory || !amount || !loanPeriod) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create new loan document
    const loan = await Loan.create({
      user,
      category,
      subcategory,
      amount,
      loanPeriod,
      guarantors,
    });

    // Calculate EMI
    const emi = calculateLoanEMI(amount, 6, loanPeriod); // Example: 6% annual interest rate
    const totalRepayment = emi * loanPeriod;

    res.status(201).json({
      message: "Loan created successfully",
      loan,
      emi: emi.toFixed(2),
      totalRepayment: totalRepayment.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a guarantor to a loan
export const addGuarantorToLoan = async (req, res) => {
  const { loanId, guarantorId } = req.body;

  try {
    // Check if the loan exists
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    // Check if the guarantor exists
    const guarantor = await Guarantor.findById(guarantorId);
    if (!guarantor) {
      return res.status(404).json({ message: "Guarantor not found" });
    }

    // Check if the guarantor is already in the loan
    if (loan.guarantors.includes(guarantorId)) {
      return res
        .status(400)
        .json({ message: "Guarantor already added to this loan" });
    }

    // Add the guarantor to the loan
    loan.guarantors.push(guarantorId);
    await loan.save();

    res.status(200).json({ message: "Guarantor added to loan", loan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a guarantor from a loan
export const removeGuarantorFromLoan = async (req, res) => {
  const { loanId, guarantorId } = req.body;

  try {
    // Check if the loan exists
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    // Check if the guarantor is already in the loan
    if (!loan.guarantors.includes(guarantorId)) {
      return res
        .status(400)
        .json({ message: "Guarantor not found in this loan" });
    }

    // Remove the guarantor from the loan
    loan.guarantors = loan.guarantors.filter(
      (id) => id.toString() !== guarantorId
    );
    await loan.save();

    res.status(200).json({ message: "Guarantor removed from loan", loan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all loans function
export const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate("user").populate("guarantors");
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get loan details by ID
export const getLoanById = async (req, res) => {
  const { id } = req.params;
  try {
    const loan = await Loan.findById(id)
      .populate("user")
      .populate("guarantors");
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }
    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update loan details
export const updateLoan = async (req, res) => {
  const { id } = req.params;
  const { category, subcategory, amount, loanPeriod, guarantors } = req.body;

  try {
    const updatedLoan = await Loan.findByIdAndUpdate(
      id,
      {
        category,
        subcategory,
        amount,
        loanPeriod,
        guarantors,
      },
      { new: true }
    );

    if (!updatedLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    // Recalculate EMI
    const emi = calculateLoanEMI(updatedLoan.amount, 6, updatedLoan.loanPeriod);
    const totalRepayment = emi * updatedLoan.loanPeriod;

    res.status(200).json({
      message: "Loan updated successfully",
      loan: updatedLoan,
      emi: emi.toFixed(2),
      totalRepayment: totalRepayment.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete loan function
export const deleteLoan = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLoan = await Loan.findByIdAndDelete(id);
    if (!deletedLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }
    res.status(200).json({ message: "Loan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
