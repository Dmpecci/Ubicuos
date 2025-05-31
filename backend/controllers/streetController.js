// controllers/streetController.js
const Street = require('../models/Street');

// GET: obtener todos los registros de callejero
const getAllStreets = async (req, res) => {
  try {
    const streets = await Street.find();
    res.status(200).json(streets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: crear un nuevo registro de callejero
const createStreet = async (req, res) => {
  try {
    // req.body contiene los campos en el formato renombrado
    const newStreet = new Street(req.body);
    const savedStreet = await newStreet.save();
    res.status(201).json(savedStreet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllStreets,
  createStreet
};
