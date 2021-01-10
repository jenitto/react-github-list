import React from 'react';
import PropTypes from 'prop-types';

const InputText = ({ label, disabled, onChange }) => {
  return (
    <div className={`input-text ${disabled ? 'input-text--disabled' : ''}`}>
      <input
        className={`input-text__input`}
        type='text'
        required
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      ></input>
      <div className='input-text__icons-container'></div>
      <label className='input-text__label'>{label}</label>
    </div>
  );
};

InputText.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default InputText;
