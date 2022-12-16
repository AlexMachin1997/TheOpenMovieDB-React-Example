import * as React from 'react';
import PropTypes from 'prop-types';

import { Image, PercentageRating } from '../../../Core';

import generateComponentId from '../../../../utils/generateComponentId';

const Poster = ({ title, releaseDate, rating, image, renderLink }) => {
	// Stores the main content for the Poster, the renderLink wraps around the entire element
	const mainContent = (
		<>
			<Image
				width='100%'
				height='265px'
				alt={title}
				src={image}
				className='aspect-square rounded-t-2xl'
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
					<h3 className='text-base font-bold text-black'>{title}</h3>
					<p className='text-base font-light text-slate-400'>{releaseDate}</p>
				</div>
			</div>
		</>
	);

	return (
		<>
			{/* Either use the renderLink render prop or it defaults to just a span element */}
			{typeof renderLink === 'function' ? (
				renderLink({ content: mainContent })
			) : (
				<span className='group relative'>{mainContent}</span>
			)}
		</>
	);
};

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
