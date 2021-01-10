import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/button';

const ButtonSecondary = (props) => <Button type='secondary' {...props} />;

ButtonSecondary.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  color: PropTypes.string,
  hasRipple: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default ButtonSecondary;
