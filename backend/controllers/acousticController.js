// acousticController.js
const AcousticData = require('../models/AcousticData');

const getAllData = async (req, res) => {
  try {
    const data = await AcousticData.find();
    // Enviar un status 200 por claridad, aunque json() por defecto ya lo hace
    res.status(200).json(data);
  } catch (err) {
    // Respondemos con un status 500 si hay error
    res.status(500).json({
      message: err.message || 'Error al obtener datos acústicos',
    });
  }
};

module.exports = { getAllData };
