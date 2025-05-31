import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import * as utm from 'utm';
import 'leaflet/dist/leaflet.css';

function AccidentMap() {
  const [accidents, setAccidents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/accidents')
      .then(res => {
        const filtered = res.data
          .filter(acc => acc.coordenada_x_utm && acc.coordenada_y_utm)
          .slice(0, 200); // 👈 solo los primeros 200

        const converted = filtered
          .map(acc => {
            const x = parseFloat(acc.coordenada_x_utm?.replace(',', '.'));
            const y = parseFloat(acc.coordenada_y_utm?.replace(',', '.'));
            if (isNaN(x) || isNaN(y)) return null;
            try {
              const { latitude, longitude } = utm.toLatLon(x, y, 30, 'T');
              return { ...acc, lat: latitude, lng: longitude };
            } catch (e) {
              return null;
            }
          })
          .filter(Boolean);

        setAccidents(converted);
      })

      .catch(err => console.error('Error al cargar accidentes:', err));
  }, []);

  return (
    <MapContainer center={[40.4168, -3.7038]} zoom={11} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {accidents.map((acc, idx) => (
        <Marker key={idx} position={[acc.lat, acc.lng]}>
          <Popup>
            <strong>{acc.tipo_accidente || 'Accidente'}</strong><br />
            Fecha: {acc.fecha}<br />
            Distrito: {acc.distrito}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default AccidentMap;
