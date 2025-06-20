const express = require('express');
const router = express.Router();
const { getSustainabilityIndex } = require('../controllers/sostenibilidadController');

router.get('/', getSustainabilityIndex);

module.exports = router;
