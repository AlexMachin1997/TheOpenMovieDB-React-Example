import React, { useState } from 'react';
import PropTypes from 'prop-types';

import replaceSpacesWith from '../../../utils/formatters/replaceSpacesWith';

/*

Lazy loading notes:

For native lazy loading to work correctly you need to specify an inline height and width,
If no default height or width is provided a console warning will appear.

For more information about native lazy loading refer to the below resource

Resource: https://web.dev/native-lazy-loading/


*/

const Image = ({ width, height, alt, label, src, className }) => {
	const [error, setError] = useState(false);

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
			aria-label={
				error === true
					? replaceSpacesWith('An image in the error state', '-')
					: replaceSpacesWith(label, '-')
			}
			src={error === true ? `https://via.placeholder.com/200x200?text=Default+Image` : src}
			className={className}
			title={alt}
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
