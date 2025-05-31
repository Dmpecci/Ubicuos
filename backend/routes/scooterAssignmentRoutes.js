// routes/scooterAssignmentRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllScooters,
  createScooter
} = require('../controllers/scooterAssignmentController');

// GET /api/scooters
router.get('/', getAllScooters);

// POST /api/scooters
router.post('/', createScooter);

module.exports = router;
