import * as React from 'react';
import PropTypes from 'prop-types';

// TODO: Remove once this has been renamed with a native heading tag
import Typography from '../../../Core/Typography';

import replaceSpacesWith from '../../../../utils/formatters/replaceSpacesWith';

const Section = ({ title, content, display }) => {
	if (display === false) return null;

	let contentElement;

	// If an array is provided loop through the elements
	if (Array.isArray(content) === true) {
		contentElement = content.map((data, index) => (
			<div style={{ marginBottom: '1rem' }} key={index}>
				<Typography type='h3' text={data} weight='lighter' height={1} size='1.2rem' />
			</div>
		));
	} else {
		contentElement = (
			<Typography type='h3' text={content} weight='lighter' height={1} size='1rem' />
		);
	}

	return (
		<div style={{ margin: '1rem 0' }} id={replaceSpacesWith(title, '-')}>
			<Typography type='h2' text={title} weight='bold' height={1} size='1.2rem' />
			<div id='content'>{contentElement}</div>
		</div>
	);
};

Section.defaultProps = {
	title: 'title',
	content: 'Default content',
	display: true
};

Section.propTypes = {
	title: PropTypes.string,
	content: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object,
		PropTypes.number,
		PropTypes.array
	]),
	display: PropTypes.bool
};

export default Section;
