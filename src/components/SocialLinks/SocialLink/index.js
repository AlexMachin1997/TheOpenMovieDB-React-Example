import React from 'react';
import PropTypes from 'prop-types';

import Link from '../../Link';
import { Container } from './SocialLink';
import replaceSpacesWith from '../../../utils/formatters/replaceSpacesWith';

const SocialLink = ({ content, link, display, newTab, label }) => {
	if (display === false) return null;

	return (
		<Container id={replaceSpacesWith(label, '-')}>
			<Link href={link} content={content} newTab={newTab} label={label} />
		</Container>
	);
};

SocialLink.defaultProps = {
	display: true,
	newTab: true,
	content: 'Default link text',
	link: 'https://www.facebook.com/',
	label: 'Facebook Social Link" '
};

SocialLink.propTypes = {
	content: PropTypes.object,
	link: PropTypes.string,
	display: PropTypes.bool,
	newTab: PropTypes.bool,
	label: PropTypes.string
};

export default SocialLink;
