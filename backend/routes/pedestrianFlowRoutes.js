// routes/pedestrianFlowRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllPedestrianFlows,
  createPedestrianFlow
} = require('../controllers/pedestrianFlowController');

// GET /api/pedestrian-flows
router.get('/', getAllPedestrianFlows);

// POST /api/pedestrian-flows
router.post('/', createPedestrianFlow);

module.exports = router;
