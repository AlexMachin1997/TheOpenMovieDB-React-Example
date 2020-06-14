import React from 'react';
import propTypes from 'prop-types';

import { Facebook, Twitter, Instagram, ExternalLink } from 'styled-icons/entypo-social';
import Tooltip from '../Tooltip';
import SocialLink from './SocialLink';

const SocialLinks = ({ facebookLink, twitterLink, instagramLink, homepageLink, name }) => {
	const iconSize = '30';

	return (
		<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
			<SocialLink
				content={<Tooltip content={<Facebook size={iconSize} />} tooltipText="Visit Facebook" />}
				link={facebookLink}
				display={facebookLink.length !== 0}
				label={name.length !== 0 ? `${name} facebook social link` : 'Facebook social link'}
			/>

			<SocialLink
				content={<Tooltip content={<Twitter size={iconSize} />} tooltipText="Visit Twitter" />}
				link={twitterLink}
				display={twitterLink.length !== 0}
				label={name.length !== 0 ? `${name} twitter social link` : 'Twitter social link'}
			/>

			<SocialLink
				content={<Tooltip content={<Instagram size={iconSize} />} tooltipText="Visit Instagram" />}
				link={instagramLink}
				display={instagramLink.length !== 0}
				label={name.length !== 0 ? `${name} instagram social link` : 'Instagram social link'}
			/>

			<SocialLink
				content={
					<Tooltip content={<ExternalLink size={iconSize} />} tooltipText="Visit Homepage" />
				}
				link={homepageLink}
				display={homepageLink.length !== 0}
				label={name.length !== 0 ? `${name} homepage` : 'Homepage link'}
			/>
		</div>
	);
};

SocialLinks.defaultProps = {
	facebookLink: '',
	twitterLink: '',
	instagramLink: '',
	homepageLink: '',
	name: ''
};

SocialLinks.propTypes = {
	facebookLink: propTypes.string,
	twitterLink: propTypes.string,
	instagramLink: propTypes.string,
	homepageLink: propTypes.string,
	name: propTypes.string
};

export default SocialLinks;
