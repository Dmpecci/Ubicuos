import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ResponsiveContainer
} from 'recharts';

export default function MovilidadSostenible() {
  const [datos, setDatos] = useState([]);
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  const [distritoSeleccionado, setDistritoSeleccionado] = useState(null);

  useEffect(() => {
    axios
      .get('/api/sostenibilidad')
      .then(res => {
        setDatos(res.data || []);
        if (res.data && res.data.length > 0) {
          setDistritoSeleccionado(res.data[0]);
        }
      })
      .catch(err => console.error('Error al cargar sostenibilidad', err));
  }, []);

  const filtrarDatos = () => {
    return datos
      .filter(d =>
        d.distrito.toLowerCase().includes(filtroBusqueda.toLowerCase())
      )
      .sort((a, b) => b.indice - a.indice);
  };

  const datosFiltrados = filtrarDatos();

  const ranking = distritoSeleccionado
    ? datos
        .slice()
        .sort((a, b) => b.indice - a.indice)
        .findIndex(d => d.distrito === distritoSeleccionado.distrito) + 1
    : null;

  const colorBarra = valor => {
    if (valor > 70) return '#4caf50';
    if (valor >= 40) return '#ffeb3b';
    return '#f44336';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '30px' }}>
        Índice de Movilidad Sostenible por Distrito
      </h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '20px',
          marginTop: '20px'
        }}
      >
        <input
          type="text"
          placeholder="Buscar distrito..."
          value={filtroBusqueda}
          onChange={e => setFiltroBusqueda(e.target.value)}
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            flexGrow: 1,
            minWidth: '220px'
          }}
        />
        {distritoSeleccionado && (
          <div
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              width: '300px'
            }}
          >
            <h3 style={{ marginTop: 0 }}>{distritoSeleccionado.distrito}</h3>
            <p>
              Índice: <strong>{distritoSeleccionado.indice}</strong>
            </p>
            <p>🛴 Patinetes: {distritoSeleccionado.patinetes}</p>
            <p>🚲 Bicicletas: {distritoSeleccionado.bicicletas}</p>
            <p>☀️ Solares: {distritoSeleccionado.solares}</p>
            <p>🅿️ SER: {distritoSeleccionado.ser}</p>
            {ranking > 0 && (
              <p>
                <em>
                  {ranking}º de {datos.length}
                </em>
              </p>
            )}
          </div>
        )}
      </div>
      <div
        style={{ maxHeight: '500px', overflowY: 'auto', marginTop: '20px' }}
      >
        <ResponsiveContainer width="100%" height={40 * datosFiltrados.length}>
          <BarChart
            data={datosFiltrados}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
            barSize={20}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis
              dataKey="distrito"
              type="category"
              width={100}
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Bar dataKey="indice" onClick={setDistritoSeleccionado}>
              {datosFiltrados.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colorBarra(entry.indice)}
                  cursor="pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
