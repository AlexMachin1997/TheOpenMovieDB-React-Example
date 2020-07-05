import React from 'react';
import PropTypes from 'prop-types';

import Heading from '../../../Heading';
import replaceSpacesWith from '../../../../utils/formatters/replaceSpacesWith';

/*

Accessability notes:

- Heading order:
	The main heading is h2, so the child elements need to be h3 and not h4 or anything beyond that.
	The heading order matters for accessbility reasons, see the below link for more information.

	resource: https://webaim.org/techniques/semanticstructure/

*/

const Section = ({ title, content, display }) => {
	if (display === false) return null;

	let contentElement;

	// If an arrary is provided loop through the elements
	if (Array.isArray(content) === true) {
		contentElement = content.map((data, index) => (
			<div style={{ marginBottom: '1rem' }} key={index}>
				<Heading type='h3' text={data} weight='bold' height={1} size='1.4rem' />
			</div>
		));
	} else {
		contentElement = <Heading type='h3' text={content} weight='bold' height={1} size='1.4rem' />;
	}

	return (
		<div style={{ margin: '1rem 0' }} id={replaceSpacesWith(title, '-')}>
			<Heading type='h2' text={title} weight='bold' height={1} size='1.4rem' />
			<div id='content'>{contentElement}</div>
		</div>
	);
};

Section.defaultProps = {
	title: 'title',
	content: 'Default content',
	display: true,
};

Section.propTypes = {
	title: PropTypes.string,
	content: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object,
		PropTypes.number,
		PropTypes.array,
	]),
	display: PropTypes.bool,
};

export default Section;
