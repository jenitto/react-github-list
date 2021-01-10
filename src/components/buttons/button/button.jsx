import React from 'react';
import PropTypes from 'prop-types';
import { iconArrowCircle, iconArrowRight } from '../../../assets/icons/_icons';

const Button = ({ className = '', type, label, hasRipple, disabled, isLoading, onClick }) => (
  <button
    className={`button ${className} ${type} ${hasRipple ? 'ripple' : ''} ${isLoading ? 'loading' : ''}`}
    disabled={disabled || isLoading}
    onClick={onClick}
  >
    <span className='button__label'>{label}</span>
    <span className='button__icon'>{!isLoading ? iconArrowRight() : iconArrowCircle()}</span>
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'secondary', 'terciary']).isRequired,
  label: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  color: PropTypes.string,
  hasRipple: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
