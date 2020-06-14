import React from 'react';

import Image from './index';

export const DefaultImage = () => <Image />;

export const CustomWidth = () => <Image width="100px" />;

export const CustomHeight = () => <Image height="300px" />;

export const CustomBorder = () => <Image borderRadius="15px" />;

export const CustomAlt = () => <Image src="src" alt="Breaking Bad Poster" />;

export const CustomSrc = () => (
	<Image src="https://image.tmdb.org/t/p/w1280/h4VB6m0RwcicVEZvzftYZyKXs6K.jpg" />
);

export const onErrorExample = () => <Image src="invalid_path" />;

export default {
	component: Image,
	title: 'Image'
};
