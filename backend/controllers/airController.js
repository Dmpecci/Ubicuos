const AirData = require('../models/AirData');

// GET /api/air?magnitud=10&estacion=8
const getAllAirData = async (req, res) => {
  try {
    const magnitud = Number(req.query.magnitud || 10);
    const estacion = Number(req.query.estacion || 8);

    const registros = await AirData.find({ MAGNITUD: magnitud, ESTACION: estacion });

    const resultados = [];

    for (const doc of registros) {
      const fecha = `${doc.ANO}-${String(doc.MES).padStart(2, '0')}-${String(doc.DIA).padStart(2, '0')}`;

      for (let i = 1; i <= 24; i++) {
        const hora = String(i).padStart(2, '0');
        const valor = doc[`H${hora}`];
        const validacion = doc[`V${hora}`];

        if (valor !== undefined && validacion === 'V') {
          resultados.push({
            timestamp: `${fecha}T${hora}:00:00`,
            value: valor
          });
        }
      }
    }

    res.status(200).json(resultados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getDailyNO2 = async (req, res) => {
  try {
    const { puntoMuestreo } = req.params;

    const doc = await AirData.findOne({ MAGNITUD: 1, PUNTO_MUESTREO: puntoMuestreo })
      .sort({ ANO: -1, MES: -1, DIA: -1 });

    if (!doc) {
      return res.status(404).json({ message: 'Data not found' });
    }

    const resultados = [];

    for (let i = 1; i <= 24; i++) {
      const hora = String(i).padStart(2, '0');
      const valor = doc[`H${hora}`];
      const validacion = doc[`V${hora}`];

      if (validacion === 'V' && valor !== undefined && valor !== null) {
        resultados.push({ hora: i, valor });
      }
    }

    res.status(200).json(resultados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllAirData, getDailyNO2 };
