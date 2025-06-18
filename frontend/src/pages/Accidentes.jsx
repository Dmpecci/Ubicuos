import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapaAccidentes from '../components/MapaAccidentes';
import FiltrosAccidentes from '../components/FiltrosAccidentes';
import KpiAccidentes from '../components/KpiAccidentes';

export default function Accidentes() {
  const [filters, setFilters] = useState({
    distrito: '',
    dateFrom: '2051-01-01',
    dateTo: '2051-01-03' // 2 días después, o el rango que desees
  });

  const [distritos, setDistritos] = useState([]);
  const [accidents, setAccidents] = useState([]);
  const [kpi, setKpi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(100);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    axios
      .get('/api/accidents/filters')
      .then(res => setDistritos(res.data.distritos || []))
      .catch(err => console.error('Error al cargar filtros:', err));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = { ...filters, limit, offset };
        const requests = [
          axios.get('/api/accidents/data', { params })
        ];
        if (offset === 0) {
          const kpiParams = {
            distrito: filters.distrito,
            dateFrom: filters.dateFrom,
            dateTo: filters.dateTo
          };
          requests.push(
            axios.get('/api/accidents/kpi', {
              params: kpiParams
            })
          );
        }
        const [dataRes, kpiRes] = await Promise.all(requests);
        const { data, totalCount } = dataRes.data;
        if (offset === 0) {
          setAccidents(data);
        } else {
          setAccidents(prev => [...prev, ...data]);
        }
        setTotalCount(totalCount);
        if (kpiRes) setKpi(kpiRes.data);
      } catch (err) {
        console.error('Error al cargar accidentes:', err);
        setError('Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, offset]);

  const applyFilters = f => {
    setOffset(0);
    setFilters(f);
  };

  const resetFilters = () => {
    setOffset(0);
    setFilters({
      distrito: '',
      dateFrom: '2051-01-01',
      dateTo: '2051-01-03'
    });
  };


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
      {!loading && accidents.length === 0 && !error && <p>No se encontraron datos</p>}
      <MapaAccidentes accidents={accidents} />
      {accidents.length < totalCount && !loading && (
        <button onClick={() => setOffset(prev => prev + limit)} style={{ marginTop: '10px' }}>
          Cargar más
        </button>
      )}
      <KpiAccidentes kpi={kpi} />
    </div>
  );
}
