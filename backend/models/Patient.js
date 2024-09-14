const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  patientId: String,
  medicalHistory: String,
  eegRecords: [{
    filename: String,       // EEG file location
    uploadedAt: { type: Date, default: Date.now },
    diseasePrediction: {
      disease: String,
      confidence: Number,
      details: String
    }
  }]
});

module.exports = mongoose.model('Patient', patientSchema);
