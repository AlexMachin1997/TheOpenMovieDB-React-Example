import * as React from 'react';

import { Icon, Image } from '../../../Core';
import { RecommendationCardProps } from '../../types';

const Recommendation = ({
	title = '',
	releaseDate = '',
	image = '',
	subtitle = '',
	renderLink = null
}: RecommendationCardProps) => {
	const LinkContent = (
		<>
			<Image
				width='250px'
				height='141px'
				alt={title}
				src={image}
				className='aspect-square rounded-2xl'
				label={`Poster for ${title}`}
			/>
			<div className='invisible absolute bottom-0 left-0 flex w-full items-center bg-white p-2 opacity-90 group-hover:visible'>
				<Icon className='fa-solid fa-calendar-days mr-2 text-base' />
				<p className='text-base font-bold text-black'>{releaseDate}</p>
			</div>
		</>
	);

	return (
		<div className='min-w-[250px] max-w-[250px] cursor-pointer' title={title}>
			{/* Either use the renderLink render prop or it defaults to just a span element */}
			{typeof renderLink === 'function' ? (
				React.cloneElement(renderLink({ content: LinkContent }), { className: 'group relative' })
			) : (
				<span className='group relative'>{LinkContent}</span>
			)}
			<div className='flex items-center justify-between px-2 pb-1'>
				<p className='line-clamp-1 text-base text-black'>{title}</p>
				<p className='text-base text-black'>{subtitle}</p>
			</div>
		</div>
	);
};

export default Recommendation;
