import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ className = '', children, value, checked, indeterminate, disabled, onChange }) => {
  const [focus, setFocus] = useState(false);

  const handleCheckboxChange = (e) => {
    if (disabled) {
      return;
    }
    onChange({ value: value, checked: e.target.checked });
  };

  return (
    <label
      className={`checkbox ${className} ${checked ? 'checkbox--checked' : ''} ${
        indeterminate ? 'checkbox--indeterminate' : ''
      } ${disabled ? 'disabled' : ''} ${focus ? 'focused' : ''}`}
    >
      <div className='checkbox__button-container'>
        <div className='checkbox__button'>
          <div className='checkbox__button-icon' />
        </div>
      </div>
      <input
        className='checkbox__input'
        type='checkbox'
        disabled={disabled}
        checked={checked}
        aria-checked={indeterminate ? 'mixed' : checked}
        value={value}
        onChange={handleCheckboxChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <span className='checkbox__label'>{children}</span>
    </label>
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  checked: PropTypes.bool.isRequired,
  indeterminate: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
