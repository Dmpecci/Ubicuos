// controllers/occupancyRotationalParkingController.js
const OccupancyRotationalParking = require('../models/OccupancyRotationalParking');

// GET: Listar todos los registros
const getAllOccupancies = async (req, res) => {
  try {
    const records = await OccupancyRotationalParking.find();
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: Crear un nuevo registro
const createOccupancy = async (req, res) => {
  try {
    // req.body debe tener los campos renombrados (anio, mes, nombreAparcamiento, etc.)
    const newRecord = new OccupancyRotationalParking(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllOccupancies,
  createOccupancy
};
