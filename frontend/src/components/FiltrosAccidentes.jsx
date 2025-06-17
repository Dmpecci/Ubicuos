import React, { useState, useEffect } from 'react';

function FiltrosAccidentes({ distritos = [], initialFilters, onApply, onReset }) {
  const [distrito, setDistrito] = useState(initialFilters.distrito || '');
  const [dateFrom, setDateFrom] = useState(initialFilters.dateFrom || '');
  const [dateTo, setDateTo] = useState(initialFilters.dateTo || '');

  useEffect(() => {
    setDistrito(initialFilters.distrito || '');
    setDateFrom(initialFilters.dateFrom || '');
    setDateTo(initialFilters.dateTo || '');
  }, [initialFilters]);

  const apply = () => {
    onApply({ distrito, dateFrom, dateTo });
  };

  const reset = () => {
    setDistrito('');
    setDateFrom('');
    setDateTo('');
    onReset();
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ marginRight: '10px' }}>
        Distrito:
        <select value={distrito} onChange={e => setDistrito(e.target.value)} style={{ marginLeft: '5px' }}>
          <option value="">Todos</option>
          {distritos.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </label>
      <label style={{ marginRight: '10px' }}>
        Desde:
        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} style={{ marginLeft: '5px' }} />
      </label>
      <label style={{ marginRight: '10px' }}>
        Hasta:
        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} style={{ marginLeft: '5px' }} />
      </label>
      <button onClick={apply} style={{ marginRight: '10px' }}>Aplicar filtros</button>
      <button onClick={reset}>Resetear</button>
    </div>
  );
}

export default FiltrosAccidentes;
