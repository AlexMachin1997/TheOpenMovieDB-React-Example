import * as React from 'react';

import { Icon, Image } from '../../../../Core';
import { MostRecentEpisodeCardProps } from '../../../types';
import RatingBlock from '../../shared/RatingBlock';

const MostRecentEpisode = ({
	image = '',
	title = '',
	releaseYear = 0,
	numberOfEpisodesInTheSeason = 0,
	renderLink = null,
	rating = null,
	airDate = null,
	episodeAndSeason = null,
	episodeName = null,
	hasFinalEpisodeAir = null,
	overview = null
}: MostRecentEpisodeCardProps) => {
	const CurrentSeasonImage = (
		<Image
			width='130px'
			height='230px'
			alt={title}
			src={image}
			className='mr-4 hidden aspect-square max-w-[130px] rounded-l-2xl md:block'
			label={`A poster for the current season of ${title}`}
		/>
	);

	return (
		<div className='rounded-2xl border-2 border-solid border-[#D3D3D3] p-2 md:flex md:items-center'>
			{/* Image for the Current Season card */}
			{typeof renderLink === 'function'
				? React.cloneElement(renderLink({ content: CurrentSeasonImage }))
				: CurrentSeasonImage}

			{/* Main content for the Current Season card */}
			<div className='flex flex-col justify-center space-y-3'>
				{/* The title for the Current Season card */}
				{typeof renderLink === 'function' ? (
					React.cloneElement(renderLink({ content: title }), {
						className: 'text-2xl font-bold text-black text-left hover:text-gray-400'
					})
				) : (
					<h2 className='text-2xl font-bold text-black'>{title}</h2>
				)}

				{/* Subtitle for the Current Season card */}
				<div className='flex items-center space-x-2'>
					<RatingBlock rating={rating} />
					<p className='text-sm font-bold text-black'>{releaseYear}</p>
					<p className='text-sm font-bold text-black'>
						{numberOfEpisodesInTheSeason}{' '}
						{numberOfEpisodesInTheSeason === 1 ? 'episode' : 'episodes'}
					</p>
				</div>

				{/* Overview for the Current Season card */}
				<p className='line-clamp-5 text-base leading-8 text-black'>{overview}</p>

				{episodeName !== null &&
					episodeAndSeason !== null &&
					airDate !== null &&
					hasFinalEpisodeAir !== null && (
						<div className='block space-y-3 md:flex md:items-center md:space-y-0'>
							<p className='mr-1 text-base  text-black underline'>
								<Icon className='fa-md fa-regular fa-calendar m-0 mr-1' />
								{episodeName}
							</p>

							<div className='flex items-center'>
								<p className='text-base text-black'>
									({episodeAndSeason}, {airDate}){' '}
								</p>

								{hasFinalEpisodeAir === true && (
									<span className='ml-1 inline-flex items-center rounded-full bg-black p-1 text-white'>
										<p className='text-xs font-bold text-white'>Season Finale</p>
									</span>
								)}
							</div>
						</div>
					)}
			</div>
		</div>
	);
};

export default MostRecentEpisode;
