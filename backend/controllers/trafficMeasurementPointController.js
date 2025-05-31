// controllers/trafficMeasurementPointController.js
const TrafficMeasurementPoint = require('../models/TrafficMeasurementPoint');

// GET: listar todos los puntos de medida de tráfico
const getAllTrafficPoints = async (req, res) => {
  try {
    const points = await TrafficMeasurementPoint.find();
    res.status(200).json(points);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: crear un nuevo punto de medida de tráfico
const createTrafficPoint = async (req, res) => {
  try {
    // req.body debe llevar los campos renombrados
    // (tipoElem, distrito, pointId, codCent, nombre, utmX, utmY, longitud, latitud)
    const newPoint = new TrafficMeasurementPoint(req.body);
    const savedPoint = await newPoint.save();
    res.status(201).json(savedPoint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllTrafficPoints,
  createTrafficPoint
};
