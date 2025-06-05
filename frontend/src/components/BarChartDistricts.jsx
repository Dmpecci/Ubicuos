// frontend/src/components/BarChartDistricts.jsx

import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
} from 'recharts';

export default function BarChartDistricts({ data }) {
  // Ordenamos data de mayor a menor
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          layout="vertical"
          data={sortedData}
          margin={{ top: 20, right: 20, left: 40, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis
            dataKey="district"
            type="category"
            width={120}
            tick={{ fontSize: 12 }}
          />
          <Tooltip formatter={(value) => [value, 'Accidentes']} />
          <Bar dataKey="count" fill="#1976d2">
            <LabelList dataKey="count" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

BarChartDistricts.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      district: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ),
};

BarChartDistricts.defaultProps = {
  data: [],
};
