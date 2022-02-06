import * as React from 'react';
import PropTypes from 'prop-types';

import Image from '../../../../Core/Image';

import replacesSpacesWith from '../../../../../utils/formatters/replaceSpacesWith';

const generateSubHeading = (episodeCount, year) => {
	if (episodeCount === 1) {
		return `${year} | ${episodeCount} Episode`;
	}

	return `${year} | ${episodeCount} Episodes`;
};

const CurrentSeason = ({ image, title, year, episodeCount, overview }) => (
	<div className='md:flex md:p-0 p-4 border border-solid border-[#D3D3D3] rounded-2xl'>
		<Image
			width='130px'
			height='200px'
			alt={replacesSpacesWith(title, '-')}
			src={image}
			borderRadius='1rem 0 0 1rem'
			className='rounded-l-lg hidden md:flex'
		/>

		<div className='flex align-center justify-center flex-col pl-2'>
			<h2 className='text-2xl text-black font-bold'>{title}</h2>

			<p className='text-base text-black font-bold md:line-clamp-3 mb-4 md:mb-0'>
				{generateSubHeading(episodeCount, year)}
			</p>

			<p className='text-base leading-8 text-black line-clamp-6 md:line-clamp-3'>{overview}</p>
		</div>
	</div>
);

CurrentSeason.defaultProps = {
	image: 'https://image.tmdb.org/t/p/original/eFWtQwYetPum9RvCmqkUk2aiBIi.jpg',
	title: 'Season Three: The New World',
	year: 2020,
	episodeCount: 8,
	overview:
		'Taking place immediately after the events of the second season, Dolores develops a relationship with Caleb in neo-Los Angeles, and learns how robots are treated in the real world. Meanwhile, Maeve finds herself in another Delos park, this one with a World War II theme and set in Fascist Italy.'
};

CurrentSeason.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string,
	year: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
	episodeCount: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
	overview: PropTypes.string
};

export default CurrentSeason;
