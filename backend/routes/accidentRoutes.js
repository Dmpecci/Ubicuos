// routes/accidentRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllAccidents,
  createAccident
} = require('../controllers/accidentController');

// GET /api/accidents
router.get('/', getAllAccidents);

// POST /api/accidents
router.post('/', createAccident);

module.exports = router;
