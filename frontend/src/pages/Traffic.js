import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function Traffic() {
  const [datosPorHora, setDatosPorHora] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/api/traffic-data`)
      .then(res => {
        const registros = res.data;

        const suma = Array(24).fill(0);
        const conteo = Array(24).fill(0);

        registros.forEach(r => {
          if (!r.fecha || !r.intensidad) return;
          const hora = parseInt(r.fecha.split('T')[1].substring(0, 2));
          const valor = parseInt(r.intensidad);
          if (!isNaN(hora) && !isNaN(valor)) {
            suma[hora] += valor;
            conteo[hora]++;
          }
        });

        const promedios = suma.map((s, i) => (conteo[i] ? (s / conteo[i]).toFixed(1) : null));
        setDatosPorHora(promedios);
      });
  }, []);

  const chartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: 'Intensidad de Tráfico',
        data: datosPorHora,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Intensidad Media de Tráfico por Hora</h2>
      <Line data={chartData} />
    </div>
  );
}
