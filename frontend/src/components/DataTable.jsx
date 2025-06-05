// frontend/src/components/DataTable.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';

export default function DataTable({ columns, data, pageSize, autoHeight }) {
  // El DataGrid de MUI espera que cada fila tenga un campo "id" único.
  // Si en data no viene id, generamos uno temporal.
  const rows = data.map((row, idx) => ({
    id: row._id || idx,
    ...row,
  }));

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize || 10}
        rowsPerPageOptions={[pageSize || 10, 25, 50]}
        disableSelectionOnClick
        autoHeight={autoHeight}
      />
    </div>
  );
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      width: PropTypes.number,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageSize: PropTypes.number,
  autoHeight: PropTypes.bool,
};

DataTable.defaultProps = {
  pageSize: 10,
  autoHeight: false,
};
