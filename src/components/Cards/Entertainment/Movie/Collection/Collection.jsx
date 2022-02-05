import * as React from 'react';
import PropTypes from 'prop-types';

import hexToRgba from '../../../../../utils/formatters/hexToRGBA';

const Collection = ({ title, subtitle, image, onClick }) => {
	const imageBackground = React.useMemo(() => {
		// Get the primary css variable value, it has whitespace so remove the white space
		const primaryColour = getComputedStyle(document.body)
			.getPropertyValue('--primary')
			.replace(/\s/g, '');

		// Generate the left gradient colour
		const leftGradient = hexToRgba(`${primaryColour}`, 1);

		// Generate the right gradient colour
		const rightGradient = hexToRgba(`${primaryColour}`, 0.6);

		// Return the generated gradient with the background image url
		return `linear-gradient(to right, ${leftGradient} 0%, ${rightGradient} 100%), url(${image})`;
	}, [image]);

	return (
		<div
			style={{
				height: '260px',
				backgroundImage: imageBackground
			}}
			className='bg-cover bg-center flex justify-center items-start flex-col p-4'
		>
			<h2 className='text-xl text-white font-bold'>Part of the {title} Collection</h2>

			<p className='text-white font-normal text-base '>{subtitle}</p>

			<button
				className='uppercase bg-tertiary text-white rounded-2xl p-2 cursor-pointer font-bold text-xs mt-4	'
				type='button'
				aria-label={`View collection button for ${title}`}
				id={`View collection button for ${title}`}
				onClick={(event) => {
					if (onClick) {
						onClick(event);
					}
				}}
			>
				View the Collection
			</button>
		</div>
	);
};

Collection.defaultProps = {
	title: 'The Avengers',
	subtitle: 'Includes The Avengers, Avengers: Age of Ultron, Avengers: Infinity War',
	image: 'https://image.tmdb.org/t/p/original/zuW6fOiusv4X9nnW3paHGfXcSll.jpg',
	onClick: null
};

Collection.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	image: PropTypes.string,
	onClick: PropTypes.func
};

export default Collection;
