import React from 'react';
import PropTypes from 'prop-types';

import Typography from '../../../Core/Typography';
import { Container } from './Section';
import replaceSpacesWith from '../../../../utils/formatters/replaceSpacesWith';

const Section = ({ content, title, display }) => {
	if (display === false) return null;

	return (
		<Container id={replaceSpacesWith(title, '-')}>
			<Typography type='h3' size='0.8rem' weight='bolder' text={title} />
			<div>{content}</div>
		</Container>
	);
};

Section.defaultProps = {
	display: true,
	content: 'Example content',
	title: 'title'
};

Section.propTypes = {
	content: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	title: PropTypes.string,
	display: PropTypes.bool
};

export default Section;
