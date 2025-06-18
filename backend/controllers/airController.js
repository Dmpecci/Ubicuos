const AirData = require('../models/AirData');

// Obtiene lecturas horarias de NO₂ para un punto de muestreo en el último día disponible
const getDailyNO2 = async (req, res) => {
  try {
    const puntoMuestreo = req.params.puntoMuestreo;

    // Documento más reciente con MAGNITUD 1 para ese punto de muestreo
    const doc = await AirData.findOne({ MAGNITUD: 1, PUNTO_MUESTREO: puntoMuestreo })
      .sort({ ANO: -1, MES: -1, DIA: -1 });

    if (!doc) {
      return res.status(404).json({ message: 'Datos no encontrados' });
    }

    const resultados = [];
    for (let i = 1; i <= 24; i++) {
      const horaKey = `H${String(i).padStart(2, '0')}`;
      const valKey = `V${String(i).padStart(2, '0')}`;
      if (doc[valKey] === 'V' && doc[horaKey] != null) {
        resultados.push({ hora: i, valor: doc[horaKey] });
      }
    }

    res.status(200).json(resultados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getDailyNO2 };
