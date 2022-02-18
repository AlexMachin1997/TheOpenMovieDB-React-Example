import * as React from 'react';

import Typography from './index';

export const Default = () => <Typography />;

export const Weight = () => <Typography weight='bolder' />;

export const Height = () => <Typography height={2} />;

export const Size = () => <Typography size='4rem' />;

export const Text = () => <Typography text='Popular Movies' />;

export const TypeHeading = () => <Typography type='h4' />;

export const TypeParagraph = () => <Typography type='p' />;

export const TypeHref = () => <Typography type='a' text='Custom Href' />;

export const Colour = () => <Typography colour='red' />;

export const Href = () => <Typography type='a' href='www.facebook.com' text='Facebook' />;

export const Underline = () => (
	<Typography type='p' href='www.facebook.com' content='Facebook' underline />
);

export default {
	component: Typography,
	title: 'Core -> Typography'
};
