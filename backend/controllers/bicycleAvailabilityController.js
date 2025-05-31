// controllers/bicycleAvailabilityController.js
const BicycleAvailability = require('../models/BicycleAvailability');

// GET: Obtener todos los registros
const getAllBicycleAvailabilities = async (req, res) => {
  try {
    const availabilities = await BicycleAvailability.find();
    res.status(200).json(availabilities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: Crear un nuevo registro
const createBicycleAvailability = async (req, res) => {
  try {
    // req.body debería tener los campos en el formato que definimos (p.ej. dia, horasTotalesUsosBicicletas, etc.)
    const newAvailability = new BicycleAvailability(req.body);
    const savedAvailability = await newAvailability.save();
    res.status(201).json(savedAvailability);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllBicycleAvailabilities,
  createBicycleAvailability
};
