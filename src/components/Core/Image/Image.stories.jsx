import Image from './Image';

export const Default = {};

export const Width = {
	args: {
		width: '100px'
	}
};

export const Height = {
	args: {
		height: '300px'
	}
};

export const Alt = {
	args: {
		alt: 'Awesome alt label for the image'
	}
};

export const Src = {
	args: {
		src: 'https://image.tmdb.org/t/p/w1280/h4VB6m0RwcicVEZvzftYZyKXs6K.jpg'
	}
};

export const ErroredImage = {
	args: {
		src: 'invalid_path_to_image'
	}
};

export default {
	component: Image,
	title: 'Design System/Core/Image'
};
