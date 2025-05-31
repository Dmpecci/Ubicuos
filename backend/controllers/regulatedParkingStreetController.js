// controllers/regulatedParkingStreetController.js
const RegulatedParkingStreet = require('../models/RegulatedParkingStreet');

// GET: Obtener todos
const getAllRegulatedParkingStreets = async (req, res) => {
  try {
    const streets = await RegulatedParkingStreet.find();
    res.status(200).json(streets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: Crear un nuevo registro
const createRegulatedParkingStreet = async (req, res) => {
  try {
    // req.body debería contener los campos
    // { gisX, gisY, distrito, barrio, calle, numFinca, color, bateriaLinea, numPlazas }
    const newStreet = new RegulatedParkingStreet(req.body);
    const savedStreet = await newStreet.save();
    res.status(201).json(savedStreet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllRegulatedParkingStreets,
  createRegulatedParkingStreet
};
