import * as React from 'react';

import { PercentageRating } from '../../../Core';

import generateComponentId from '../../../../utils/generateComponentId';

import Card from '../../Card';
import { PosterCardProps } from '../../types';

const Poster = ({
	title = '',
	releaseDate = '',
	rating = 0,
	image = '',
	renderLink = null
}: PosterCardProps) => (
	<Card title={title} image={image} renderLink={renderLink}>
		{/* Rating for the Poster card */}
		<div
			className='absolute left-[8px] top-[-29px]'
			id={generateComponentId(title, 'poster-card-rating')}
		>
			<PercentageRating percentage={rating} size={45} strokeWidth={2.5} textClass='text-sm' />
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

export default Poster;
