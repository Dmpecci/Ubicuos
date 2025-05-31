// controllers/taxiStopReservationController.js
const TaxiStopReservation = require('../models/TaxiStopReservation');

// GET: listar todas las reservas de paradas de taxi
const getAllTaxiStopReservations = async (req, res) => {
  try {
    const reservations = await TaxiStopReservation.find();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: crear una nueva reserva de parada de taxi
const createTaxiStopReservation = async (req, res) => {
  try {
    // req.body debe contener los campos renombrados (numero, gisX, gisY, etc.)
    const newReservation = new TaxiStopReservation(req.body);
    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllTaxiStopReservations,
  createTaxiStopReservation
};
