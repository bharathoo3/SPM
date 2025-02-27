const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  jobRole: { type: String, required: true },
  salary: { type: String },
  location: { type: String },
  visitDate: { type: String },
  eligibility: { type: String },
  poster: { type: String }
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company; // ✅ Export using CommonJS
