// routes/trafficMeasurementPointRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllTrafficPoints,
  createTrafficPoint
} = require('../controllers/trafficMeasurementPointController');

// GET /api/traffic-measurement-points
router.get('/', getAllTrafficPoints);

// POST /api/traffic-measurement-points
router.post('/', createTrafficPoint);

module.exports = router;
