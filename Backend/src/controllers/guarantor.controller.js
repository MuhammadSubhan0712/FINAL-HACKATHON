import Guarantor from "../models/guarantor.model.js";

// Create a new guarantor
export const createGuarantor = async (req, res) => {
  const { name, email, location, cnic, bankDetails, permissionAddress } =
    req.body;

  if (
    !name ||
    !email ||
    !location ||
    !cnic ||
    !bankDetails ||
    !permissionAddress
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const guarantor = new Guarantor({
      name,
      email,
      location,
      cnic,
      bankDetails,
      permissionAddress,
    });

    await guarantor.save();

    res
      .status(201)
      .json({ message: "Guarantor created successfully", guarantor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all guarantors
export const getAllGuarantors = async (req, res) => {
  try {
    const guarantors = await Guarantor.find();
    res.status(200).json({ guarantors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single guarantor by ID
export const getGuarantorById = async (req, res) => {
  const { id } = req.params;

  try {
    const guarantor = await Guarantor.findById(id);
    if (!guarantor) {
      return res.status(404).json({ message: "Guarantor not found" });
    }

    res.status(200).json({ guarantor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a guarantor's details
export const updateGuarantor = async (req, res) => {
  const { id } = req.params;
  const { name, email, location, cnic, bankDetails, permissionAddress } =
    req.body;

  if (
    !name ||
    !email ||
    !location ||
    !cnic ||
    !bankDetails ||
    !permissionAddress
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const guarantor = await Guarantor.findById(id);
    if (!guarantor) {
      return res.status(404).json({ message: "Guarantor not found" });
    }

    guarantor.name = name;
    guarantor.email = email;
    guarantor.location = location;
    guarantor.cnic = cnic;
    guarantor.bankDetails = bankDetails;
    guarantor.permissionAddress = permissionAddress;

    await guarantor.save();

    res
      .status(200)
      .json({ message: "Guarantor updated successfully", guarantor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a guarantor by ID
export const deleteGuarantor = async (req, res) => {
  const { id } = req.params;

  try {
    const guarantor = await Guarantor.findById(id);
    if (!guarantor) {
      return res.status(404).json({ message: "Guarantor not found" });
    }

    await guarantor.remove();

    res.status(200).json({ message: "Guarantor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get guarantors for a loan
export const getGuarantorsForLoan = async (req, res) => {
  const { loanId } = req.params;

  try {
    const guarantors = await Guarantor.find({ loan: loanId }).populate("loan");
    if (!guarantors.length) {
      return res
        .status(404)
        .json({ message: "No guarantors found for this loan" });
    }

    res.status(200).json({ guarantors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
