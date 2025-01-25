import express from "express";

import {
  createGuarantor,
  getAllGuarantors,
  getGuarantorById,
  updateGuarantor,
  deleteGuarantor,
  getGuarantorsForLoan,
} from "../controllers/guarantor.controller.js";

const router = express.Router();

// To create Guarantor
router.post("/createGuarantor", createGuarantor);

// To get all Guarantor

router.get("/getAllGuarantors", getAllGuarantors);

// To get specific Guarantor

router.get("/getGuarantorById/:id", getGuarantorById);

// To get specific guarantor for Loan

router.get("/getGuarantorsForLoan/:id", getGuarantorsForLoan);

// To update specific Gurantor

router.put("/updateGuarantor/:id", updateGuarantor);

// To delete specific Loan

router.delete("/deleteGuarantor/:id", deleteGuarantor);

export default router;
