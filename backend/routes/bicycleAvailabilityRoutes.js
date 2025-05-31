// routes/bicycleAvailabilityRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllBicycleAvailabilities,
  createBicycleAvailability
} = require('../controllers/bicycleAvailabilityController');

// GET /api/bicycle-availability
router.get('/', getAllBicycleAvailabilities);

// POST /api/bicycle-availability
router.post('/', createBicycleAvailability);

module.exports = router;
