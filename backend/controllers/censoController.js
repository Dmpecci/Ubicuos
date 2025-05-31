// controllers/censoController.js
const Censo = require('../models/Censo');

// GET: Listar todos los registros de censo
const getAllCenso = async (req, res) => {
  try {
    const data = await Censo.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: Crear un nuevo registro de censo
const createCenso = async (req, res) => {
  try {
    // req.body debe incluir los campos definidos en el modelo
    const newCenso = new Censo(req.body);
    const savedCenso = await newCenso.save();
    res.status(201).json(savedCenso);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllCenso,
  createCenso
};
