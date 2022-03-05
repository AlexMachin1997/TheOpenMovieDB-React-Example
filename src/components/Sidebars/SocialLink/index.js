import * as React from 'react';
import PropTypes from 'prop-types';

// TODO: Remove once this has been renamed with a native heading tag
import Typography from '../../Core/Typography';

import { Container } from './SocialLink';
import replaceSpacesWith from '../../../utils/formatters/replaceSpacesWith';

const SocialLink = ({ content, link, display, newTab, label }) => {
	if (display === false) return null;

	return (
		<Container id={replaceSpacesWith(label, '-')}>
			<Typography type='a' href={link} text={content} newTab={newTab} label={label} />
		</Container>
	);
};

SocialLink.defaultProps = {
	display: true,
	newTab: true,
	content: 'Default link text',
	link: 'https://www.facebook.com/',
	label: 'Facebook Social Link'
};

SocialLink.propTypes = {
	content: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	link: PropTypes.string,
	display: PropTypes.bool,
	newTab: PropTypes.bool,
	label: PropTypes.string
};

export default SocialLink;
