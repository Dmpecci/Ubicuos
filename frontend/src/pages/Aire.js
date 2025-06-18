import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer
} from 'recharts';

export default function Aire() {
  const [data, setData] = useState([]);
  const [punto, setPunto] = useState('28079004_1_38');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`/api/aire/${punto}`);
        const ordered = res.data.sort((a, b) => a.hora - b.hora);
        setData(ordered);
      } catch (err) {
        console.error('Error al obtener datos de aire', err);
        setError('No se pudieron cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [punto]);

  const average =
    data.length > 0
      ? (data.reduce((sum, d) => sum + d.valor, 0) / data.length).toFixed(1)
      : 0;
  const peak = data.reduce(
    (max, d) => (d.valor > max.valor ? d : max),
    { hora: '-', valor: 0 }
  );
  let calidad = '🟢';
  if (average > 180) calidad = '🔴';
  else if (average >= 100) calidad = '🟡';

  return (
    <div style={{ padding: '20px' }}>
      <h3>Evolución horaria del NO₂</h3>
      <div style={{ marginBottom: '10px' }}>
        <label>Punto de muestreo: </label>
        <input
          type="text"
          value={punto}
          onChange={(e) => setPunto(e.target.value)}
          style={{ marginLeft: '10px' }}
        />
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="hora" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="valor" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
          <div
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              width: '250px',
              marginTop: '20px',
            }}
          >
            <p>Promedio del día: <strong>{average}</strong></p>
            <p>Hora de pico: <strong>{peak.hora}</strong></p>
            <p>Calidad del aire: <strong>{calidad}</strong></p>
          </div>
        </>
      )}
    </div>
  );
}
