import { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardCards() {
  const [accidentsCount, setAccidentsCount] = useState(0);
  const [bicyclesCount, setBicyclesCount] = useState(0);
  const [trafficPointsCount, setTrafficPointsCount] = useState(0);

  useEffect(() => {
    // Obtener total de accidentes
    axios.get('http://localhost:5000/api/accidents')
      .then(res => setAccidentsCount(res.data.length))
      .catch(err => console.error('Error al obtener accidentes:', err));

    // Obtener total de disponibilidad bicicletas
    axios.get('http://localhost:5000/api/bicycle-availability')
      .then(res => setBicyclesCount(res.data.length))
      .catch(err => console.error('Error al obtener bicicletas:', err));

    // Obtener total de puntos de medición de tráfico
    axios.get('http://localhost:5000/api/traffic-measurement-points')
      .then(res => setTrafficPointsCount(res.data.length))
      .catch(err => console.error('Error al obtener puntos de tráfico:', err));
  }, []);

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <Card title="Total Accidentes" value={accidentsCount} />
      <Card title="Total Bicicletas" value={bicyclesCount} />
      <Card title="Sensores de Tráfico" value={trafficPointsCount} />
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
