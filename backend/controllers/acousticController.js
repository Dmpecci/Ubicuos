const AcousticData = require('../models/AcousticData');

const getAllData = async (req, res) => {
  try {
    const data = await AcousticData.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllData };
