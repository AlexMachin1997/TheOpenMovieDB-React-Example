import React from 'react';

import Link from './index';
import { StoryPreview } from './Link';

export const DefaultLink = () => (
	<StoryPreview>
		<Link />
	</StoryPreview>
);

export const CustomLink = () => (
	<StoryPreview>
		<Link href="https://www.facebook.com/" />
	</StoryPreview>
);
export const CustomContentText = () => (
	<StoryPreview>
		<Link content="Visit Facebook" />
	</StoryPreview>
);

export const CustomContentJSX = () => (
	<StoryPreview>
		<Link content={<p style={{ margin: 0, fontSize: '1rem' }}>Custom JSX</p>} colour="red" />
	</StoryPreview>
);

export const CustomNewTab = () => (
	<StoryPreview>
		<Link href="https://www.facebook.com/" newTab label="Facebook Social Link" />
	</StoryPreview>
);

export const CustomLabel = () => (
	<StoryPreview>
		<Link href="https://www.facebook.com/" newTab label="Facebook Social Link" />
	</StoryPreview>
);

export default {
	title: 'Link',
	component: Link
};
