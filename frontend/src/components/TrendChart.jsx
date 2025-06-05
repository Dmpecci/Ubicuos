// frontend/src/components/TrendChart.jsx

import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export default function TrendChart({ data, xKey, yKey }) {
  // Formateamos data para que la fecha sea legible en el eje X (por ej. '15 Abr')
  const formattedData = data.map((item) => ({
    fechaLabel: new Date(item[xKey]).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
    }),
    count: item[yKey],
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#f0f0f0" />
          <XAxis dataKey="fechaLabel" />
          <YAxis />
          <Tooltip
            formatter={(value) => [value, 'Accidentes']}
            labelFormatter={(label) => `Fecha: ${label}`}
          />
          <Line type="monotone" dataKey="count" stroke="#1976d2" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

TrendChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      [PropTypes.string]: PropTypes.any,
      [PropTypes.string]: PropTypes.any,
    })
  ),
  xKey: PropTypes.string.isRequired,
  yKey: PropTypes.string.isRequired,
};

TrendChart.defaultProps = {
  data: [],
};
