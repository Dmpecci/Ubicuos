import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container" style={{ backgroundColor: '#F7F7F7', minHeight: '100vh', paddingBottom: '40px' }}>
      {/* Sección Hero */}
      <section style={{ backgroundColor: '#003366', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Smart City Anthem</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
          Plataforma para la transformación urbana basada en datos, sostenibilidad y bienestar ciudadano.
        </p>
      </section>

      {/* Tarjetas de acceso rápido */}
      <section style={{ padding: '40px 20px' }}>
        <h2 style={{ textAlign: 'center', color: '#003366' }}>Explora los Módulos</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginTop: '30px'
        }}>
          <Link to="/modulo/accidentes" style={cardStyle}>🚧 Accidentes</Link>
          <Link to="/modulo/trafico" style={cardStyle}>🚗 Tráfico</Link>
          <Link to="/modulo/aire" style={cardStyle}>🌫️ Calidad del Aire</Link>
          <Link to="/mapa" style={cardStyle}>🗺️ Mapa General</Link>
          <Link to="/dashboard" style={cardStyle}>📊 Dashboard</Link>
        </div>
      </section>

      {/* Manifiesto resumido */}
      <section style={{ marginTop: '40px', padding: '0 20px' }}>
        <h3 style={{ color: '#003366', textAlign: 'center' }}>Nuestra misión</h3>
        <ul style={{ maxWidth: '800px', margin: '20px auto', lineHeight: '1.8rem' }}>
          <li>✔️ Reducir la accidentalidad y mejorar la seguridad</li>
          <li>✔️ Optimizar la movilidad urbana sostenible</li>
          <li>✔️ Promover el uso de energías renovables</li>
          <li>✔️ Evaluar y mejorar el entorno ambiental</li>
          <li>✔️ Potenciar decisiones públicas basadas en datos</li>
        </ul>
      </section>

      {/* Footer */}
      <footer style={{ marginTop: '60px', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
        <hr style={{ margin: '20px auto', width: '60%' }} />
        <p>© 2025 Proyecto Universitario – Smart City Anthem | David Muñoz Pecci - Mohhamed Bannay Khyy</p>
      </footer>
    </div>
  );
}

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '20px',
  textAlign: 'center',
  color: '#003366',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer'
};
