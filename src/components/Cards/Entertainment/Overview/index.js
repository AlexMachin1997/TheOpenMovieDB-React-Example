import React from 'react';
import PropTypes from 'prop-types';

import Image from '../../../Image';
import Paragraph from '../../../Paragraph';
import Heading from '../../../Heading';
import Rating from '../../../Ratings/Stars';

import { OverviewContainer, OverviewContentContainer } from './Overview';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';

const Overview = ({ image, title, genres, releaseDate, onClick, rating }) => (
	<OverviewContainer onClick={onClick}>
		<div>
			<Image
				width='100px'
				height='100%'
				alt={replacesSpacesWith(title, '-')}
				src={image}
				borderRadius='1rem'
			/>
		</div>

		<OverviewContentContainer>
			<div>
				<Heading type='h2' size='1rem' colour='black' text={title} weight='bolder' />
			</div>

			<div>
				<Rating rating={rating} />
			</div>

			<div>
				<Paragraph size='0.9rem' text={releaseDate} weight='lighter' colour='grey' />
			</div>

			<div>
				<Paragraph size='0.9rem' text={genres} weight='lighter' colour='grey' />
			</div>
		</OverviewContentContainer>
	</OverviewContainer>
);

Overview.defaultProps = {
	image: 'https://image.tmdb.org/t/p/original/eFWtQwYetPum9RvCmqkUk2aiBIi.jpg',
	title: 'Westworld',
	genres: 'Drama, Scifi, onClick',
	releaseDate: 'October 2nd 2016',
	onClick: () => false,
	rating: 35,
};

Overview.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string,
	genres: PropTypes.string,
	releaseDate: PropTypes.string,
	onClick: PropTypes.func,
	rating: PropTypes.number,
};

export default Overview;
