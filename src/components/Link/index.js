import React from 'react';
import PropTypes from 'prop-types';

import Link from './Link';

const LinkComponent = ({ href, newTab, content, colour, label }) => (
	<Link
		href={href}
		target={newTab === true ? '_blank' : '_self'}
		textColour={colour}
		aria-label={label}
	>
		{content}
	</Link>
);

LinkComponent.defaultProps = {
	newTab: true,
	content: 'Default link',
	colour: '',
	label: 'Default',
	href: 'https://www.google.com/'
};

LinkComponent.propTypes = {
	href: PropTypes.string,
	newTab: PropTypes.bool,
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	label: PropTypes.string,
	colour: PropTypes.string
};

export default LinkComponent;
