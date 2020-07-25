import React from 'react';
import PropTypes from 'prop-types';

import Image from '../../../Core/Image';
import Typography from '../../../Core/Typography';
import Rating from '../../../Ratings/Circle';

import { ContentContainer, BackdropContainer, RatingContainer, CardInformation } from './Backdrop';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';
import generateComponentId from '../../../../utils/formatters/generateComponentId';

const Backdrop = ({ title, releaseDate, rating, image, onClick }) => (
	<BackdropContainer id={generateComponentId(title, 'backdrop-card-container')} onClick={onClick}>
		<Image
			width='100%'
			height='250px'
			alt={replacesSpacesWith(title, '-')}
			src={image}
			borderRadius='0px'
		/>
		<ContentContainer id={generateComponentId(title, 'backdrop-card-content')}>
			<RatingContainer id={generateComponentId(title, 'backdrop-card-rating')}>
				<Rating percentage={rating} size={55} strokeWidth={5} />
			</RatingContainer>
			<CardInformation id={generateComponentId(title, 'backdrop-card-information')}>
				<Typography type='h1' text={title} size='1.2rem' weight='bolder' />
				<Typography type='p' size='1rem' text={releaseDate} weight='lighter' colour='#A9A9A9' />
			</CardInformation>
		</ContentContainer>
	</BackdropContainer>
);

Backdrop.defaultProps = {
	title: 'Dark',
	releaseDate: 'September 17th, 2020',
	rating: 50,
	image: 'https://image.tmdb.org/t/p/original/3lBDg3i6nn5R2NKFCJ6oKyUo2j5.jpg',
	onClick: () => false
};

Backdrop.propTypes = {
	title: PropTypes.string,
	releaseDate: PropTypes.string,
	rating: PropTypes.number,
	image: PropTypes.string,
	onClick: PropTypes.func
};

export default Backdrop;
