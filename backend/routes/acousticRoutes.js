const express = require('express');
const router = express.Router();
const { getAllData } = require('../controllers/acousticController');

router.get('/', getAllData);

module.exports = router;
