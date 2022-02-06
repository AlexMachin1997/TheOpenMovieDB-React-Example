import * as React from 'react';
import PropTypes from 'prop-types';

import Image from '../../../Core/Image';
import Rating from '../../../Ratings/Stars';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';

const Overview = ({ image, title, overview, releaseDate, onClick, rating, onKeyDown }) => (
	<div
		className='flex rounded-2xl'
		onClick={() => {
			if (onClick) {
				onClick();
			}
		}}
		role='button'
		tabIndex={0}
		onKeyDown={(event) => {
			if (onKeyDown) {
				onKeyDown(event);
			}
		}}
	>
		<Image
			width='150px'
			height='100%'
			alt={replacesSpacesWith(title, '-')}
			src={image}
			label={`${title}-poster`}
			className='rounded-2xl max-w-none'
		/>

		<div className='flex justify-center flex-col p-4'>
			<div className='mb-2'>
				<h2 className='text-base text-black font-bold'>{title}</h2>
			</div>

			<div className='mb-2'>
				<Rating rating={rating} />
			</div>

			<div className='mb-2'>
				<p className='text-base font-light text-neutral-400'>{releaseDate}</p>
			</div>

			<p className='text-base font-light text-neutral-400 line-clamp-3'>{overview}</p>
		</div>
	</div>
);

Overview.defaultProps = {
	image: 'https://image.tmdb.org/t/p/original/eFWtQwYetPum9RvCmqkUk2aiBIi.jpg',
	title: 'Westworld',
	overview: 'Drama, Scifi, onClick',
	releaseDate: 'October 2nd 2016',
	onClick: null,
	onKeyDown: null,
	rating: 35
};

Overview.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string,
	overview: PropTypes.string,
	releaseDate: PropTypes.string,
	onClick: PropTypes.func,
	rating: PropTypes.number,
	onKeyDown: PropTypes.func
};

export default Overview;
