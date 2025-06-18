const mongoose = require('mongoose');

const AirDataSchema = new mongoose.Schema({}, { strict: false, collection: 'aire' });

module.exports = mongoose.model('AirData', AirDataSchema);
