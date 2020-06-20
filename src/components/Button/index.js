import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import DefaultButton from './Button';

import replaceSpacesWith from '../../utils/formatters/replaceSpacesWith';

const Button = ({
	textTransform,
	content,
	backgroundColour,
	border,
	colour,
	isDisabled,
	hoverBackgroundColour,
	borderRadius,
	ariaLabel,
	id,
	onClick,
	type
}) => (
	<DefaultButton
		textTransform={textTransform}
		backgroundColour={backgroundColour}
		border={border}
		colour={colour}
		disabled={isDisabled}
		hoverBackgroundColour={hoverBackgroundColour}
		borderRadius={borderRadius}
		aria-label={replaceSpacesWith(ariaLabel, '-').toLowerCase()}
		id={replaceSpacesWith(id, '-').toLowerCase()}
		onClick={onClick}
		type={type}
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
	colour: 'black',
	isDisabled: false,
	borderRadius: '0 0 0 0',
	ariaLabel: 'label',
	id: `button ${shortid.generate()}`,
	onClick: () => false,
	type: 'button'
};

Button.propTypes = {
	textTransform: PropTypes.oneOf([
		'none',
		'capitalize',
		'uppercase',
		'lowercase',
		'initial',
		'inherit'
	]),
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	backgroundColour: PropTypes.string,
	hoverBackgroundColour: PropTypes.string,
	border: PropTypes.string,
	colour: PropTypes.string,
	isDisabled: PropTypes.bool,
	borderRadius: PropTypes.string,
	ariaLabel: PropTypes.string,
	id: PropTypes.string,
	onClick: PropTypes.func,
	type: PropTypes.oneOf(['button', 'reset', 'submit'])
};

export default Button;
