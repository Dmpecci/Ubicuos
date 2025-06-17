import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapaAccidentes({ accidents = [] }) {
  return (
    <MapContainer center={[40.4168, -3.7038]} zoom={11} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {accidents.map((acc, idx) => (
        acc.lat && acc.lng && (
          <Marker key={idx} position={[acc.lat, acc.lng]}>
            <Popup>
              <div>
                <strong>{acc.tipo_accidente}</strong><br />
                Fecha: {acc.fecha?.slice(0, 10)}<br />
                Distrito: {acc.distrito}<br />
                Lesividad: {acc.lesividad}
              </div>
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
}

export default MapaAccidentes;
