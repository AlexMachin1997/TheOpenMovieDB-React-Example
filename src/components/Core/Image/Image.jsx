import * as React from 'react';

import PropTypes from 'prop-types';

const Image = ({ width, height, alt, label, src, className, ...props }) => {
	const [error, setError] = React.useState(false);

	return (
		<img
			style={{
				width,
				height
			}}
			loading='lazy'
			alt={error === true ? 'Failed to load the image, this is a fallback' : alt}
			onError={() => setError(true)}
			decoding='async'
			aria-label={error === true ? 'An image in the error state' : label}
			src={error === true ? `https://via.placeholder.com/200x200?text=Default+Image` : src}
			className={className}
			title={alt}
			{...props}
		/>
	);
};

Image.defaultProps = {
	width: '200px',
	height: '200px',
	alt: 'Default',
	label: 'Default',
	src: 'https://via.placeholder.com/200x200?text=Default+Image',
	className: ''
};

Image.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
	className: PropTypes.string,
	alt: PropTypes.string,
	label: PropTypes.string,
	src: PropTypes.string
};

export default Image;
