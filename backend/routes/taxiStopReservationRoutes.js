// routes/taxiStopReservationRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllTaxiStopReservations,
  createTaxiStopReservation
} = require('../controllers/taxiStopReservationController');

// GET /api/taxi-stop-reservations
router.get('/', getAllTaxiStopReservations);

// POST /api/taxi-stop-reservations
router.post('/', createTaxiStopReservation);

module.exports = router;
