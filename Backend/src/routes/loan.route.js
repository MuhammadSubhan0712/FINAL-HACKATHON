import express from "express";

import {
  createLoan,
  addGuarantorToLoan,
  removeGuarantorFromLoan,
  getAllLoans,
  getLoanById,
  updateLoan,
  deleteLoan,
} from "../controllers/loan.contoller.js";

const router = express.Router();

// To create Loan
router.post("/createLoan", createLoan);

// To Add Guarantor To Loan

router.post("/addGuarantorToLoan", addGuarantorToLoan);

// To remove Guarantor From Loan

router.delete("/removeGuarantorFromLoan", removeGuarantorFromLoan);

// To get All Loans

router.get("/getAllLoans", getAllLoans);

// To get specific Loan

router.get("/getLoanById/:id", getLoanById);

// To update specific Loan

router.put("/updateLoan/:id", updateLoan);

// To delete specific Loan

router.delete("/deleteLoan/:id", deleteLoan);

export default router;
