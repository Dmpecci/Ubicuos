import React, { useEffect, useState } from 'react';
import { fetchAcousticData } from '../services/api';
import { Line } from 'react-chartjs-2';

const GraphView = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const acousticData = await fetchAcousticData();
      setData(acousticData);
    };
    loadData();
  }, []);

  const chartData = {
    labels: data.map(d => `${d.year}-${d.month}-${d.day}`),
    datasets: [
      {
        label: 'Nivel de Ruido (LAEQ)',
        data: data.map(d => d.LAEQ),
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default GraphView;
