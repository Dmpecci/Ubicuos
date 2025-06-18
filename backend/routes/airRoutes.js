const express = require('express');
const router = express.Router();
const { getDailyNO2 } = require('../controllers/airController');

// Ruta para obtener lecturas diarias de NO₂
router.get('/api/aire/:puntoMuestreo', getDailyNO2);

module.exports = router;
