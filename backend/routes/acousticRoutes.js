// acousticRoutes.js
const express = require('express');
const router = express.Router();
const { getAllData } = require('../controllers/acousticController');

// Ruta para obtener todos los datos de contaminación acústica
router.get('/', getAllData);

module.exports = router;
