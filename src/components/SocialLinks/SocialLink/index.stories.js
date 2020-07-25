import React from 'react';

import SocialLink from './index';

export const Default = () => <SocialLink />;

export const CustomContentText = () => <SocialLink content='Visit the facebook homepage' />;

export const CustomContentJSX = () => (
	<SocialLink content={<p style={{ color: 'red', margin: 0, fontSize: '1rem' }}>Custom JSX</p>} />
);

export const CustomLink = () => <SocialLink link='https://www.alexmachin.co.uk' />;

export const CustomDisplay = () => <SocialLink display={false} />;

export const CustomNewTab = () => <SocialLink link='https://www.alexmachin.co.uk' newTab={false} />;

export default {
	title: 'Entertainment Sidebar Social Link',
	component: SocialLink
};
