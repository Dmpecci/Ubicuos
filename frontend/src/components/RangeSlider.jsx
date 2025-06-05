// frontend/src/components/RangeSlider.jsx

import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

export default function RangeSlider({ min, max, step, values, onChange, unit }) {
  const [localRange, setLocalRange] = React.useState(values);

  const handleSliderChange = (event, newValue) => {
    setLocalRange(newValue);
  };

  const handleSliderCommit = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <Box sx={{ width: '100%', padding: '8px 0' }}>
      <Typography variant="body2" color="textSecondary">
        {values[0]}
        {unit ? ` ${unit}` : ''} – {values[1]}
        {unit ? ` ${unit}` : ''}
      </Typography>
      <Slider
        getAriaLabel={() => 'Intervalo'}
        value={localRange}
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderCommit}
        valueLabelDisplay="auto"
        step={step}
        marks={[
          { value: min, label: `${min}${unit || ''}` },
          { value: max, label: `${max}${unit || ''}` },
        ]}
        min={min}
        max={max}
      />
    </Box>
  );
}

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  unit: PropTypes.string,
};

RangeSlider.defaultProps = {
  step: 1,
  unit: '',
};
