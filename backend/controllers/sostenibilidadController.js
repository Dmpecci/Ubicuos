const ScooterAssignment = require('../models/ScooterAssignment');
const BicycleFlow = require('../models/BicycleFlow');
const Photovoltaic = require('../models/Photovoltaic');
const RegulatedParkingStreet = require('../models/RegulatedParkingStreet');

const getSustainabilityIndex = async (req, res) => {
  try {
    // 1. Patinetes
    const scooterAgg = await ScooterAssignment.aggregate([
      {
        $group: {
          _id: {
            $toUpper: { $trim: { input: "$DISTRITO" } }
          },
          value: { $sum: "$TOTAL" }
        }
      }
    ]);

    // 2. Bicicletas
    const bicycleAgg = await BicycleFlow.aggregate([
      {
        $match: {
          FECHA: { $regex: /\/2051\b/ }
        }
      },
      {
        $group: {
          _id: {
            $toUpper: { $trim: { input: "$DISTRITO" } }
          },
          value: { $sum: "$BICICLETAS" }
        }
      }
    ]);

    // 3. Instalaciones solares
    const solarAgg = await Photovoltaic.aggregate([
      {
        $group: {
          _id: {
            $toUpper: { $trim: { input: "$Distrito" } }
          },
          value: { $sum: 1 }
        }
      }
    ]);

    // 4. Plazas SER (reconstrucción del nombre completo)
    const serAgg = await RegulatedParkingStreet.aggregate([
      {
        $project: {
          distrito: {
            $toUpper: {
              $trim: {
                input: {
                  $reduce: {
                    input: {
                      $slice: [
                        {
                          $filter: {
                            input: { $split: ["$distrito", " "] },
                            cond: { $ne: ["$$this", ""] }
                          }
                        },
                        1,
                        5
                      ]
                    },
                    initialValue: "",
                    in: { $concat: ["$$value", " ", "$$this"] }
                  }
                }
              }
            }
          },
          plazas: { $toInt: "$num_plazas" }
        }
      },
      {
        $group: {
          _id: "$distrito",
          value: { $sum: "$plazas" }
        }
      }
    ]);

    // Convertir a objetos clave-valor
    const scooters = {};
    scooterAgg.forEach(({ _id, value }) => {
      if (_id) scooters[_id] = value || 0;
    });

    const bicycles = {};
    bicycleAgg.forEach(({ _id, value }) => {
      if (_id) bicycles[_id] = value || 0;
    });

    const solars = {};
    solarAgg.forEach(({ _id, value }) => {
      if (_id) solars[_id] = value || 0;
    });

    const ser = {};
    serAgg.forEach(({ _id, value }) => {
      if (_id) ser[_id] = value || 0;
    });

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

    // Debug final
    console.log("⚙️ Valores brutos:");
    console.log("SCOOTERS:", scooters);
    console.log("BICICLETAS:", bicycles);
    console.log("SOLARES:", solars);
    console.log("SER:", ser);

    res.json(results);
  } catch (err) {
    console.error('Error calculating sustainability index:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getSustainabilityIndex };
