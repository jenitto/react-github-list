import React from 'react';
import PropTypes from 'prop-types';

const ButtonIcon = ({ icon, disabled, onClick }) => (
  <button className='button-icon' disabled={disabled} onClick={onClick}>
    {icon}
  </button>
);

ButtonIcon.propTypes = {
  icon: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ButtonIcon;
