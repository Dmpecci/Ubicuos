// routes/regulatedParkingStreetRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllRegulatedParkingStreets,
  createRegulatedParkingStreet
} = require('../controllers/regulatedParkingStreetController');

// GET /api/regulated-parking-streets
router.get('/', getAllRegulatedParkingStreets);

// POST /api/regulated-parking-streets
router.post('/', createRegulatedParkingStreet);

module.exports = router;
