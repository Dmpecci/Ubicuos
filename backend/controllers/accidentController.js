// controllers/accidentController.js
const Accident = require('../models/Accident');

// GET: Devuelve todos los registros de accidentes
const getAllAccidents = async (req, res) => {
  try {
    const accidents = await Accident.find(); 
    res.status(200).json(accidents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: Crea un nuevo registro de accidente
const createAccident = async (req, res) => {
  try {
    // req.body debe contener los datos a guardar, p. ej:
    // {
    //   num_expediente: "2051S000001",
    //   fecha: "01/01/2051",
    //   hora: "1:15:00",
    //   ...
    // }
    const newAccident = new Accident(req.body);
    await newAccident.save();
    res.status(201).json(newAccident);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllAccidents,
  createAccident
};
