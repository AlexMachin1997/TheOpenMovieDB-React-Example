import * as React from 'react';
import PropTypes from 'prop-types';

import Image from '../../../Core/Image';
import Rating from '../../../Ratings/Percentage';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';
import generateComponentId from '../../../../utils/formatters/generateComponentId';

const Poster = ({ title, releaseDate, rating, image, onClick, onKeyDown }) => (
	<div
		className='rounded-2xl bg-white m-4 cursor-pointer shadow-card'
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
			className='rounded-t-2xl	'
		/>

		<div
			className='relative p-4 flex flex-col'
			id={generateComponentId(title, 'poster-card-content')}
		>
			<div
				className='absolute top-[-29px] left-[8px]'
				id={generateComponentId(title, 'poster-card-rating')}
			>
				<Rating percentage={rating} size={40} strokeWidth={2.5} textSize='0.7rem' />
			</div>
			<div id={generateComponentId(title, 'poster-card-meta')}>
				<h3 className='text-base weight font-bold text-black'>{title}</h3>
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
