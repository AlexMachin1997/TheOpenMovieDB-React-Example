import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ImageComponent from './Image';

/*

Lazy loading notes:

For native lazy loading to work correctly you need to specify an inline height and width,
If no default height or width is provided a console warning will appear.

For more information about native lazy loading refer to the below resource

Resource: https://web.dev/native-lazy-loading/


*/

const Image = ({ width, height, borderRadius, border, alt, label, src }) => {
	const [error, setError] = useState(false);

	return (
		<ImageComponent
			imageWidth={width}
			imageHeight={height}
			borderRadius={borderRadius}
			border={border}
			width={width}
			height={height}
			loading="lazy"
			alt={error === true ? 'Failed to load the image, this is a fallback' : alt}
			onError={() => setError(true)}
			decoding="async"
			aria-label={error === true ? 'An image in the error state' : label}
			src={
				error === true ? `https://via.placeholder.com/${width}x${height}?text=Default+Image` : src
			}
		/>
	);
};

Image.defaultProps = {
	width: '200px',
	height: '200px',
	borderRadius: '8px',
	border: 'transparent',
	alt: 'Default',
	label: 'Default',
	src: 'https://via.placeholder.com/200x200?text=Default+Image'
};

Image.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
	borderRadius: PropTypes.string,
	border: PropTypes.string,
	alt: PropTypes.string,
	label: PropTypes.string,
	src: PropTypes.string
};

export default Image;
