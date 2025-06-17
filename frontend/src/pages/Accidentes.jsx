import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapaAccidentes from '../components/MapaAccidentes';
import FiltrosAccidentes from '../components/FiltrosAccidentes';
import KpiAccidentes from '../components/KpiAccidentes';

export default function Accidentes() {
  const [distritos, setDistritos] = useState([]);
  const [filters, setFilters] = useState({ distrito: '', dateFrom: '', dateTo: '' });
  const [accidents, setAccidents] = useState([]);
  const [kpi, setKpi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/accidents/filters')
      .then(res => setDistritos(res.data.distritos || []))
      .catch(err => console.error('Error al cargar filtros:', err));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (filters.distrito) params.distrito = filters.distrito;
        if (filters.dateFrom) params.dateFrom = filters.dateFrom;
        if (filters.dateTo) params.dateTo = filters.dateTo;
        const [dataRes, kpiRes] = await Promise.all([
          axios.get('http://localhost:5000/api/accidents/data', { params }),
          axios.get('http://localhost:5000/api/accidents/kpi', { params })
        ]);
        setAccidents(dataRes.data || []);
        setKpi(kpiRes.data);
      } catch (err) {
        console.error('Error al cargar accidentes:', err);
        setError('Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  const applyFilters = (f) => setFilters(f);
  const resetFilters = () => setFilters({ distrito: '', dateFrom: '', dateTo: '' });

  return (
    <div style={{ padding: '20px' }}>
      <h2>Accidentes</h2>
      <FiltrosAccidentes
        distritos={distritos}
        initialFilters={filters}
        onApply={applyFilters}
        onReset={resetFilters}
      />
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MapaAccidentes accidents={accidents} />
      <KpiAccidentes kpi={kpi} />
    </div>
  );
}
