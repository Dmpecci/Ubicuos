// frontend/src/components/MultiSelect.jsx

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

// Estilos mínimos para que parezca MUI-like
const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: '36px',
    fontSize: '0.9rem',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#333',
  }),
  option: (provided) => ({
    ...provided,
    fontSize: '0.9rem',
  }),
};

export default function MultiSelect({
  label,
  options,
  selected,
  onChange,
  placeholder,
}) {
  // Transformamos array de strings a formato react-select: { value, label }
  const selectOptions = options.map((opt) => ({
    value: opt,
    label: opt,
  }));
  const selectValue = selected.map((s) => ({
    value: s,
    label: s,
  }));

  const handleChange = (values) => {
    // values es null o array de {value,label}
    if (!values) {
      onChange([]);
    } else {
      onChange(values.map((v) => v.value));
    }
  };

  return (
    <div style={{ marginBottom: '12px' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem' }}>
          {label}
        </label>
      )}
      <Select
        isMulti
        options={selectOptions}
        value={selectValue}
        onChange={handleChange}
        placeholder={placeholder}
        styles={customStyles}
        noOptionsMessage={() => 'No hay opciones'}
      />
    </div>
  );
}

MultiSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

MultiSelect.defaultProps = {
  label: '',
  selected: [],
  placeholder: 'Selecciona...',
};
