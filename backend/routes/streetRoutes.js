// routes/streetRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllStreets,
  createStreet
} = require('../controllers/streetController');

// GET /api/streets
router.get('/', getAllStreets);

// POST /api/streets
router.post('/', createStreet);

module.exports = router;
