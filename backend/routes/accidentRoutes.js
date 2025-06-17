// routes/accidentRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllAccidents,
  createAccident
} = require('../controllers/accidentController');
const {
  getAccidentsData,
  getAccidentFilters,
  getAccidentsKPI
} = require('../controllers/accidentDataController');

// GET /api/accidents
router.get('/', getAllAccidents);

// POST /api/accidents
router.post('/', createAccident);

// GET /api/accidents/data
router.get('/data', getAccidentsData);

// GET /api/accidents/filters
router.get('/filters', getAccidentFilters);

// GET /api/accidents/kpi
router.get('/kpi', getAccidentsKPI);

module.exports = router;
