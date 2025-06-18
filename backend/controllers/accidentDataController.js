const Accident = require('../models/Accident');
const UTM = require('utm-latlng');
const utm = new UTM();

// Helper to convert UTM coordinates to latitude/longitude
function convertUTMToLatLng(x, y) {
  if (x == null || y == null) return {};
  const easting = parseFloat(String(x).replace(',', '.'));
  const northing = parseFloat(String(y).replace(',', '.'));
  if (isNaN(easting) || isNaN(northing)) return {};
  return utm.convertUtmToLatLng(easting, northing, 30, 'N');
}

// GET /api/accidents/data
const getAccidentsData = async (req, res) => {
  try {
    const {
      distrito,
      dateFrom,
      dateTo,
      limit = 100,
      offset = 0
    } = req.query;

    // Validar y limitar
    let lim = parseInt(limit, 10);
    if (isNaN(lim) || lim <= 0) lim = 100;
    if (lim > 500) lim = 500;
    const skip = parseInt(offset, 10) || 0;

    const pipeline = [];

    // Filtro por distrito
    if (distrito) {
      pipeline.push({ $match: { distrito } });
    }

    // Convertir string fecha → fechaISO
    pipeline.push({
      $addFields: {
        fechaISO: {
          $dateFromString: {
            dateString: "$fecha",
            format: "%d/%m/%Y",
            onError: null,
            onNull: null
          }
        }
      }
    });

    // Asegurarse de que sea válida
    pipeline.push({ $match: { fechaISO: { $ne: null } } });

    // Filtro por rango de fecha
    const matchFecha = {};
    if (dateFrom) matchFecha.$gte = new Date(dateFrom);
    if (dateTo) {
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999);
      matchFecha.$lte = toDate;
    }
    if (dateFrom || dateTo) {
      pipeline.push({ $match: { fechaISO: matchFecha } });
    }

    // Copia del pipeline antes de paginar, para contar
    const countPipeline = [...pipeline, { $count: 'count' }];
    const countResult = await Accident.aggregate(countPipeline);
    const totalCount = countResult[0]?.count || 0;

    // Añadir paginación y proyección
    pipeline.push(
      { $sort: { fechaISO: 1 } },
      { $skip: skip },
      { $limit: lim },
      {
        $project: {
          fecha: 1,
          distrito: 1,
          tipo_accidente: 1,
          lesividad: 1,
          lat: 1,
          lng: 1,
          coordenada_x_utm: 1,
          coordenada_y_utm: 1
        }
      }
    );

    const raw = await Accident.aggregate(pipeline);

    // Convertir UTM si es necesario
    const data = raw.map(acc => {
      let { lat, lng } = acc;
      if ((!lat || !lng) && acc.coordenada_x_utm && acc.coordenada_y_utm) {
        const coords = convertUTMToLatLng(acc.coordenada_x_utm, acc.coordenada_y_utm);
        lat = typeof coords.lat === 'number' ? coords.lat : null;
        lng = typeof coords.lng === 'number' ? coords.lng : null;
      }
      return {
        fecha: acc.fecha,
        distrito: acc.distrito,
        tipo_accidente: acc.tipo_accidente,
        lesividad: acc.lesividad,
        lat,
        lng
      };
    });

    res.json({ data, totalCount });
  } catch (err) {
    console.error('Error en getAccidentsData:', err);
    res.status(500).json({ message: err.message });
  }
};



// GET /api/accidents/filters
const getAccidentFilters = async (req, res) => {
  try {
    const distritos = await Accident.distinct('distrito');
    res.json({ distritos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/accidents/kpi
const getAccidentsKPI = async (req, res) => {
  try {
    const { distrito, dateFrom, dateTo } = req.query;

    const pipeline = [];

    if (distrito) {
      pipeline.push({ $match: { distrito } });
    }

    pipeline.push({
      $addFields: {
        fechaISO: {
          $dateFromString: {
            dateString: "$fecha",
            format: "%d/%m/%Y",
            onError: null,
            onNull: null
          }
        }
      }
    });

    pipeline.push({ $match: { fechaISO: { $ne: null } } });

    const matchFecha = {};
    if (dateFrom) matchFecha.$gte = new Date(dateFrom);
    if (dateTo) {
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999);
      matchFecha.$lte = toDate;
    }

    if (dateFrom || dateTo) {
      pipeline.push({ $match: { fechaISO: matchFecha } });
    }

    // Total
    pipeline.push({
      $facet: {
        total: [{ $count: 'value' }],
        topDistrict: [
          { $group: { _id: '$distrito', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 1 }
        ],
        topType: [
          { $group: { _id: '$tipo_accidente', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 1 }
        ]
      }
    });

    const [result] = await Accident.aggregate(pipeline);
    const total = result.total[0]?.value || 0;
    const topDistrict = result.topDistrict[0]?._id || '-';
    const topType = result.topType[0]?._id || '-';

    res.json({ total, topDistrict, topType });

  } catch (err) {
    console.error('Error en getAccidentsKPI:', err);
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  getAccidentsData,
  getAccidentFilters,
  getAccidentsKPI
};
