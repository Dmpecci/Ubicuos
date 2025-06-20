const ScooterAssignment = require('../models/ScooterAssignment');
const BicycleFlow = require('../models/BicycleFlow');
const Photovoltaic = require('../models/Photovoltaic');
const RegulatedParkingStreet = require('../models/RegulatedParkingStreet');

// Helper para limpiar nombres de distrito
function cleanDistrict(name = '') {
  if (typeof name !== 'string') return '';
  let cleaned = name.trim();
  cleaned = cleaned.replace(/^\d+\s+/, ''); // elimina número delante si lo hay
  cleaned = cleaned.toUpperCase();
  return cleaned;
}

const getSustainabilityIndex = async (req, res) => {
  try {
    // 1. Patinetes
    const scooterAgg = await ScooterAssignment.aggregate([
      { $group: { _id: '$DISTRITO', value: { $sum: '$TOTAL' } } }
    ]);

    // 2. Bicicletas
    const bicycleAgg = await BicycleFlow.aggregate([
      // Descomenta esto si quieres limitar por fecha específica
      // { $match: { FECHA: { $regex: /^01\/01\/2051/ } } },
      { $group: { _id: '$DISTRITO', value: { $sum: '$BICICLETAS' } } }
    ]);

    // 3. Instalaciones solares
    const solarAgg = await Photovoltaic.aggregate([
      { $group: { _id: '$Distrito', value: { $sum: 1 } } }
    ]);

    // 4. Plazas SER (limpiando correctamente el nombre de distrito)
    const serAgg = await RegulatedParkingStreet.aggregate([
      {
        $project: {
          distrito: {
            $trim: {
              input: {
                $arrayElemAt: [ { $split: [ "$distrito", "  " ] }, 1 ]
              }
            }
          },
          num_plazas: "$num_plazas"
        }
      },
      {
        $group: {
          _id: "$distrito",
          value: { $sum: "$num_plazas" }
        }
      }
    ]);

    // Convertir los resultados a objetos clave-valor por distrito
    const scooters = {};
    scooterAgg.forEach(({ _id, value }) => {
      const d = cleanDistrict(_id);
      if (!d) return;
      scooters[d] = value || 0;
    });

    const bicycles = {};
    bicycleAgg.forEach(({ _id, value }) => {
      const d = cleanDistrict(_id);
      if (!d) return;
      bicycles[d] = value || 0;
    });

    const solars = {};
    solarAgg.forEach(({ _id, value }) => {
      const d = cleanDistrict(_id);
      if (!d) return;
      solars[d] = value || 0;
    });

    const ser = {};
    serAgg.forEach(({ _id, value }) => {
      const d = cleanDistrict(_id);
      if (!d) return;
      ser[d] = value || 0;
    });

    // Unir todos los distritos
    const districtSet = new Set([
      ...Object.keys(scooters),
      ...Object.keys(bicycles),
      ...Object.keys(solars),
      ...Object.keys(ser)
    ]);

    // Calcular máximos
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

      // Normalizar a escala 0–100
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
