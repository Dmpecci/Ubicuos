import { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardCards() {
  const [summary, setSummary] = useState({
    bicycles: 0,
    scooters: 0,
    solar: 0,
    serSpaces: 0,
    accidents: 0,
    airQuality: 0
  });

  useEffect(() => {
    axios.get('/api/dashboard/summary')
      .then(res => setSummary(res.data))
      .catch(err => console.error('Error al obtener resumen:', err));
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        padding: '20px'
      }}
    >
      <Card title="Total bicicletas registradas" value={summary.bicycles} />
      <Card title="Total patinetes disponibles" value={summary.scooters} />
      <Card title="Total instalaciones solares" value={summary.solar} />
      <Card title="Total plazas SER" value={summary.serSpaces} />
      <Card title="Total accidentes registrados" value={summary.accidents} />
      <Card title="Calidad aire promedio (NO₂)" value={summary.airQuality} />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '20px',
      width: '200px',
      textAlign: 'center',
      background: '#f7f7f7',
      boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3>{title}</h3>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</p>
    </div>
  );
}

export default DashboardCards;
