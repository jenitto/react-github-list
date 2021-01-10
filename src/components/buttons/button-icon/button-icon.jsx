import React from 'react';
import PropTypes from 'prop-types';

const ButtonIcon = ({ className = '', icon, disabled, onClick }) => (
  <button className={`button-icon ${className}`} disabled={disabled} onClick={onClick}>
    {icon}
  </button>
);

ButtonIcon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ButtonIcon;
