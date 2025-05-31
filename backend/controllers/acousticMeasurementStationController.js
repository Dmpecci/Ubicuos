// controllers/acousticMeasurementStationController.js
const AcousticMeasurementStation = require('../models/AcousticMeasurementStation');

// GET: Listar todas las estaciones de control acústico
const getAllAcousticStations = async (req, res) => {
  try {
    const stations = await AcousticMeasurementStation.find();
    res.status(200).json(stations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: Crear una nueva estación
const createAcousticStation = async (req, res) => {
  try {
    // req.body debería contener los campos con los nombres renombrados
    // Ejemplo si Alt venía como { "(m)": 648 }, deberás parsearlo
    // a un number en la lógica de importación. Aquí ya asumes que req.body.alt = 648
    const newStation = new AcousticMeasurementStation(req.body);
    const savedStation = await newStation.save();
    res.status(201).json(savedStation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllAcousticStations,
  createAcousticStation
};
