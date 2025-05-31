// controllers/locationController.js
const Location = require('../models/Location');

// GET: Listar todas las ubicaciones
const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: Crear una nueva ubicación
const createLocation = async (req, res) => {
  try {
    // req.body debe tener los campos "tipo", "latitude", "longitude", "name" (opcional)
    const newLocation = new Location(req.body);
    const savedLocation = await newLocation.save();
    res.status(201).json(savedLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { 
  getAllLocations, 
  createLocation 
};
