const mongoose = require("mongoose");

// Defining patient schema
const patientSchema = new mongoose.Schema({
    patientId: String,
    age: Number,
    sex: String,
    condition: String,
    dateOfUpload: Date,
    filesUploaded: [String],
    status: String,
  });
  
  const Patient = mongoose.model('patients', patientSchema);

  module.exports = Patient;