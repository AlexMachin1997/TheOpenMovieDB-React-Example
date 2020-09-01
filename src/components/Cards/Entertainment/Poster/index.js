import React from 'react';
import PropTypes from 'prop-types';

import Typography from '../../../Core/Typography';
import Image from '../../../Core/Image';
import Rating from '../../../Ratings/Percentage';

import { PosterContainer, RatingContainer, ContentContainer } from './Poster';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';
import generateComponentId from '../../../../utils/formatters/generateComponentId';

const Poster = ({ title, releaseDate, rating, image, onClick }) => (
	<PosterContainer onClick={onClick} id={generateComponentId(title, 'poster-card-container')}>
		<Image
			width='100%'
			height='244px'
			alt={replacesSpacesWith(title, '-')}
			src={image}
			borderRadius='1rem 1rem 0 0'
		/>

		<ContentContainer id={generateComponentId(title, 'poster-card-content')}>
			<RatingContainer id={generateComponentId(title, 'poster-card-rating')}>
				<Rating percentage={rating} size={34} strokeWidth={2.5} />
			</RatingContainer>
			<div id={generateComponentId(title, 'poster-card-meta')}>
				<Typography type='h1' text={title} size='1rem' weight='bolder' />
				<Typography type='p' size='1rem' text={releaseDate} weight='lighter' colour='#C0C0C0' />
			</div>
		</ContentContainer>
	</PosterContainer>
);

Poster.defaultProps = {
	title: 'Dark',
	releaseDate: 'Dec 01, 2017',
	rating: 50,
	image: 'https://image.tmdb.org/t/p/original/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg',
	onClick: () => false
};

Poster.propTypes = {
	title: PropTypes.string,
	releaseDate: PropTypes.string,
	rating: PropTypes.number,
	image: PropTypes.string,
	onClick: PropTypes.func
};

export default Poster;
