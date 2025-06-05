// frontend/src/pages/Accidentes.jsx

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Accidentes.css';

// MUI
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Components propios
import BreadcrumbsNav from '../components/Breadcrumbs';
import KpiCard from '../components/KpiCard';
import TrendChart from '../components/TrendChart';
import AccidentMap from '../components/AccidentMap';
import MultiSelect from '../components/MultiSelect';
import RangeSlider from '../components/RangeSlider';
import DateRangePickerComp from '../components/DateRangePicker';
import BarChartDistricts from '../components/BarChartDistricts';
import DataTable from '../components/DataTable';

const defaultFilterState = {
  districts: [],
  types: [],
  vehicles: [],
  severity: [],
  ageRange: [0, 100],
  hourRange: [0, 23],
  dateRange: [null, null],
};

export default function Accidentes() {
  // 1. Estados para KPI
  const [kpiData, setKpiData] = useState({
    totalMonth: 0,
    pctInjured: 0,
    topDistrict: '',
    topVehicle: '',
  });

  // 2. Estado para tendencia diaria (últimos 30 días)
  const [trendData, setTrendData] = useState([]);

  // 3. Estado para filtros y opciones
  const [filters, setFilters] = useState(defaultFilterState);
  const [filterOptions, setFilterOptions] = useState({
    districts: [],
    types: [],
    vehicles: [],
    severity: [],
  });
  const [activeFiltersString, setActiveFiltersString] = useState('');

  // 4. Estado para datos del mapa
  const [mapAccidents, setMapAccidents] = useState([]);

  // 5. Estado para estadísticas por distrito
  const [districtStats, setDistrictStats] = useState([]);

  // 6. Estado para mostrar tabla detalle
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

  // Construye query params a partir de filtros
  const buildQueryParams = (f) => {
    const params = {};
    if (f.districts.length) params.districts = f.districts.join(',');
    if (f.types.length) params.types = f.types.join(',');
    if (f.vehicles.length) params.vehicles = f.vehicles.join(',');
    if (f.severity.length) params.severity = f.severity.join(',');
    if (f.ageRange) {
      params.ageFrom = f.ageRange[0];
      params.ageTo = f.ageRange[1];
    }
    if (f.hourRange) {
      params.hourFrom = f.hourRange[0];
      params.hourTo = f.hourRange[1];
    }
    if (f.dateRange[0] && f.dateRange[1]) {
      params.dateFrom = f.dateRange[0].toISOString().split('T')[0];
      params.dateTo = f.dateRange[1].toISOString().split('T')[0];
    }
    return params;
  };

  // 1. Cargar KPI del mes actual
  const fetchKpiData = useCallback(async () => {
    try {
      const now = new Date();
      const startMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        .toISOString()
        .split('T')[0];
      const endMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        .toISOString()
        .split('T')[0];

      const res = await axios.get('/api/accidents/kpi', {
        params: { dateFrom: startMonth, dateTo: endMonth },
      });
      setKpiData(res.data);
    } catch (err) {
      console.error('Error cargando KPI data', err);
    }
  }, []);

  // 2. Cargar tendencia de los últimos 30 días
  const fetchTrendData = useCallback(async () => {
    try {
      const res = await axios.get('/api/accidents/trend-30d');
      setTrendData(res.data); // [{ fecha: '2025-04-01', count: 5 }, ...]
    } catch (err) {
      console.error('Error cargando trend data', err);
    }
  }, []);

  // 3. Cargar datos para el mapa (cada vez que cambian filtros)
  const fetchMapData = useCallback(async () => {
    try {
      const params = buildQueryParams(filters);
      const res = await axios.get('/api/accidents/data', { params });
      setMapAccidents(res.data);

      // Generar descripción de filtros activos
      const parts = [];
      if (filters.districts.length)
        parts.push(`Distrito: ${filters.districts.join(', ')}`);
      if (filters.types.length) parts.push(`Tipo: ${filters.types.join(', ')}`);
      if (filters.vehicles.length)
        parts.push(`Vehículo: ${filters.vehicles.join(', ')}`);
      if (filters.severity.length)
        parts.push(`Severidad: ${filters.severity.join(', ')}`);
      if (
        filters.ageRange[0] !== defaultFilterState.ageRange[0] ||
        filters.ageRange[1] !== defaultFilterState.ageRange[1]
      )
        parts.push(`Edad: ${filters.ageRange[0]}–${filters.ageRange[1]}`);
      if (
        filters.hourRange[0] !== defaultFilterState.hourRange[0] ||
        filters.hourRange[1] !== defaultFilterState.hourRange[1]
      )
        parts.push(`Hora: ${filters.hourRange[0]}–${filters.hourRange[1]}`);
      if (filters.dateRange[0] && filters.dateRange[1])
        parts.push(
          `Fecha: ${filters.dateRange[0].toLocaleDateString()}–${filters.dateRange[1].toLocaleDateString()}`
        );
      setActiveFiltersString(parts.join(' | ') || 'Ninguno');
    } catch (err) {
      console.error('Error cargando map data', err);
    }
  }, [filters]);

  // 4. Cargar estadísticas por distrito (para BarChart)
  const fetchDistrictStats = useCallback(async () => {
    try {
      const params = buildQueryParams(filters);
      const res = await axios.get('/api/accidents/count-by-district', {
        params,
      });
      setDistrictStats(res.data); // [{ district: 'Centro', count: 48 }, ...]
    } catch (err) {
      console.error('Error cargando district stats', err);
    }
  }, [filters]);

  // 5. Cargar datos de la tabla detalle (solo cuando showTable = true)
  const fetchTableData = useCallback(async () => {
    setTableLoading(true);
    try {
      const params = buildQueryParams(filters);
      const res = await axios.get('/api/accidents/table', { params });
      setTableData(res.data);
    } catch (err) {
      console.error('Error cargando table data', err);
    } finally {
      setTableLoading(false);
    }
  }, [filters]);

  // Efecto inicial: cargar filtros, KPI y tendencia
  useEffect(() => {
    const loadInitial = async () => {
      try {
        const res = await axios.get('/api/accidents/filters');
        setFilterOptions({
          districts: res.data.distritos || [],
          types: res.data.tipos || [],
          vehicles: res.data.vehiculos || [],
          severity: res.data.lesividades || [],
        });
      } catch (err) {
        console.error('Error cargando filtros', err);
      }
      fetchKpiData();
      fetchTrendData();
    };
    loadInitial();
  }, [fetchKpiData, fetchTrendData]);

  // Efecto: cada vez que cambian filtros, recargar mapa y stats; tabla si está visible
  useEffect(() => {
    fetchMapData();
    fetchDistrictStats();
    if (showTable) fetchTableData();
  }, [filters, fetchMapData, fetchDistrictStats, showTable, fetchTableData]);

  // Handlers para actualizar filtros
  const handleDistrictsChange = (selected) => {
    setFilters((f) => ({ ...f, districts: selected }));
  };
  const handleTypesChange = (selected) => {
    setFilters((f) => ({ ...f, types: selected }));
  };
  const handleVehiclesChange = (selected) => {
    setFilters((f) => ({ ...f, vehicles: selected }));
  };
  const handleSeverityChange = (selected) => {
    setFilters((f) => ({ ...f, severity: selected }));
  };
  const handleAgeRangeChange = (newRange) => {
    setFilters((f) => ({ ...f, ageRange: newRange }));
  };
  const handleHourRangeChange = (newRange) => {
    setFilters((f) => ({ ...f, hourRange: newRange }));
  };
  const handleDateRangeChange = (start, end) => {
    setFilters((f) => ({ ...f, dateRange: [start, end] }));
  };

  const handleClearFilters = () => {
    setFilters(defaultFilterState);
  };

  return (
    <div className="accidentes-page">
      {/* 1. Breadcrumbs y título */}
      <BreadcrumbsNav paths={['Inicio', 'Mapa', 'Accidentes']} />
      <h1 className="page-title">Análisis de Accidentes</h1>

      {/* 2. KPI Cards */}
      <div className="kpi-container">
        <KpiCard title="Total este mes" value={kpiData.totalMonth} />
        <KpiCard
          title="% Accidentes con lesión"
          value={`${kpiData.pctInjured}%`}
        />
        <KpiCard title="Distrito más accidentado" value={kpiData.topDistrict} />
        <KpiCard title="Vehículo más implicado" value={kpiData.topVehicle} />
      </div>

      {/* 3. TrendChart */}
      <div className="trend-chart-container">
        <TrendChart data={trendData} xKey="fecha" yKey="count" />
      </div>

      {/* 4. Mapa + Panel de filtros */}
      <div className="map-filters-section">
        <div className="map-container">
          <AccidentMap data={mapAccidents} />
        </div>
        <div className="filters-container">
          <h2 className="filters-title">Filtros</h2>
          <p className="active-filters">
            <strong>Filtros activos:</strong> {activeFiltersString}
          </p>
          <Button
            variant="outlined"
            size="small"
            onClick={handleClearFilters}
            sx={{ marginBottom: '8px' }}
          >
            Limpiar todos
          </Button>

          {/* Accordion Distrito */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <strong>Distrito</strong>
            </AccordionSummary>
            <AccordionDetails>
              <MultiSelect
                label="Distritos"
                options={filterOptions.districts}
                selected={filters.districts}
                onChange={handleDistrictsChange}
                placeholder="Selecciona distrito..."
              />
            </AccordionDetails>
          </Accordion>

          {/* Accordion Tipo de accidente */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <strong>Tipo de accidente</strong>
            </AccordionSummary>
            <AccordionDetails>
              <MultiSelect
                label="Tipos de accidente"
                options={filterOptions.types}
                selected={filters.types}
                onChange={handleTypesChange}
                placeholder="Selecciona tipo..."
              />
            </AccordionDetails>
          </Accordion>

          {/* Accordion Vehículo */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <strong>Vehículo implicado</strong>
            </AccordionSummary>
            <AccordionDetails>
              <MultiSelect
                label="Vehículos"
                options={filterOptions.vehicles}
                selected={filters.vehicles}
                onChange={handleVehiclesChange}
                placeholder="Selecciona vehículo..."
              />
            </AccordionDetails>
          </Accordion>

          {/* Accordion Severidad */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <strong>Severidad</strong>
            </AccordionSummary>
            <AccordionDetails>
              <MultiSelect
                label="Severidad"
                options={filterOptions.severity}
                selected={filters.severity}
                onChange={handleSeverityChange}
                placeholder="Selecciona severidad..."
              />
            </AccordionDetails>
          </Accordion>

          {/* Accordion Rango Edad */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <strong>Edad (años)</strong>
            </AccordionSummary>
            <AccordionDetails>
              <RangeSlider
                min={0}
                max={100}
                step={5}
                values={filters.ageRange}
                onChange={handleAgeRangeChange}
                unit="años"
              />
            </AccordionDetails>
          </Accordion>

          {/* Accordion Rango Horario */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <strong>Hora del día</strong>
            </AccordionSummary>
            <AccordionDetails>
              <RangeSlider
                min={0}
                max={23}
                step={1}
                values={filters.hourRange}
                onChange={handleHourRangeChange}
                unit="h"
              />
            </AccordionDetails>
          </Accordion>

          {/* Accordion Rango Fecha */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <strong>Fecha</strong>
            </AccordionSummary>
            <AccordionDetails>
              <DateRangePickerComp
                startDate={filters.dateRange[0]}
                endDate={filters.dateRange[1]}
                onChange={handleDateRangeChange}
              />
            </AccordionDetails>
          </Accordion>

          {/* Botones de aplicar / limpiar */}
          <div className="filter-buttons">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                // Al hacer clic en “Aplicar filtros” refrescamos los datos (los hooks se disparan por cambio de `filters`)
                // Aquí no hay nada adicional porque fetchMapData se llama en el useEffect que atiende a `filters`.
              }}
              sx={{ marginRight: '8px' }}
            >
              Aplicar filtros
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClearFilters}>
              Limpiar filtros
            </Button>
          </div>
        </div>
      </div>

      {/* 5. Gráfica secundaria: Accidentes por distrito */}
      <div className="district-bar-chart">
        <h2>Accidentes por distrito</h2>
        <BarChartDistricts data={districtStats} />
      </div>

      {/* 6. Tabla detalle (opcional) */}
      <div className="details-section">
        <Button
          variant="text"
          onClick={() => {
            setShowTable((prev) => !prev);
          }}
          sx={{ marginTop: '16px', marginBottom: '8px' }}
        >
          {showTable ? 'Ocultar lista de accidentes' : 'Ver lista de accidentes'}
        </Button>
        {showTable && (
          <div>
            {tableLoading ? (
              <p>Cargando lista…</p>
            ) : (
              <DataTable
                columns={[
                  { field: 'fecha', headerName: 'Fecha', width: 110 },
                  { field: 'hora', headerName: 'Hora', width: 90 },
                  { field: 'distrito', headerName: 'Distrito', width: 130 },
                  { field: 'tipo_accident', headerName: 'Tipo', width: 160 },
                  { field: 'vehiculo', headerName: 'Vehículo', width: 130 },
                  { field: 'severidad', headerName: 'Severidad', width: 120 },
                ]}
                data={tableData}
                pageSize={20}
                autoHeight={true}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
