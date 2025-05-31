import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function Aire() {
  const [datosPorHora, setDatosPorHora] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/air')
      .then(res => {
        const registros = res.data;

        // Agrupar por hora
        const horas = Array(24).fill(0);
        const conteo = Array(24).fill(0);

        registros.forEach(r => {
          const hora = new Date(r.timestamp).getHours(); // 0–23
          if (typeof r.value === 'number') {
            horas[hora] += r.value;
            conteo[hora]++;
          }
        });

        const promedios = horas.map((total, i) =>
          conteo[i] > 0 ? (total / conteo[i]).toFixed(1) : null
        );

        setDatosPorHora(promedios);
      });
  }, []);

  const chartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i + 1}:00`),
    datasets: [
      {
        label: 'NO₂ (μg/m³)',
        data: datosPorHora,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Calidad del Aire - Promedio por Hora (NO₂)</h2>
      <Line data={chartData} />
    </div>
  );
}
