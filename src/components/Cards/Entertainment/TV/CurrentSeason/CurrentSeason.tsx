import * as React from 'react';

import { Image } from '../../../../Core';
import { CurrentSeasonCardProps } from '../../../types';

const CurrentSeason = ({
	image = '',
	title = '',
	year = 0,
	episodeCount = 0,
	subtitle = '',
	renderLink = null
}: CurrentSeasonCardProps) => {
	const CurrentSeasonImage = (
		<Image
			width='130px'
			height='200px'
			alt={title}
			src={image}
			className='hidden aspect-square max-w-[130px] rounded-l-2xl md:block'
			label={`A poster for the current season of ${title}`}
		/>
	);

	return (
		<div className='rounded-2xl border border-solid border-[#D3D3D3] p-4 md:flex md:p-[0.10rem]'>
			{/* Image for the Current Season card */}
			{typeof renderLink === 'function'
				? React.cloneElement(renderLink({ content: CurrentSeasonImage }))
				: CurrentSeasonImage}

			{/* Main content for the Current Season card */}
			<div className='flex flex-col justify-around pl-2'>
				{/* The title for the Current Season card */}
				{typeof renderLink === 'function' ? (
					React.cloneElement(renderLink({ content: title }), {
						className: 'text-2xl font-bold text-black text-left hover:text-gray-400'
					})
				) : (
					<h2 className='text-2xl font-bold text-black'>{title}</h2>
				)}

				{/* Subtitle for the Current Season card */}
				<p className='mb-0 text-base font-bold text-black md:line-clamp-3'>
					{year} | {episodeCount} {episodeCount === 1 ? 'Episode' : 'Episodes'}
				</p>

				{/* Overview for the Current Season card */}
				<p className='line-clamp-6 text-base leading-8 text-black md:line-clamp-3'>{subtitle}</p>
			</div>
		</div>
	);
};

export default CurrentSeason;
