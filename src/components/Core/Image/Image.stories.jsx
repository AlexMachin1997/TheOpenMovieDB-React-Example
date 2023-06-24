import * as React from 'react';

import Image from './Image';

const Template = (args) => <Image {...args} />;

export const Default = Template.bind({});

export const Width = Template.bind({});
Width.args = {
	width: '100px'
};

export const Height = Template.bind({});
Height.args = {
	height: '300px'
};

export const Alt = Template.bind({});
Alt.args = {
	alt: 'Awesome alt label for the image'
};

export const Src = Template.bind({});
Src.args = {
	src: 'https://image.tmdb.org/t/p/w1280/h4VB6m0RwcicVEZvzftYZyKXs6K.jpg'
};

export const ErroredImage = Template.bind({});
ErroredImage.args = {
	src: 'invalid_path_to_image'
};

export default {
	component: Image,
	title: 'Design System/Core/Image'
};
