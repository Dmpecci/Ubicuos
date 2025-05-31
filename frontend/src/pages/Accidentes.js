
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import * as utm from 'utm';

const icon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

export default function Accidentes() {
  const [accidentes, setAccidentes] = useState([]);
  const [filtros, setFiltros] = useState({
    distrito: [],
    tipo: [],
    sexo: [],
    lesividad: [],
    edad: [],
    vehiculo: [],
    horaMin: '00',
    horaMax: '23',
    fechaMin: '',
    fechaMax: ''
  });

  const [valores, setValores] = useState({
    distritos: [],
    tipos: [],
    sexos: [],
    lesividades: [],
    edades: [],
    vehiculos: []
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/accidents/filtros').then(res => {
      setValores(res.data);
    });
  }, []);

  useEffect(() => {
    const params = {};
    Object.entries(filtros).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length) {
        params[key] = value.join(',');
      } else if (typeof value === 'string' && value) {
        params[key] = value;
      }
    });

    axios.get('http://localhost:5000/api/accidents', { params }).then(res => {
      setAccidentes(res.data);
    });
  }, [filtros]);

  const toggleCheckbox = (field, value) => {
    setFiltros(prev => {
      const lista = prev[field];
      return {
        ...prev,
        [field]: lista.includes(value) ? lista.filter(v => v !== value) : [...lista, value]
      };
    });
  };

  const handleRangeChange = (field, value) => {
    setFiltros(prev => ({ ...prev, [field]: value }));
  };

  const clearAll = () => {
    setFiltros({
      distrito: [],
      tipo: [],
      sexo: [],
      lesividad: [],
      edad: [],
      vehiculo: [],
      horaMin: '00',
      horaMax: '23',
      fechaMin: '',
      fechaMax: ''
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#003366' }}>Análisis de Accidentes</h2>
      <p>Utilizá los filtros para explorar la base de datos de accidentalidad urbana.</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
        {['distrito', 'tipo', 'sexo', 'lesividad', 'edad', 'vehiculo'].map(campo => (
          <div key={campo}>
            <strong>{campo.toUpperCase()}</strong><br />
            {valores[campo + 's']?.map((val, i) => (
              <label key={i} style={{ display: 'block' }}>
                <input
                  type="checkbox"
                  checked={filtros[campo].includes(val)}
                  onChange={() => toggleCheckbox(campo, val)}
                />
                {val}
              </label>
            ))}
          </div>
        ))}

        <div>
          <strong>Rango Horario</strong><br />
          Desde: <input type="number" min="0" max="23" value={filtros.horaMin} onChange={e => handleRangeChange('horaMin', e.target.value)} /> <br />
          Hasta: <input type="number" min="0" max="23" value={filtros.horaMax} onChange={e => handleRangeChange('horaMax', e.target.value)} />
        </div>

        <div>
          <strong>Fecha (dd/mm/aaaa)</strong><br />
          Desde: <input type="text" value={filtros.fechaMin} onChange={e => handleRangeChange('fechaMin', e.target.value)} /><br />
          Hasta: <input type="text" value={filtros.fechaMax} onChange={e => handleRangeChange('fechaMax', e.target.value)} />
        </div>
      </div>

      <button onClick={clearAll} style={{ marginBottom: '20px' }}>Limpiar Filtros</button>

      <MapContainer center={[40.4168, -3.7038]} zoom={12} style={{ height: '500px' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {accidentes.map((a, idx) => {
            const x = parseFloat(a.coordenada_x_utm?.replace(',', '.'));
            const y = parseFloat(a.coordenada_y_utm?.replace(',', '.'));
            if (isNaN(x) || isNaN(y)) return null;
            const { latitude, longitude } = utm.toLatLon(x, y, 30, 'T');
            return (
              <Marker key={idx} position={[latitude, longitude]} icon={icon}>
                <Popup>
                  <strong>{a.tipo_accidente}</strong><br />
                  {a.distrito} – {a.fecha} {a.hora}<br />
                  Lesividad: {a.lesividad}
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
