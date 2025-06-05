// frontend/src/components/KpiCard.jsx

import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function KpiCard({ title, value }) {
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 200,
        flex: '1 1 200px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <CardContent>
        <Typography
          variant="subtitle2"
          component="div"
          color="textSecondary"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="h4" component="div" color="#1976d2">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

KpiCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
