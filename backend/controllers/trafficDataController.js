// controllers/trafficDataController.js
const TrafficData = require('../models/TrafficData');

// GET: listar todos los registros de tráfico
const getAllTrafficData = async (req, res) => {
  try {
    const data = await TrafficData.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: crear un nuevo registro de tráfico
const createTrafficData = async (req, res) => {
  try {
    // req.body debe incluir measureId, fecha, tipoElem, etc.
    const newTraffic = new TrafficData(req.body);
    const savedTraffic = await newTraffic.save();
    res.status(201).json(savedTraffic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllTrafficData,
  createTrafficData
};
