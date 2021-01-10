import React from 'react';
import PropTypes from 'prop-types';

const InputText = ({ className = '', label, disabled, onChange }) => {
  return (
    <div className={`input-text ${className} ${disabled ? 'input-text--disabled' : ''}`}>
      <input
        className={`input-text__input`}
        type='text'
        required
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      ></input>
      <label className='input-text__label'>{label}</label>
    </div>
  );
};

InputText.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default InputText;
