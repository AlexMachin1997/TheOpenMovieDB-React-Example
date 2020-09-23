import React from 'react';
import PropTypes from 'prop-types';

import Image from '../../../Core/Image';
import Typography from '../../../Core/Typography';
import Rating from '../../../Ratings/Stars';

import { OverviewContainer, OverviewContentContainer, OverviewInformation } from './Overview';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';

const Overview = ({ image, title, overview, releaseDate, onClick, rating }) => (
	<OverviewContainer onClick={onClick}>
		<div>
			<Image
				width='150px'
				height='100%'
				alt={replacesSpacesWith(title, '-')}
				src={image}
				borderRadius='1rem'
			/>
		</div>

		<OverviewContentContainer>
			<div>
				<Typography type='h2' size='1rem' colour='black' text={title} weight='bolder' />
			</div>

			<div>
				<Rating rating={rating} />
			</div>

			<div>
				<Typography type='p' size='0.9rem' text={releaseDate} weight='lighter' colour='grey' />
			</div>

			<OverviewInformation>
				<Typography type='p' size='0.9rem' text={overview} weight='lighter' colour='grey' />
			</OverviewInformation>
		</OverviewContentContainer>
	</OverviewContainer>
);

Overview.defaultProps = {
	image: 'https://image.tmdb.org/t/p/original/eFWtQwYetPum9RvCmqkUk2aiBIi.jpg',
	title: 'Westworld',
	overview: 'Drama, Scifi, onClick',
	releaseDate: 'October 2nd 2016',
	onClick: () => false,
	rating: 35
};

Overview.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string,
	overview: PropTypes.string,
	releaseDate: PropTypes.string,
	onClick: PropTypes.func,
	rating: PropTypes.number
};

export default Overview;
