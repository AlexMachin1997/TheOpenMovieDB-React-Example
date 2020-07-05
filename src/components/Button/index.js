import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import DefaultButton from './Button';

import replaceSpacesWith from '../../utils/formatters/replaceSpacesWith';

const Button = ({
	transform,
	content,
	background,
	border,
	colour,
	isDisabled,
	hoverbackground,
	borderRadius,
	ariaLabel,
	id,
	onClick,
	type,
}) => (
	<DefaultButton
		transform={transform}
		background={background}
		border={border}
		colour={colour}
		disabled={isDisabled}
		hoverbackground={hoverbackground}
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
	transform: 'uppercase',
	content: 'Default',
	background: 'transparent',
	hoverbackground: '',
	border: '',
	colour: '',
	isDisabled: false,
	borderRadius: '0 0 0 0',
	ariaLabel: 'label',
	id: `button ${shortid.generate()}`,
	onClick: () => false,
	type: 'button',
};

Button.propTypes = {
	transform: PropTypes.oneOf([
		'none',
		'capitalize',
		'uppercase',
		'lowercase',
		'initial',
		'inherit',
	]),
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	background: PropTypes.string,
	hoverbackground: PropTypes.string,
	border: PropTypes.string,
	colour: PropTypes.string,
	isDisabled: PropTypes.bool,
	borderRadius: PropTypes.string,
	ariaLabel: PropTypes.string,
	id: PropTypes.string,
	onClick: PropTypes.func,
	type: PropTypes.oneOf(['button', 'reset', 'submit']),
};

export default Button;
