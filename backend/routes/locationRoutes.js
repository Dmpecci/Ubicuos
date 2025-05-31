// routes/locationRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllLocations,
  createLocation
} = require('../controllers/locationController');

// GET /api/locations
router.get('/', getAllLocations);

// POST /api/locations
router.post('/', createLocation);

module.exports = router;
