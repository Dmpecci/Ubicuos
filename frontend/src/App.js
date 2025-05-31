import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import DashboardCards from './components/DashboardCards';
import AlertList from './components/AlertList';
import AccidentMap from './components/AccidentMap';
import Aire from './pages/Aire';
import Traffic from './pages/Traffic';
import Home from './pages/Home';
import Accidentes from './pages/Accidentes';


function Dashboard() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard General</h2>
      <DashboardCards />
      <h2 style={{ marginTop: '40px' }}>Alertas del Sistema</h2>
      <AlertList />
    </div>
  );
}

function MapView() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Mapa de Accidentes</h2>
      <AccidentMap />
    </div>
  );
}

function AireView() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Calidad del Aire</h2>
      <Aire />
    </div>
  );
}

function TrafficView() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Tráfico: Intensidad Promedio por Hora</h2>
      <Traffic />
    </div>
  );
}

function App() {
  return (
    <Router>
      <header style={{ backgroundColor: '#003366', color: 'white', padding: '20px' }}>
        <h1 style={{ margin: 0 }}>Smart City Anthem</h1>
        <nav style={{ marginTop: '10px' }}>
          <Link to="/" style={linkStyle}>Inicio</Link>
          <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
          <Link to="/mapa" style={linkStyle}>Mapa</Link>
          <Link to="/modulo/aire" style={linkStyle}>Aire</Link>
          <Link to="/modulo/trafico" style={linkStyle}>Tráfico</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mapa" element={<MapView />} />
        <Route path="/modulo/aire" element={<AireView />} />
        <Route path="/modulo/trafico" element={<TrafficView />} />
        <Route path="/modulo/accidentes" element={<Accidentes />} />
      </Routes>
    </Router>
  );
}

const linkStyle = {
  marginRight: '15px',
  color: 'white',
  textDecoration: 'none',
  fontWeight: 'bold'
};

export default App;
