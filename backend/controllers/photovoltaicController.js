// controllers/photovoltaicController.js
const Photovoltaic = require('../models/Photovoltaic');

const getAllPhotovoltaic = async (req, res) => {
  try {
    const data = await Photovoltaic.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllPhotovoltaic };
