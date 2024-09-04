const express = require('express');
const Application = require('../models/application').default;
const router = express.Router();

// Get all applications
router.get('/', async (req, res) => {
  const applications = await Application.find();
  res.json(applications);
});

// Create a new application
router.post('/', async (req, res) => {
  const newApplication = new Application(req.body);
  const savedApplication = await newApplication.save();
  res.status(201).json(savedApplication);
});

// Update an application
router.put('/:id', async (req, res) => {
  const updatedApplication = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedApplication);
});

// Delete an application
router.delete('/:id', async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);
  res.status(204).json({ message: 'Application deleted' });
});

module.exports = router;
