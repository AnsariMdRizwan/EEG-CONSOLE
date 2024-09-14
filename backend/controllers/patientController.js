const Patient = require('../models/Patient.js');

// Create a new patient
exports.createPatient = async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json("New patient Added successfully with sufficient document");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    res.status(200).json(patient);
  } catch (error) {
    res.status(404).json({ error: "Patient not found" });
  }
};
