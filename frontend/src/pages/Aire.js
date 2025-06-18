import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer
} from 'recharts';

export default function Aire() {
  const [data, setData] = useState([]);
  const [estaciones, setEstaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [puntoMuestreo, setPuntoMuestreo] = useState("28079036_1_38");
  const [fecha, setFecha] = useState("2051-01-23");


  useEffect(() => {
    axios
      .get('/api/aire/estaciones')
      .then(res => setEstaciones(res.data))
      .catch(err => console.error('Error al cargar estaciones', err));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`/api/aire/${puntoMuestreo}?fecha=${fecha}`);
        const ordered = res.data.sort((a, b) => a.hora - b.hora);
        if (ordered.length === 0) {
          setError('No hay registros disponibles para esta fecha');
        }
        setData(ordered);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('No hay registros disponibles para esta fecha');
        } else {
          console.error('Error al obtener datos de aire', err);
          setError('No se pudieron cargar los datos');
        }
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [puntoMuestreo, fecha]);

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
        <label>Estación: </label>
        <select
          value={puntoMuestreo}
          onChange={(e) => setPuntoMuestreo(e.target.value)}
          style={{ marginLeft: '10px' }}
        >
          {estaciones.map((est) => (
            <option key={est.punto} value={est.punto}>
              {est.nombre}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Fecha: </label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
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
