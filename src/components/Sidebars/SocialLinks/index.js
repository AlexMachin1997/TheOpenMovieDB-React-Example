import * as React from 'react';
import propTypes from 'prop-types';

import Tooltip from '../../Core/Tooltip';
import SocialLink from '../SocialLink';
import Icon from '../../Core/Icon/Icon';

const SocialLinks = ({ facebookLink, twitterLink, instagramLink, homepageLink, name }) => (
	<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
		<SocialLink
			content={
				<Tooltip
					content={<Icon className='fa-brands fa-facebook fa-lg	' />}
					tooltipText='Visit Facebook'
				/>
			}
			link={facebookLink}
			display={facebookLink.length !== 0}
			label={name.length !== 0 ? `${name} facebook social link` : 'Facebook social link'}
		/>

		<SocialLink
			content={
				<Tooltip
					content={<Icon className='fa-brands fa-twitter fa-lg	' />}
					tooltipText='Visit Twitter'
				/>
			}
			link={twitterLink}
			display={twitterLink.length !== 0}
			label={name.length !== 0 ? `${name} twitter social link` : 'Twitter social link'}
		/>

		<SocialLink
			content={
				<Tooltip
					content={<Icon className='fa-brands fa-instagram fa-lg	' />}
					tooltipText='Visit Instagram'
				/>
			}
			link={instagramLink}
			display={instagramLink.length !== 0}
			label={name.length !== 0 ? `${name} instagram social link` : 'Instagram social link'}
		/>

		<SocialLink
			content={
				<Tooltip
					content={<Icon className='fa-solid fa-arrow-up-right-from-square' />}
					tooltipText='Visit Homepage'
				/>
			}
			link={homepageLink}
			display={homepageLink.length !== 0}
			label={name.length !== 0 ? `${name} homepage` : 'Homepage link'}
		/>
	</div>
);

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
