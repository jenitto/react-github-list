import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/button';

const ButtonPrimary = (props) => (
	<Button
		type="primary"
		{...props} />
);

ButtonPrimary.propTypes = {
	label: PropTypes.string.isRequired,
	isLoading: PropTypes.bool,
	color: PropTypes.string,
	hasRipple: PropTypes.bool,
	disabled: PropTypes.bool,
};

export default ButtonPrimary;