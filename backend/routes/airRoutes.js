const express = require('express');
const router = express.Router();
const { getDailyNO2, getEstaciones } = require('../controllers/airController');

router.get('/api/aire/estaciones', getEstaciones);
router.get('/api/aire/:puntoMuestreo', getDailyNO2);

module.exports = router;

