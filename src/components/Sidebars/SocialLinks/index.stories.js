import * as React from 'react';

import SocialLinks from './index';

export const Default = () => <SocialLinks />;

export const Facebook = () => <SocialLinks facebookLink='https://www.facebook.com' />;

export const Twitter = () => <SocialLinks twitterLink='https://www.twitter.com' />;

export const Instagram = () => <SocialLinks instagramLink='https://www.instagram.com' />;

export const Homepage = () => <SocialLinks homepageLink='https://www.alexmachin.co.uk' />;

export const FullExample = () => (
	<SocialLinks
		facebookLink='https://www.facebook.com'
		twitterLink='https://www.twitter.com'
		instagramLink='https://www.instagram.com'
		homepageLink='https://www.alexmachin.co.uk'
	/>
);

export default {
	component: SocialLinks,
	title: 'Sidebars -> SocialLinks'
};
