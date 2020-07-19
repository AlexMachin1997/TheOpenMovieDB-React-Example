import React from 'react';

import Link from './index';
import Preview from '../Blocks/Storybook/Preview';

export const DefaultLink = () => <Preview content={<Link />} />;

export const CustomLink = () => <Preview content={<Link href='https://www.facebook.com/' />} />;

export const CustomContentText = () => <Preview content={<Link content='Visit Facebook' />} />;

export const CustomContentJSX = () => (
	<Preview
		content={
			<Link content={<p style={{ margin: 0, fontSize: '1rem' }}>Custom JSX</p>} colour='red' />
		}
	/>
);

export const CustomNewTab = () => (
	<Preview
		content={<Link href='https://www.facebook.com/' newTab label='Facebook Social Link' />}
	/>
);

export const CustomLabel = () => (
	<Preview
		content={<Link href='https://www.facebook.com/' newTab label='Facebook Social Link' />}
	/>
);

export default {
	title: 'Link',
	component: Link,
};
