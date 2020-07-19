import React from 'react';
import PropTypes from 'prop-types';

import Image from '../../../../Image';
import Paragraph from '../../../../Paragraph';
import Heading from '../../../../Heading';

import {
	CurrentSeasonContainer,
	CurrentSeasonContentContainer,
	CurrentSeasonContentOverview,
} from './CurrentSeason';

import replacesSpacesWith from '../../../../../utils/formatters/replaceSpacesWith';

const generateSubHeading = (episodeCount, year) => {
	if (episodeCount === 1) {
		return `${year} | ${episodeCount} Episode`;
	}

	return `${year} | ${episodeCount} Episodes`;
};

const CurrentSeason = ({ image, title, year, episodeCount, overview }) => (
	<CurrentSeasonContainer>
		<div>
			<Image
				width='130px'
				height='100%'
				alt={replacesSpacesWith(title, '-')}
				src={image}
				borderRadius='1rem 0 0 1rem'
			/>
		</div>

		<CurrentSeasonContentContainer>
			<div>
				<Heading type='h2' size='1.5rem' colour='black' text={title} weight='bolder' />
			</div>

			<div style={{ marginTop: '0.5rem' }}>
				<Paragraph
					size='1rem'
					colour='black'
					text={generateSubHeading(episodeCount, year)}
					weight='bolder'
				/>
			</div>
			<CurrentSeasonContentOverview>
				<Paragraph size='1rem' height={2} colour='black' text={overview} />
			</CurrentSeasonContentOverview>
		</CurrentSeasonContentContainer>
	</CurrentSeasonContainer>
);

CurrentSeason.defaultProps = {
	image: 'https://image.tmdb.org/t/p/original/eFWtQwYetPum9RvCmqkUk2aiBIi.jpg',
	title: 'Season Three: The New World',
	year: 2020,
	episodeCount: 8,
	overview:
		'Taking place immediately after the events of the second season, Dolores develops a relationship with Caleb in neo-Los Angeles, and learns how robots are treated in the real world. Meanwhile, Maeve finds herself in another Delos park, this one with a World War II theme and set in Fascist Italy.',
};

CurrentSeason.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string,
	year: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
	episodeCount: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
	overview: PropTypes.string,
};

export default CurrentSeason;
