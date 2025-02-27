const express = require('express');
const multer = require('multer');
const Company = require('../models/company');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// GET all companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/', upload.single('poster'), async (req, res) => {
  try {
    console.log('📝 Received Request Data:', req.body);
    console.log('📷 Uploaded File:', req.file);

    const newCompany = new Company({
      companyName: req.body.companyName,
      visitDate: req.body.visitDate,
      jobRole: req.body.jobRole,
      salary: req.body.salary,
      eligibility: req.body.eligibility === 'true', // Convert to boolean
      poster: req.file ? req.file.path : null, // Store uploaded file path
    });

    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (err) {
    console.error('❌ Error Saving Company:', err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;  // ✅ FIX: Export correctly
