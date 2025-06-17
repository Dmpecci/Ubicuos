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

    const filter = {};
    if (distrito) filter.distrito = distrito;
    if (dateFrom || dateTo) {
      filter.fecha = {};
      if (dateFrom) filter.fecha.$gte = new Date(dateFrom);
      if (dateTo) filter.fecha.$lte = new Date(dateTo);
    }

    let lim = parseInt(limit, 10);
    if (isNaN(lim) || lim <= 0) lim = 100;
    if (lim > 500) lim = 500;
    const skip = parseInt(offset, 10) || 0;

    const totalCount = await Accident.countDocuments(filter);

    const accidents = await Accident.find(filter, {
      fecha: 1,
      distrito: 1,
      tipo_accidente: 1,
      lesividad: 1,
      lat: 1,
      lng: 1,
      coordenada_x_utm: 1,
      coordenada_y_utm: 1,
      _id: 0
    })
      .skip(skip)
      .limit(lim)
      .lean();

    const data = accidents.map(acc => {
      let { lat, lng } = acc;
      if ((!lat || !lng) && acc.coordenada_x_utm && acc.coordenada_y_utm) {
        const coords = convertUTMToLatLng(
          acc.coordenada_x_utm,
          acc.coordenada_y_utm
        );
        lat = coords.lat;
        lng = coords.lng;
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
    const filter = {};
    if (distrito) filter.distrito = distrito;
    if (dateFrom || dateTo) {
      filter.fecha = {};
      if (dateFrom) filter.fecha.$gte = new Date(dateFrom);
      if (dateTo) filter.fecha.$lte = new Date(dateTo);
    }

    const total = await Accident.countDocuments(filter);

    const districtAgg = await Accident.aggregate([
      { $match: filter },
      { $group: { _id: '$distrito', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);
    const topDistrict = districtAgg[0] ? districtAgg[0]._id : null;

    const typeAgg = await Accident.aggregate([
      { $match: filter },
      { $group: { _id: '$tipo_accidente', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);
    const topType = typeAgg[0] ? typeAgg[0]._id : null;

    res.json({ total, topDistrict, topType });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAccidentsData,
  getAccidentFilters,
  getAccidentsKPI
};
