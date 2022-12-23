import * as React from 'react';
import PropTypes from 'prop-types';

import { PercentageRating } from '../../../Core';

import generateComponentId from '../../../../utils/generateComponentId';

import Card from '../../Card';

const Poster = ({ title, releaseDate, rating, image, renderLink }) => (
	<Card title={title} image={image} renderLink={renderLink}>
		{/* Rating for the Poster card */}
		<div
			className='absolute top-[-29px] left-[8px]'
			id={generateComponentId(title, 'poster-card-rating')}
		>
			<PercentageRating percentage={rating} size={40} strokeWidth={2.5} textSize='0.7rem' />
		</div>

		{/* Title for the Poster card */}
		{typeof renderLink === 'function' ? (
			React.cloneElement(
				renderLink({ content: title, className: 'text-base font-bold text-black' })
			)
		) : (
			<h3 className='text-base font-bold text-black'>{title}</h3>
		)}

		{/* Release date for the Poster card */}
		<p className='text-base font-light text-slate-400'>{releaseDate}</p>
	</Card>
);

Poster.propTypes = {
	title: PropTypes.string,
	releaseDate: PropTypes.string,
	rating: PropTypes.number,
	image: PropTypes.string,
	renderLink: PropTypes.func
};

Poster.defaultProps = {
	title: 'Dark',
	releaseDate: 'Dec 01, 2017',
	rating: 50,
	image: 'https://image.tmdb.org/t/p/original/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg',
	renderLink: null
};

export default Poster;
