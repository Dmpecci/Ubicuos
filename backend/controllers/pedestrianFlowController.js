// controllers/pedestrianFlowController.js
const PedestrianFlow = require('../models/PedestrianFlow');

// GET: listar todos los registros de peatones
const getAllPedestrianFlows = async (req, res) => {
  try {
    const flows = await PedestrianFlow.find();
    res.status(200).json(flows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: crear un nuevo registro de peatones
const createPedestrianFlow = async (req, res) => {
  try {
    // req.body debe contener los campos tal y como los renombramos
    const newFlow = new PedestrianFlow(req.body);
    const savedFlow = await newFlow.save();
    res.status(201).json(savedFlow);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllPedestrianFlows,
  createPedestrianFlow
};
