const BicycleFlow = require('../models/BicycleFlow');
const ScooterAssignment = require('../models/ScooterAssignment');
const Photovoltaic = require('../models/Photovoltaic');
const RegulatedParkingStreet = require('../models/RegulatedParkingStreet');
const Accident = require('../models/Accident');
const AirData = require('../models/AirData');

// GET /api/dashboard/summary
const getDashboardSummary = async (req, res) => {
  try {
    // Consultas principales
    const [
      bicycles,
      scooterAgg,
      solar,
      parkingAgg,
      accidents
    ] = await Promise.all([
      BicycleFlow.countDocuments(),
      ScooterAssignment.aggregate([{ $group: { _id: null, total: { $sum: '$TOTAL' } } }]),
      Photovoltaic.countDocuments(),
      RegulatedParkingStreet.aggregate([{ $group: { _id: null, total: { $sum: '$numPlazas' } } }]),
      Accident.countDocuments()
    ]);

    const scooters = scooterAgg[0]?.total || 0;
    const serSpaces = parkingAgg[0]?.total || 0;

    // Calidad de aire promedio (NO2)
    const airDocs = await AirData.aggregate([
      { $match: { MAGNITUD: 1 } },
      { $sort: { ANO: -1, MES: -1, DIA: -1 } },
      { $group: { _id: '$PUNTO_MUESTREO', doc: { $first: '$$ROOT' } } }
    ]);

    let airSum = 0;
    let airCount = 0;
    airDocs.forEach(({ doc }) => {
      for (let i = 1; i <= 24; i++) {
        const hour = String(i).padStart(2, '0');
        const value = doc[`H${hour}`];
        const valid = doc[`V${hour}`];
        if (valid === 'V' && value !== undefined && value !== null) {
          const val = parseFloat(String(value).replace(',', '.'));
          if (!isNaN(val)) {
            airSum += val;
            airCount++;
          }
        }
      }
    });

    const airQuality = airCount > 0 ? parseFloat((airSum / airCount).toFixed(1)) : 0;

    res.json({
      bicycles,
      scooters,
      solar,
      serSpaces,
      accidents,
      airQuality
    });
  } catch (err) {
    console.error('Error in getDashboardSummary:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getDashboardSummary };
