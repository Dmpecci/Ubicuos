import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import AccidentMap from './components/AccidentMap';
import Aire from './pages/Aire';
import SostenibilidadUrbana from './pages/SostenibilidadUrbana';
import Home from './pages/Home';
import Accidentes from './pages/Accidentes';


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

function App() {
  return (
    <Router>
      <header style={{ backgroundColor: '#003366', color: 'white', padding: '20px' }}>
        <h1 style={{ margin: 0 }}>Smart City Anthem</h1>
        <nav style={{ marginTop: '10px' }}>
          <Link to="/" style={linkStyle}>Inicio</Link>
          <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
          <Link to="/mapa" style={linkStyle}>Mapa</Link>
          <Link to="/modulo/accidentes" style={linkStyle}>Accidentes</Link>
          <Link to="/modulo/aire" style={linkStyle}>Aire</Link>
          <Link to="/sostenibilidad" style={linkStyle}>Sostenibilidad Urbana</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mapa" element={<MapView />} />
        <Route path="/modulo/accidentes" element={<Accidentes />} />
        <Route path="/modulo/aire" element={<AireView />} />
        <Route path="/sostenibilidad" element={<SostenibilidadUrbana />} />
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
