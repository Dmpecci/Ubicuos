import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;

function AlertList() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const loadAlerts = async () => {
      const newAlerts = [];

      // Aire: NO2 > 180
      try {
        const resAir = await axios.get(`${API_BASE}/api/air`);
        const airData = resAir.data.filter(d => parseFloat(d.NO2?.replace(',', '.')) > 180);
        if (airData.length > 0) {
          newAlerts.push(`🚨 Calidad del aire crítica: ${airData.length} lecturas con NO₂ > 180`);
        }
      } catch (err) {
        console.error('Error en datos de aire:', err);
      }

      // Tráfico: intensidad > 3000
      try {
        const resTraffic = await axios.get(`${API_BASE}/api/traffic-data`);
        const highTraffic = resTraffic.data.filter(d => d.intensidad > 3000);
        if (highTraffic.length > 0) {
          newAlerts.push(`🚦 Tráfico muy denso: ${highTraffic.length} lecturas con intensidad > 3000`);
        }
      } catch (err) {
        console.error('Error en datos de tráfico:', err);
      }

      // Accidentes: más de 10 en un distrito
      try {
        const resAccidents = await axios.get(`${API_BASE}/api/accidents`);
        const distritos = {};
        resAccidents.data.forEach(acc => {
          if (!acc.distrito) return;
          distritos[acc.distrito] = (distritos[acc.distrito] || 0) + 1;
        });
        Object.entries(distritos).forEach(([distrito, count]) => {
          if (count > 10) {
            newAlerts.push(`⚠️ Alta siniestralidad en ${distrito}: ${count} accidentes`);
          }
        });
      } catch (err) {
        console.error('Error en datos de accidentes:', err);
      }

      setAlerts(newAlerts);
    };

    loadAlerts();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Alertas del sistema</h2>
      {alerts.length === 0 ? (
        <p>✅ No se detectaron alertas.</p>
      ) : (
        <ul>
          {alerts.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      )}
    </div>
  );
}

export default AlertList;
