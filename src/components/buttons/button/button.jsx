import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type, label, hasRipple, disabled, isLoading, className = '', onClick }) => (
	<button
		className={`button ${type} ${hasRipple ? 'ripple' : ''} ${isLoading ? 'loading' : ''} ${className}`}
		disabled={disabled || isLoading}
		onClick={onClick}>
		<span className="button__label">{label}</span>
		<span className="button__icon">
			{!isLoading
				? < svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M18.7188 6.78125L17.2812 8.21875L24.0625 15H4V17H24.0625L17.2812 23.7812L18.7188 25.2188L27.2188 16.7188L27.9062 16L27.2188 15.2812L18.7188 6.78125Z" />
				</svg>
				: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M16 4C10.8867 4 6.61719 7.16016 4.875 11.625L6.71875 12.375C8.17578 8.64062 11.7109 6 16 6C19.2422 6 22.1328 7.58984 23.9375 10H20V12H27V5H25V8.09375C22.8086 5.58203 19.5703 4 16 4ZM25.2812 19.625C23.8242 23.3594 20.2891 26 16 26C12.7227 26 9.84375 24.3867 8.03125 22H12V20H5V27H7V23.9062C9.1875 26.3867 12.3945 28 16 28C21.1133 28 25.3828 24.8398 27.125 20.375L25.2812 19.625Z" />
				</svg>
			}
		</span>
	</button >
);

Button.propTypes = {
	type: PropTypes.oneOf(['primary', 'secondary', 'terciary']).isRequired,
	label: PropTypes.string.isRequired,
	isLoading: PropTypes.bool,
	color: PropTypes.string,
	hasRipple: PropTypes.bool,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
};

export default Button;