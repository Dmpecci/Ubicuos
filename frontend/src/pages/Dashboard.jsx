import React from 'react';
import DashboardCards from '../components/DashboardCards';
import AlertList from '../components/AlertList';

export default function Dashboard() {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Dashboard de Sostenibilidad Urbana</h2>
      <DashboardCards />
      <AlertList />
    </div>
  );
}
