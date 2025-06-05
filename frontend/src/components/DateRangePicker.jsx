// frontend/src/components/DateRangePicker.jsx

import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// IMPORTS CORRECTOS para MUI v5+ y date-fns
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale';

export default function DateRangePickerComp({ startDate, endDate, onChange }) {
  const [start, setStart] = React.useState(startDate);
  const [end, setEnd] = React.useState(endDate);

  const handleStartChange = (newVal) => {
    setStart(newVal);
    if (newVal && end && newVal > end) {
      // Si la fecha de inicio supera la de fin, reseteamos fin
      setEnd(null);
      onChange(newVal, null);
    } else {
      onChange(newVal, end);
    }
  };

  const handleEndChange = (newVal) => {
    // Evitamos rango invertido
    if (start && newVal && newVal < start) {
      return;
    }
    setEnd(newVal);
    onChange(start, newVal);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
        <DatePicker
          label="Desde"
          value={start}
          onChange={(newValue) => handleStartChange(newValue)}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
        <DatePicker
          label="Hasta"
          value={end}
          onChange={(newValue) => handleEndChange(newValue)}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
      </Box>
    </LocalizationProvider>
  );
}

DateRangePickerComp.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired, // Recibe (startDate: Date, endDate: Date)
};

DateRangePickerComp.defaultProps = {
  startDate: null,
  endDate: null,
};
