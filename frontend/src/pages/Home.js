import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Sección Hero */}
      <section style={{ backgroundColor: '#003366', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '10px' }}>Smart City Anthem</h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
          Plataforma para mejorar la vida urbana a través del análisis de datos sostenibles e inteligentes.
        </p>
      </section>

      {/* Tarjetas de módulos */}
      <section style={{ padding: '50px 20px' }}>
        <h2 style={{ textAlign: 'center', color: '#003366', fontSize: '1.8rem' }}>Explora los Módulos</h2>
        <div style={gridContainerStyle}>
          {modulos.map((m, idx) => (
            <Link key={idx} to={m.link} aria-label={`Ir al módulo de ${m.nombre}`} style={cardStyle}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{m.icono}</div>
              <div>{m.nombre}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Manifiesto resumen */}
      <section style={{ padding: '0 20px' }}>
        <h3 style={{ color: '#003366', textAlign: 'center', fontSize: '1.5rem' }}>Nuestra Misión</h3>
        <ul style={{ maxWidth: '800px', margin: '20px auto', lineHeight: '1.8rem', fontSize: '1.05rem', color: '#444' }}>
          <li>✔️ Reducir la accidentalidad y mejorar la seguridad urbana</li>
          <li>✔️ Fomentar movilidad sostenible e inteligente</li>
          <li>✔️ Proteger el medio ambiente y reducir la contaminación</li>
          <li>✔️ Optimizar residuos y energías renovables</li>
          <li>✔️ Brindar datos para decisiones públicas basadas en evidencia</li>
        </ul>
      </section>

      {/* Footer */}
      <footer style={{ marginTop: '60px', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
        <hr style={{ margin: '20px auto', width: '60%' }} />
        <p>© 2025 Smart City Anthem – Proyecto académico con propósito ciudadano</p>
      </footer>
    </div>
  );
}

// Módulos a mostrar
const modulos = [
  { nombre: 'Accidentes', icono: '🚧', link: '/modulo/accidentes' },
  { nombre: 'Tráfico', icono: '🚗', link: '/modulo/trafico' },
  { nombre: 'Calidad del Aire', icono: '🌫️', link: '/modulo/aire' },
  { nombre: 'Mapa General', icono: '🗺️', link: '/mapa' },
  { nombre: 'Dashboard', icono: '📊', link: '/dashboard' }
];

// Estilos visuales
const gridContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '20px',
  marginTop: '30px'
};

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '25px',
  textAlign: 'center',
  color: '#003366',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  outline: 'none'
};
