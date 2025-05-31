// routes/containerLocationRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllContainerLocations,
  createContainerLocation
} = require('../controllers/containerLocationController');

// GET /api/containers
router.get('/', getAllContainerLocations);

// POST /api/containers
router.post('/', createContainerLocation);

module.exports = router;
