// routes/lostObjectRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllLostObjects,
  createLostObject
} = require('../controllers/lostObjectController');

// GET /api/lost-objects
router.get('/', getAllLostObjects);

// POST /api/lost-objects
router.post('/', createLostObject);

module.exports = router;
