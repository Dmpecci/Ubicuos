const mongoose = require('mongoose');

// Esquema sin tipado estricto para aceptar campos H01-H24 variables
const AirDataSchema = new mongoose.Schema({}, { strict: false, collection: 'aire' });

module.exports = mongoose.model('AirData', AirDataSchema);
