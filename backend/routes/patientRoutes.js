const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController.js');


// Create a new patient
router.post('/createPatient', patientController.createPatient);

// Get a patient by ID
router.get('/patients/:id', patientController.getPatientById);

module.exports = router;
