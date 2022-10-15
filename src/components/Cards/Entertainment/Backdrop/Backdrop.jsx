import * as React from 'react';
import PropTypes from 'prop-types';

import { Image, PercentageRating } from '../../../Core';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';
import generateComponentId from '../../../../utils/formatters/generateComponentId';

const Backdrop = ({ title, releaseDate, rating, image, onClick, onKeyDown }) => (
	<div
		id={generateComponentId(title, 'backdrop-card-container')}
		onClick={(event) => {
			if (onClick) {
				onClick(event);
			}
		}}
		role='button'
		tabIndex={0}
		onKeyDown={(event) => {
			if (onKeyDown) {
				onKeyDown(event);
			}
		}}
		className='m-4 cursor-pointer rounded-lg bg-white shadow-xl shadow-gray-200'
	>
		<Image
			width='100%'
			height='250px'
			alt={replacesSpacesWith(title, '-')}
			src={image}
			className='aspect-video	'
		/>
		<div id={generateComponentId(title, 'backdrop-card-content')} className='flex items-center'>
			<div id={generateComponentId(title, 'backdrop-card-rating')} className='p-1'>
				<PercentageRating percentage={rating} size={50} strokeWidth={5} textSize='0.9rem' />
			</div>
			<div
				id={generateComponentId(title, 'backdrop-card-information')}
				className='flex items-center'
			>
				<h1 className='mr-2 text-base font-bold text-black'>{title}</h1>
				<p className='text-base font-light text-black'>{releaseDate}</p>
			</div>
		</div>
	</div>
);

Backdrop.defaultProps = {
	title: 'Dark',
	releaseDate: 'September 17th, 2020',
	rating: 50,
	image: 'https://image.tmdb.org/t/p/original/3lBDg3i6nn5R2NKFCJ6oKyUo2j5.jpg',
	onClick: null,
	onKeyDown: null
};

Backdrop.propTypes = {
	title: PropTypes.string,
	releaseDate: PropTypes.string,
	rating: PropTypes.number,
	image: PropTypes.string,
	onClick: PropTypes.func,
	onKeyDown: PropTypes.func
};

export default Backdrop;
