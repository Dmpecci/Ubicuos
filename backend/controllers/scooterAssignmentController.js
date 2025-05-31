// controllers/scooterAssignmentController.js

const ScooterAssignment = require('../models/ScooterAssignment');

// GET: Devuelve todos los registros de asignación de patinetes
const getAllScooters = async (req, res) => {
  try {
    const scooters = await ScooterAssignment.find();
    res.status(200).json(scooters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: Crea un nuevo registro de asignación de patinetes
const createScooter = async (req, res) => {
  try {
    // Se asume que req.body contiene
    // {
    //   distrito: "CENTRO",
    //   barrio: "Palacio",
    //   ACCIONA: 4,
    //   Taxify: 4,
    //   ...,
    //   TOTAL: 54
    // }
    const newScooter = new ScooterAssignment(req.body);
    const savedScooter = await newScooter.save();
    res.status(201).json(savedScooter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllScooters,
  createScooter
};
