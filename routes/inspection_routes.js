const express = require('express');
const Inspection = require('../models/inspection').default;
const router = express.Router();

// Get all inspections
router.get('/', async (req, res) => {
  const inspections = await Inspection.find().populate('applicationId');
  res.json(inspections);
});

// Create a new inspection
router.post('/', async (req, res) => {
  const newInspection = new Inspection(req.body);
  const savedInspection = await newInspection.save();
  res.status(201).json(savedInspection);
});

// Update an inspection
router.put('/:id', async (req, res) => {
  const updatedInspection = await Inspection.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedInspection);
});

// Delete an inspection
router.delete('/:id', async (req, res) => {
  await Inspection.findByIdAndDelete(req.params.id);
  res.status(204).json({ message: 'Inspection deleted' });
});

module.exports = router;
