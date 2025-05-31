// controllers/lostObjectController.js
const LostObject = require('../models/LostObject');

// GET: Listar todos los objetos perdidos
const getAllLostObjects = async (req, res) => {
  try {
    const lostObjects = await LostObject.find();
    res.status(200).json(lostObjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: Crear un nuevo registro de objeto perdido
const createLostObject = async (req, res) => {
  try {
    // req.body debe contener campos con los nombres que definimos en el modelo
    const newLostObj = new LostObject(req.body);
    const savedLostObj = await newLostObj.save();
    res.status(201).json(savedLostObj);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllLostObjects,
  createLostObject
};
