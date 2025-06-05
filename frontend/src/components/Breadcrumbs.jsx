// frontend/src/components/Breadcrumbs.jsx

import React from 'react';
import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';

export default function BreadcrumbsNav({ paths }) {
  // paths es un array, p.e. ['Inicio', 'Mapa', 'Accidentes']
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: '16px' }}>
      <Link
        underline="hover"
        color="inherit"
        href="/"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Inicio
      </Link>
      {paths.slice(1).map((label, idx) => {
        const isLast = idx === paths.slice(1).length - 1;
        return isLast ? (
          <Typography
            key={label + idx}
            color="text.primary"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {label}
          </Typography>
        ) : (
          <Link
            key={label + idx}
            underline="hover"
            color="inherit"
            href="#"
            onClick={(e) => e.preventDefault()}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

BreadcrumbsNav.propTypes = {
  paths: PropTypes.arrayOf(PropTypes.string).isRequired,
};
