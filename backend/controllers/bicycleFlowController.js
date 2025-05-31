// controllers/bicycleFlowController.js
const BicycleFlow = require('../models/BicycleFlow');

// GET: obtener todos los registros
const getAllBicycleFlows = async (req, res) => {
  try {
    const flows = await BicycleFlow.find();
    res.status(200).json(flows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: crear un nuevo registro
const createBicycleFlow = async (req, res) => {
  try {
    // req.body debería contener los campos del documento
    const newFlow = new BicycleFlow(req.body);
    const savedFlow = await newFlow.save();
    res.status(201).json(savedFlow);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllBicycleFlows,
  createBicycleFlow
};
