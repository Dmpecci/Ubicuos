// routes/acousticMeasurementStationRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllAcousticStations,
  createAcousticStation
} = require('../controllers/acousticMeasurementStationController');

// GET /api/acoustic-measurement-stations
router.get('/', getAllAcousticStations);

// POST /api/acoustic-measurement-stations
router.post('/', createAcousticStation);

module.exports = router;
