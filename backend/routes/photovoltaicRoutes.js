const express = require('express');
const router = express.Router();
const { getAllPhotovoltaic } = require('../controllers/photovoltaicController');

router.get('/', getAllPhotovoltaic);

module.exports = router;
