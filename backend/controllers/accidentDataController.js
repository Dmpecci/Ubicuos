// backend/controllers/accidentDataController.js
const Accident = require('../models/Accident');

/**
 * Transforma los parámetros de query en un filtro MongoDB.
 * Soporta listas CSV y rangos numéricos/fechas/horas.
 */
function buildQueryFromParams(q) {
  const query = {};
  const list = (v) => v.split(',').map((s) => s.trim()).filter(Boolean);

  if (q.distrito) query.distrito = { $in: list(q.distrito) };
  if (q.tipo) query.tipo_accidente = { $in: list(q.tipo) };
  if (q.sexo) query.sexo = { $in: list(q.sexo) };
  if (q.lesividad) query.lesividad = { $in: list(q.lesividad) };
  if (q.vehiculo) query.tipo_vehiculo = { $in: list(q.vehiculo) };

  if (q.dateFrom || q.dateTo) {
    let from = q.dateFrom ? new Date(q.dateFrom) : new Date('1900-01-01');
    let to = q.dateTo ? new Date(q.dateTo) : new Date('2100-12-31');
    if (from > to) [from, to] = [to, from];
    query.fecha = { $gte: from, $lte: to };
  }

  const expr = [];

  if (q.hourFrom || q.hourTo) {
    let hFrom = parseInt(q.hourFrom, 10);
    let hTo = parseInt(q.hourTo, 10);
    hFrom = Number.isNaN(hFrom) ? 0 : hFrom;
    hTo = Number.isNaN(hTo) ? 23 : hTo;
    if (hFrom > hTo) [hFrom, hTo] = [hTo, hFrom];
    const hourExpr = {
      $toInt: { $arrayElemAt: [{ $split: ['$hora', ':'] }, 0] },
    };
    expr.push({ $gte: [hourExpr, hFrom] });
    expr.push({ $lte: [hourExpr, hTo] });
  }

  if (q.ageFrom || q.ageTo) {
    let aFrom = parseInt(q.ageFrom, 10);
    let aTo = parseInt(q.ageTo, 10);
    aFrom = Number.isNaN(aFrom) ? 0 : aFrom;
    aTo = Number.isNaN(aTo) ? 100 : aTo;
    if (aFrom > aTo) [aFrom, aTo] = [aTo, aFrom];
    const minExpr = { $toInt: { $arrayElemAt: [{ $split: ['$rango_edad', '-'] }, 0] } };
    const maxExpr = { $toInt: { $arrayElemAt: [{ $split: ['$rango_edad', '-'] }, 1] } };
    expr.push({ $lte: [minExpr, aTo] });
    expr.push({ $gte: [maxExpr, aFrom] });
  }

  if (expr.length) {
    query.$expr = { $and: expr };
  }

  return query;
}

// GET /api/accidents/data
async function getAccidentsData(req, res) {
  try {
    const query = buildQueryFromParams(req.query);
    const accidents = await Accident.find(query)
      .select('lat lng fecha hora distrito tipo_accidente sexo lesividad rango_edad tipo_vehiculo')
      .lean();
    res.json(accidents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

// GET /api/accidents/filters
async function getAccidentFilters(_req, res) {
  try {
    const distritos = await Accident.distinct('distrito');
    const tipos = await Accident.distinct('tipo_accidente');
    const sexos = await Accident.distinct('sexo');
    const lesividades = await Accident.distinct('lesividad');
    const edades = await Accident.distinct('rango_edad');
    const vehiculos = await Accident.distinct('tipo_vehiculo');
    res.json({ distritos, tipos, sexos, lesividades, edades, vehiculos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

// GET /api/accidents/kpi
async function getAccidentsKPI(req, res) {
  try {
    const query = buildQueryFromParams(req.query);
    const totalMonth = await Accident.countDocuments(query);
    const injured = await Accident.countDocuments({
      ...query,
      lesividad: { $ne: 'Sin heridos' },
    });
    const pctInjured = totalMonth ? ((injured / totalMonth) * 100).toFixed(2) : 0;

    const topDistrictAgg = await Accident.aggregate([
      { $match: query },
      { $group: { _id: '$distrito', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);
    const topDistrict = topDistrictAgg[0]?.['_id'] || '';

    const topVehicleAgg = await Accident.aggregate([
      { $match: query },
      { $group: { _id: '$tipo_vehiculo', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);
    const topVehicle = topVehicleAgg[0]?._id || '';

    res.json({
      totalMonth,
      pctInjured: parseFloat(pctInjured),
      topDistrict,
      topVehicle,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

// GET /api/accidents/trend-30d
async function getTrendLast30d(_req, res) {
  try {
    const since = new Date();
    since.setDate(since.getDate() - 29);

    const trend = await Accident.aggregate([
      { $match: { fecha: { $gte: since } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$fecha' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const data = trend.map((t) => ({ fecha: t._id, count: t.count }));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

// GET /api/accidents/count-by-district
async function getCountByDistrict(req, res) {
  try {
    const query = buildQueryFromParams(req.query);
    const counts = await Accident.aggregate([
      { $match: query },
      { $group: { _id: '$distrito', count: { $sum: 1 } } },
      { $project: { _id: 0, district: '$_id', count: 1 } },
      { $sort: { count: -1 } },
    ]);
    res.json(counts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

// GET /api/accidents/table
async function getAccidentsTable(req, res) {
  try {
    const query = buildQueryFromParams(req.query);
    let limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit) || limit <= 0) limit = 100;
    if (limit > 500) limit = 500;
    const rows = await Accident.find(query)
      .select('fecha hora distrito tipo_accidente tipo_vehiculo lesividad')
      .limit(limit)
      .lean();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  buildQueryFromParams,
  getAccidentsData,
  getAccidentFilters,
  getAccidentsKPI,
  getTrendLast30d,
  getCountByDistrict,
  getAccidentsTable,
};
