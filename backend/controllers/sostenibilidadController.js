const ScooterAssignment = require('../models/ScooterAssignment');
const BicycleFlow = require('../models/BicycleFlow');
const Photovoltaic = require('../models/Photovoltaic');
const RegulatedParkingStreet = require('../models/RegulatedParkingStreet');

// Helper to clean district names
function cleanDistrict(name = '') {
  // Trim and remove numeric prefixes like "01  CENTRO"
  if (typeof name !== 'string') return '';
  let cleaned = name.trim();
  cleaned = cleaned.replace(/^\d+\s+/, '');
  // Normalize spaces and uppercase
  cleaned = cleaned.toUpperCase();
  return cleaned;
}

const getSustainabilityIndex = async (req, res) => {
  try {
    // 1. Aggregate values per district for each collection
    const scooterAgg = await ScooterAssignment.aggregate([
      { $group: { _id: '$distrito', value: { $sum: '$TOTAL' } } }
    ]);

    const bicycleAgg = await BicycleFlow.aggregate([
      { $group: { _id: '$distrito', value: { $sum: '$bicicletas' } } }
    ]);

    const solarAgg = await Photovoltaic.aggregate([
      { $group: { _id: '$distrito', value: { $sum: 1 } } }
    ]);

    const serAgg = await RegulatedParkingStreet.aggregate([
      { $group: { _id: '$distrito', value: { $sum: '$numPlazas' } } }
    ]);

    // Convert aggregated arrays into maps with cleaned district names
    const scooters = {};
    scooterAgg.forEach(({ _id, value }) => {
      const d = cleanDistrict(_id);
      scooters[d] = (scooters[d] || 0) + (value || 0);
    });

    const bicycles = {};
    bicycleAgg.forEach(({ _id, value }) => {
      const d = cleanDistrict(_id);
      bicycles[d] = (bicycles[d] || 0) + (value || 0);
    });

    const solars = {};
    solarAgg.forEach(({ _id, value }) => {
      const d = cleanDistrict(_id);
      solars[d] = (solars[d] || 0) + (value || 0);
    });

    const ser = {};
    serAgg.forEach(({ _id, value }) => {
      const namePart = typeof _id === 'string' ? _id.split('  ')[1] || _id : '';
      const d = cleanDistrict(namePart);
      ser[d] = (ser[d] || 0) + (value || 0);
    });

    // Union of all districts
    const districtSet = new Set([
      ...Object.keys(scooters),
      ...Object.keys(bicycles),
      ...Object.keys(solars),
      ...Object.keys(ser)
    ]);

    const maxScooters = Math.max(0, ...Object.values(scooters));
    const maxBicycles = Math.max(0, ...Object.values(bicycles));
    const maxSolars = Math.max(0, ...Object.values(solars));
    const maxSer = Math.max(0, ...Object.values(ser));

    const results = [];
    districtSet.forEach(d => {
      const patinetes = scooters[d] || 0;
      const bicicletas = bicycles[d] || 0;
      const solares = solars[d] || 0;
      const plazas = ser[d] || 0;

      const pNorm = maxScooters ? (patinetes / maxScooters) * 100 : 0;
      const bNorm = maxBicycles ? (bicicletas / maxBicycles) * 100 : 0;
      const sNorm = maxSolars ? (solares / maxSolars) * 100 : 0;
      const serNorm = maxSer ? (plazas / maxSer) * 100 : 0;

      const indice = parseFloat(((pNorm + bNorm + sNorm + serNorm) / 4).toFixed(2));
      results.push({
        distrito: d,
        patinetes,
        bicicletas,
        solares,
        ser: plazas,
        indice
      });
    });

    results.sort((a, b) => b.indice - a.indice);

    res.json(results);
  } catch (err) {
    console.error('Error calculating sustainability index:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getSustainabilityIndex };
