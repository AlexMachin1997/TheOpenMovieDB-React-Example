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
			<PercentageRating
				percentage={rating}
				size={45}
				strokeWidth={2.5}
				textSize='0.7rem'
				textClass='text-sm'
			/>
		</div>

		{/* Title for the Poster card */}
		{typeof renderLink === 'function' ? (
			React.cloneElement(renderLink({ content: title }), {
				className: 'text-base font-bold text-black text-left'
			})
		) : (
			<h3 className='text-left text-base font-bold text-black'>{title}</h3>
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
	title: '',
	releaseDate: '',
	rating: 0,
	image: '',
	renderLink: null
};

export default Poster;
