// frontend/src/components/AccidentMap.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';

// Definimos un icono base para accidentes; podrías tener un icono por severidad
const accidentIcon = new L.Icon({
  iconUrl:
    'https://cdn-icons-png.flaticon.com/512/252/252035.png', // ejemplo de ícono
  iconSize: [25, 25],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

export default function AccidentMap({ data }) {
  // Coordenadas centrar (ejemplo: Madrid centro)
  const centerPosition = [40.4168, -3.7038];
  const zoomLevel = 11;

  return (
    <MapContainer center={centerPosition} zoom={zoomLevel} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {data.map((accident, idx) => {
          // Esperamos que cada objeto tenga { lat, lng, severity, tipo_accident, fecha, hora, distrito }
          const position = [accident.lat, accident.lng];
          const popupContent = `
            <strong>Fecha:</strong> ${accident.fecha} ${accident.hora}<br/>
            <strong>Distrito:</strong> ${accident.distrito || 'N/D'}<br/>
            <strong>Tipo:</strong> ${accident.tipo_accident || 'N/D'}<br/>
            <strong>Severidad:</strong> ${accident.severidad || 'N/D'}
          `;
          return (
            <Marker key={`acc-${idx}`} position={position} icon={accidentIcon}>
              <Popup>
                <div dangerouslySetInnerHTML={{ __html: popupContent }} />
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

AccidentMap.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      tipo_accident: PropTypes.string,
      fecha: PropTypes.string,
      hora: PropTypes.string,
      distrito: PropTypes.string,
      severidad: PropTypes.string,
    })
  ),
};

AccidentMap.defaultProps = {
  data: [],
};
