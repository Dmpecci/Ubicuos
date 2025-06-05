const express = require('express');
const router = express.Router();
const {
  getAccidentsData,
  getAccidentFilters,
  getAccidentsKPI,
  getTrendLast30d,
  getCountByDistrict,
  getAccidentsTable,
} = require('../controllers/accidentDataController');

router.get('/data', getAccidentsData);
router.get('/filters', getAccidentFilters);
router.get('/kpi', getAccidentsKPI);
router.get('/trend-30d', getTrendLast30d);
router.get('/count-by-district', getCountByDistrict);
router.get('/table', getAccidentsTable);

module.exports = router;
