const express = require('express');
const router = express.Router();
const { getAllAirData } = require('../controllers/airController');

// GET /api/air
router.get('/', getAllAirData);

module.exports = router;
