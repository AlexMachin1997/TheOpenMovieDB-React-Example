import * as React from 'react';
import PropTypes from 'prop-types';

const Button = React.forwardRef(({ children, ...props }, ref) => (
	<button type='button' tabIndex='0' ref={ref} {...props}>
		{children}
	</button>
));

Button.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired
};

export default Button;
