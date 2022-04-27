import * as React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onClick, onKeyDown, ...props }) => (
	<button
		onClick={(event) => {
			if (onClick) {
				onClick(event);
			}
		}}
		onKeyDown={(event) => {
			if (onKeyDown) {
				onKeyDown(event);
			}
		}}
		type='button'
		tabIndex='0'
		{...props}
	>
		{children}
	</button>
);

Button.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
	onClick: PropTypes.func,
	onKeyDown: PropTypes.func
};

Button.defaultProps = {
	onClick: null,
	onKeyDown: null
};

export default Button;
