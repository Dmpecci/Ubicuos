// controllers/fineController.js
const Fine = require('../models/Fine');

// GET: Listar todas las multas
const getAllFines = async (req, res) => {
  try {
    const fines = await Fine.find();
    res.status(200).json(fines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: Crear una nueva multa
const createFine = async (req, res) => {
  try {
    // req.body debe contener los campos con el formato renombrado
    const newFine = new Fine(req.body);
    const savedFine = await newFine.save();
    res.status(201).json(savedFine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllFines,
  createFine
};
