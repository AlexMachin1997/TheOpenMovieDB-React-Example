import React from 'react';

import Paragraph from './index';
import { StoryPreview } from './Paragraph';

export const DefaultParagraph = () => (
	<StoryPreview>
		<Paragraph />
	</StoryPreview>
);

export const CustomHeight = () => (
	<StoryPreview>
		<Paragraph height={2} />
	</StoryPreview>
);

export const CustomFontSize = () => (
	<StoryPreview>
		<Paragraph size="4rem" />
	</StoryPreview>
);

export const CustomText = () => (
	<StoryPreview>
		<Paragraph text="Popular Shows" />
	</StoryPreview>
);

export const CustomColour = () => (
	<StoryPreview>
		<Paragraph colour="red" />
	</StoryPreview>
);

export default {
	component: Paragraph,
	title: 'Paragraphs'
};
