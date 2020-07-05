import React from 'react';
import PropTypes from 'prop-types';

import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from './Headings';

const Heading = ({ type, weight, height, size, text, colour }) => {
	switch (type) {
		case 'h1': {
			return (
				<Heading1 fontWeight={weight} lineHeight={height} fontSize={size} colour={colour}>
					{text}
				</Heading1>
			);
		}
		case 'h2': {
			return (
				<Heading2 fontWeight={weight} lineHeight={height} fontSize={size} colour={colour}>
					{text}
				</Heading2>
			);
		}
		case 'h3': {
			return (
				<Heading3 fontWeight={weight} lineHeight={height} fontSize={size} colour={colour}>
					{text}
				</Heading3>
			);
		}
		case 'h4': {
			return (
				<Heading4 fontWeight={weight} lineHeight={height} fontSize={size} colour={colour}>
					{text}
				</Heading4>
			);
		}
		case 'h5': {
			return (
				<Heading5 fontWeight={weight} lineHeight={height} fontSize={size} colour={colour}>
					{text}
				</Heading5>
			);
		}
		case 'h6': {
			return (
				<Heading6 fontWeight={weight} lineHeight={height} fontSize={size} colour={colour}>
					{text}
				</Heading6>
			);
		}
		default: {
			return (
				<Heading1 fontWeight={weight} lineHeight={height} fontSize={size} colour={colour}>
					{text}
				</Heading1>
			);
		}
	}
};

Heading.defaultProps = {
	type: 'h1',
	weight: '500',
	height: 1,
	text: 'Default text',
	size: '1rem',
	colour: '',
};

Heading.propTypes = {
	weight: PropTypes.string,
	height: PropTypes.number,
	size: PropTypes.string,
	text: PropTypes.string,
	type: PropTypes.string,
	colour: PropTypes.string,
};

export default Heading;
