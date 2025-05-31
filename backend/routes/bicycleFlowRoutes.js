// routes/bicycleFlowRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllBicycleFlows,
  createBicycleFlow
} = require('../controllers/bicycleFlowController');

// GET /api/bicycle-flows
router.get('/', getAllBicycleFlows);

// POST /api/bicycle-flows
router.post('/', createBicycleFlow);

module.exports = router;
