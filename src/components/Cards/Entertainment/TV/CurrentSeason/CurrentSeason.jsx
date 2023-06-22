import * as React from 'react';
import PropTypes from 'prop-types';

import { Image } from '../../../../Core';

const generateSubtitle = (episodeCount, year) => {
	if (episodeCount === 1) {
		return `${year} | ${episodeCount} Episode`;
	}

	return `${year} | ${episodeCount} Episodes`;
};

const CurrentSeason = ({ image, title, year, episodeCount, overview, renderLink }) => {
	const CurrentSeasonImage = (
		<Image
			width='130px'
			height='200px'
			alt={title}
			src={image}
			className='hidden aspect-square max-w-[130px] rounded-l-2xl md:block'
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
					{generateSubtitle(episodeCount, year)}
				</p>

				{/* Overview for the Current Season card */}
				<p className='line-clamp-6 text-base leading-8 text-black md:line-clamp-3'>{overview}</p>
			</div>
		</div>
	);
};

CurrentSeason.defaultProps = {
	image: '',
	title: '',
	year: 0,
	episodeCount: 0,
	overview: '',
	renderLink: null
};

CurrentSeason.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string,
	year: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
	episodeCount: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
	overview: PropTypes.string,
	renderLink: PropTypes.func
};

export default CurrentSeason;
