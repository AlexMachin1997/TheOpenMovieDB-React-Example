import * as React from 'react';
import PropTypes from 'prop-types';

import hexToRgba from '../../../../../utils/formatters/hexToRGBA';

import { Button } from '../../../../Core';

const Collection = ({ title, subtitle, image, onClick, onKeyDown }) => {
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
			className='flex flex-col items-start justify-center bg-cover bg-center p-4'
		>
			<h2 className='text-xl font-bold text-white'>Part of the {title} Collection</h2>

			<p className='text-base font-normal text-white'>{subtitle}</p>

			<Button
				className='mt-4 cursor-pointer rounded-2xl bg-tertiary p-2 text-xs font-bold uppercase text-white	'
				aria-label={`View collection button for ${title}`}
				id={`View collection button for ${title}`}
				onClick={(event) => {
					console.log('Click');
					if (onClick) {
						onClick(event);
					}
				}}
				onKeyDown={onKeyDown}
			>
				View the Collection
			</Button>
		</div>
	);
};

Collection.defaultProps = {
	title: 'The Avengers',
	subtitle: 'Includes The Avengers, Avengers: Age of Ultron, Avengers: Infinity War',
	image: 'https://image.tmdb.org/t/p/original/zuW6fOiusv4X9nnW3paHGfXcSll.jpg',
	onClick: null,
	onKeyDown: null
};

Collection.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	image: PropTypes.string,
	onClick: PropTypes.func,
	onKeyDown: PropTypes.func
};

export default Collection;
