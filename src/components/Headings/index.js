import React from 'react';
import PropTypes from 'prop-types';

import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from './Headings';

const Heading = ({ type, weight, height, size, text }) => {
	switch (type) {
		case 'h1': {
			return (
				<Heading1 fontWeight={weight} lineHeight={height} fontSize={size}>
					{text}
				</Heading1>
			);
		}
		case 'h2': {
			return (
				<Heading2 fontWeight={weight} lineHeight={height} fontSize={size}>
					{text}
				</Heading2>
			);
		}
		case 'h3': {
			return (
				<Heading3 fontWeight={weight} lineHeight={height} fontSize={size}>
					{text}
				</Heading3>
			);
		}
		case 'h4': {
			return (
				<Heading4 fontWeight={weight} lineHeight={height} fontSize={size}>
					{text}
				</Heading4>
			);
		}
		case 'h5': {
			return (
				<Heading5 fontWeight={weight} lineHeight={height} fontSize={size}>
					{text}
				</Heading5>
			);
		}
		case 'h6': {
			return (
				<Heading6 fontWeight={weight} lineHeight={height} fontSize={size}>
					{text}
				</Heading6>
			);
		}
		default: {
			return (
				<Heading1 fontWeight={weight} lineHeight={height} fontSize={size}>
					{text}
				</Heading1>
			);
		}
	}
};

Heading.defaultProps = {
	weight: '500',
	height: 1,
	text: 'Default text',
	size: '1rem'
};

Heading.propTypes = {
	weight: PropTypes.string,
	height: PropTypes.number,
	size: PropTypes.string
};

export default Heading;
