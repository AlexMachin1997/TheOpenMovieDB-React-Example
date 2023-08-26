import * as React from 'react';

interface ImageProps extends React.ComponentPropsWithoutRef<'img'> {
	label: string;
}

const Image = ({
	width = '200px',
	height = '200px',
	alt = '',
	label = '',
	src = '',
	className = '',
	loading = 'lazy',
	...props
}: ImageProps) => {
	const [error, setError] = React.useState(false);

	return (
		<img
			style={{
				width: typeof width === 'string' ? width : `${width}px`,
				height: typeof height === 'string' ? height : `${height}px`
			}}
			loading={loading}
			alt={error === true ? 'Failed to load the image, this is a fallback' : alt}
			onError={() => setError(true)}
			decoding='async'
			aria-label={error === true ? 'An image in the error state' : label}
			src={error === true ? `https://via.placeholder.com/200x200?text=Default+Image` : src}
			className={className}
			title={alt}
			width={width}
			height={height}
			{...props}
		/>
	);
};

export default Image;
