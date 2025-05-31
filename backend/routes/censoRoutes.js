// routes/censoRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllCenso,
  createCenso
} = require('../controllers/censoController');

// GET /api/censo
router.get('/', getAllCenso);

// POST /api/censo
router.post('/', createCenso);

module.exports = router;
