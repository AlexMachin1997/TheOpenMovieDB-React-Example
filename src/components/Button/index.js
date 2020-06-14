import React from 'react';
import PropTypes from 'prop-types';

import DefaultButton from './Button';

const Button = ({
	textTransform,
	content,
	backgroundColour,
	border,
	textColour,
	isDisabled,
	hoverBackgroundColour,
	borderRadius
}) => (
	<DefaultButton
		textTransform={textTransform}
		backgroundColour={backgroundColour}
		border={border}
		textColour={textColour}
		disabled={isDisabled}
		hoverBackgroundColour={hoverBackgroundColour}
		borderRadius={borderRadius}
	>
		{content}
	</DefaultButton>
);

Button.defaultProps = {
	textTransform: 'uppercase',
	content: 'Default',
	backgroundColour: 'transparent',
	hoverBackgroundColour: '',
	border: '',
	textColour: 'black',
	isDisabled: false,
	borderRadius: '0 0 0 0'
};

Button.propTypes = {
	textTransform: PropTypes.string,
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	backgroundColour: PropTypes.string,
	hoverBackgroundColour: PropTypes.string,
	border: PropTypes.string,
	textColour: PropTypes.string,
	isDisabled: PropTypes.bool,
	borderRadius: PropTypes.string
};

export default Button;
