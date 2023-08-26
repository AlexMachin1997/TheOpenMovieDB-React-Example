import type { Meta, StoryObj } from '@storybook/react';

import Image from './Image';

const meta: Meta<typeof Image> = {
	component: Image,
	title: 'Core/Image'
};

export default meta;

type Story = StoryObj<typeof Image>;

export const Width: Story = {
	args: {
		width: '100px'
	}
};

export const Height: Story = {
	args: {
		height: '300px'
	}
};

export const Alt: Story = {
	args: {
		alt: 'Awesome alt label for the image'
	}
};

export const Src: Story = {
	args: {
		src: 'https://image.tmdb.org/t/p/w1280/h4VB6m0RwcicVEZvzftYZyKXs6K.jpg'
	}
};

export const ErroredImage: Story = {
	args: {
		src: 'invalid_path_to_image'
	}
};
