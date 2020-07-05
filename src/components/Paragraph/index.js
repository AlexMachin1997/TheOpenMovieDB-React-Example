import React from 'react';
import PropTypes from 'prop-types';

import ParagraphComponent from './Paragraph';

const Paragraph = ({ weight, height, size, text, colour }) => (
	<ParagraphComponent fontWeight={weight} lineHeight={height} fontSize={size} colour={colour}>
		{text}
	</ParagraphComponent>
);

Paragraph.defaultProps = {
	weight: '500',
	height: 1,
	text: 'Default text',
	size: '1rem',
	colour: '',
};

Paragraph.propTypes = {
	weight: PropTypes.string,
	height: PropTypes.number,
	size: PropTypes.string,
	text: PropTypes.string,
	colour: PropTypes.string,
};

export default Paragraph;
