import * as React from 'react';

import Typography from './index';
import Preview from '../../Blocks/Storybook/Preview';

export const Default = () => <Preview content={<Typography />} />;

export const Weight = () => <Preview content={<Typography weight='bolder' />} />;

export const Height = () => <Preview content={<Typography height={2} />} />;

export const Size = () => <Preview content={<Typography size='4rem' />} />;

export const Text = () => <Preview content={<Typography text='Popular Movies' />} />;

export const TypeHeading = () => <Preview content={<Typography type='h4' />} />;

export const TypeParagraph = () => <Preview content={<Typography type='p' />} />;

export const TypeHref = () => <Preview content={<Typography type='a' text='Custom Href' />} />;

export const Colour = () => <Preview content={<Typography colour='red' />} />;

export const Href = () => (
	<Preview
		content={
			<Typography type='a' href='www.facebook.com' text={<Icon icon='Facebook' size='30' />} />
		}
	/>
);

export const Underline = () => (
	<Preview content={<Typography type='p' href='www.facebook.com' content='Facebook' underline />} />
);

export default {
	component: Typography,
	title: 'Core -> Typography'
};
