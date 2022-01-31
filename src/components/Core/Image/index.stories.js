import * as React from 'react';

import Image from './index';

export const Default = () => <Image />;

export const Width = () => <Image width='100px' />;

export const Height = () => <Image height='300px' />;

export const Border = () => <Image borderRadius='15px' />;

export const Alt = () => <Image src='src' alt='Breaking Bad Poster' />;

export const Src = () => (
	<Image src='https://image.tmdb.org/t/p/w1280/h4VB6m0RwcicVEZvzftYZyKXs6K.jpg' />
);

export const onErrorExample = () => <Image src='invalid_path' />;

export default {
	component: Image,
	title: 'Core -> Image'
};
