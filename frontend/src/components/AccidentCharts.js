
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AccidentCharts({ datos }) {
  const porHora = {};
  const porDistrito = {};

  datos.forEach(a => {
    const hora = a.hora?.substring(0, 2);
    porHora[hora] = (porHora[hora] || 0) + 1;
    porDistrito[a.distrito] = (porDistrito[a.distrito] || 0) + 1;
  });

  const chartHora = {
    labels: Object.keys(porHora).sort(),
    datasets: [{ label: 'Accidentes por hora', data: Object.values(porHora), backgroundColor: '#1D8DF1' }]
  };

  const chartDistrito = {
    labels: Object.keys(porDistrito).sort((a, b) => porDistrito[b] - porDistrito[a]).slice(0, 10),
    datasets: [{ label: 'Top distritos con más accidentes', data: Object.values(porDistrito).sort((a, b) => b - a).slice(0, 10), backgroundColor: '#F15A24' }]
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center', marginBottom: '30px' }}>
      <div style={{ width: '450px' }}>
        <Bar data={chartHora} />
      </div>
      <div style={{ width: '450px' }}>
        <Bar data={chartDistrito} />
      </div>
    </div>
  );
}
