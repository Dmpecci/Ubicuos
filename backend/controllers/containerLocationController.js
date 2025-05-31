// controllers/containerLocationController.js
const ContainerLocation = require('../models/ContainerLocation');

// GET: Obtener todos los contenedores
const getAllContainerLocations = async (req, res) => {
  try {
    const containers = await ContainerLocation.find();
    res.status(200).json(containers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: Crear un nuevo registro de contenedor
const createContainerLocation = async (req, res) => {
  try {
    // req.body debe contener los campos con el formato renombrado
    const newContainer = new ContainerLocation(req.body);
    const savedContainer = await newContainer.save();
    res.status(201).json(savedContainer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllContainerLocations,
  createContainerLocation
};
