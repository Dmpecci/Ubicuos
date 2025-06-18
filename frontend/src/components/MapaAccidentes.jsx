import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Generador de iconos dinámicos con emojis
const emojiIcon = (emoji = '⚠️') =>
  L.divIcon({
    html: `<div style="font-size: 24px;">${emoji}</div>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

// Función que asigna un emoji según el tipo de accidente
const getAccidenteEmoji = (tipo = '') => {
  if (tipo.includes('Atropello')) return '🚶‍♂️';
  if (tipo.includes('Colisión múltiple')) return '💥';
  if (tipo.includes('Colisión fronto-lateral')) return '🚗';
  if (tipo.includes('Colisión lateral')) return '↔️';
  if (tipo.includes('Alcance')) return '🔙';
  if (tipo.includes('Caída')) return '🤕';
  if (tipo.includes('Choque contra obstáculo')) return '🧱';
  return '⚠️';
};

function MapaAccidentes({ accidents = [] }) {
  return (
    <MapContainer center={[40.4168, -3.7038]} zoom={11} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {accidents.map((acc, idx) =>
        acc.lat && acc.lng ? (
          <Marker
            key={idx}
            position={[acc.lat, acc.lng]}
            icon={emojiIcon(getAccidenteEmoji(acc.tipo_accidente))}
          >
            <Popup>
              <div>
                <strong>{acc.tipo_accidente}</strong><br />
                Fecha: {acc.fecha?.slice(0, 10)}<br />
                Distrito: {acc.distrito}<br />
                Lesividad: {acc.lesividad}
              </div>
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
}

export default MapaAccidentes;
