const express = require('express');
const router = express.Router();
const Accident = require('../models/Accident');

// GET /api/accidents
router.get('/', async (req, res) => {
  try {
    const { distrito, tipo, horaMin, horaMax, fechaMin, fechaMax, sexo, lesividad, edad, vehiculo } = req.query;

    const query = {};

    if (distrito) query.distrito = { $in: distrito.split(',') };
    if (tipo) query.tipo_accidente = { $in: tipo.split(',') };
    if (sexo) query.sexo = { $in: sexo.split(',') };
    if (lesividad) query.lesividad = { $in: lesividad.split(',') };
    if (edad) query.rango_edad = { $in: edad.split(',') };
    if (vehiculo) query.tipo_vehiculo = { $in: vehiculo.split(',') };

    if (horaMin && horaMax) {
      query.hora = { $gte: `${horaMin}:00:00`, $lte: `${horaMax}:59:59` };
    }

    if (fechaMin && fechaMax) {
      query.fecha = { $gte: fechaMin, $lte: fechaMax };
    }

    const resultados = await Accident.find(query).limit(1000);
    res.json(resultados);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

// GET /api/accidents/filtros
router.get('/filtros', async (req, res) => {
  try {
    const distritos = await Accident.distinct('distrito');
    const tipos = await Accident.distinct('tipo_accidente');
    const sexos = await Accident.distinct('sexo');
    const lesividades = await Accident.distinct('lesividad');
    const edades = await Accident.distinct('rango_edad');
    const vehiculos = await Accident.distinct('tipo_vehiculo');

    res.json({ distritos, tipos, sexos, lesividades, edades, vehiculos });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener filtros únicos');
  }
});

module.exports = router;
