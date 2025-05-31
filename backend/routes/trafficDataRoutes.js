// routes/trafficDataRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllTrafficData,
  createTrafficData
} = require('../controllers/trafficDataController');

// GET /api/traffic-data
router.get('/', getAllTrafficData);

// POST /api/traffic-data
router.post('/', createTrafficData);

module.exports = router;
