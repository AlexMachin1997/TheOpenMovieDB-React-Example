import * as React from 'react';
import PropTypes from 'prop-types';

import { Image, PercentageRating } from '../../../Core';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';
import generateComponentId from '../../../../utils/formatters/generateComponentId';

const Poster = ({ title, releaseDate, rating, image, onClick, onKeyDown }) => (
	<div
		className='shadow-card m-4 cursor-pointer rounded-2xl bg-white shadow-xl shadow-gray-200'
		onClick={(event) => {
			if (onClick) {
				onClick(event);
			}
		}}
		id={generateComponentId(title, 'poster-card-container')}
		role='button'
		tabIndex={0}
		onKeyDown={(event) => {
			if (onKeyDown) {
				onKeyDown(event);
			}
		}}
	>
		<Image
			width='100%'
			height='300px'
			alt={replacesSpacesWith(title, '-')}
			src={image}
			className='max-w-[200px] rounded-t-2xl'
		/>

		<div
			className='relative flex flex-col p-4'
			id={generateComponentId(title, 'poster-card-content')}
		>
			<div
				className='absolute top-[-29px] left-[8px]'
				id={generateComponentId(title, 'poster-card-rating')}
			>
				<PercentageRating percentage={rating} size={40} strokeWidth={2.5} textSize='0.7rem' />
			</div>
			<div id={generateComponentId(title, 'poster-card-meta')}>
				<h3 className='weight text-base font-bold text-black'>{title}</h3>
				<p className='text-base font-light text-slate-400'>{releaseDate}</p>
			</div>
		</div>
	</div>
);

Poster.defaultProps = {
	title: 'Dark',
	releaseDate: 'Dec 01, 2017',
	rating: 50,
	image: 'https://image.tmdb.org/t/p/original/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg',
	onClick: null,
	onKeyDown: null
};

Poster.propTypes = {
	title: PropTypes.string,
	releaseDate: PropTypes.string,
	rating: PropTypes.number,
	image: PropTypes.string,
	onClick: PropTypes.func,
	onKeyDown: PropTypes.func
};

export default Poster;
