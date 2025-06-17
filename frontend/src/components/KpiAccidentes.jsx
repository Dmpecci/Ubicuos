import React from 'react';

function KpiAccidentes({ kpi }) {
  if (!kpi) return null;
  const { total, topDistrict, topType } = kpi;
  return (
    <div style={{ marginTop: '20px' }}>
      <h3>KPIs</h3>
      <ul>
        <li><strong>Total accidentes:</strong> {total ?? '-'}</li>
        <li><strong>Distrito con más accidentes:</strong> {topDistrict || '-'}</li>
        <li><strong>Tipo más común:</strong> {topType || '-'}</li>
      </ul>
    </div>
  );
}

export default KpiAccidentes;
