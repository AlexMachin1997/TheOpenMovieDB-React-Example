import * as React from 'react';

import { PercentageRating } from '~/components/Core';

import generateComponentId from '~/utils/generateComponentId';

import Card from '~/components/Cards/Card';
import { PosterCardProps } from '~/components/Cards/types';

const Poster = ({
	title = '',
	subtitle = '',
	rating = 0,
	image = '',
	renderLink = null
}: PosterCardProps) => (
	<Card
		title={title}
		image={image}
		renderLink={renderLink}
		containerClassName='rounded-2xl border border-solid border-gray-20'
	>
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
		<p className='text-base font-light text-slate-400'>{subtitle}</p>
	</Card>
);

export default Poster;
