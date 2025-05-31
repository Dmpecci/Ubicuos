// routes/occupancyRotationalParkingRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllOccupancies,
  createOccupancy
} = require('../controllers/occupancyRotationalParkingController');

// GET /api/occupancy-rotational-parkings
router.get('/', getAllOccupancies);

// POST /api/occupancy-rotational-parkings
router.post('/', createOccupancy);

module.exports = router;
