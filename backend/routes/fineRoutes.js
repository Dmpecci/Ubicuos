// routes/fineRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllFines,
  createFine
} = require('../controllers/fineController');

// GET /api/fines
router.get('/', getAllFines);

// POST /api/fines
router.post('/', createFine);

module.exports = router;
