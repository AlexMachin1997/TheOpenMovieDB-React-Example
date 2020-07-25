import React from 'react';
import PropTypes from 'prop-types';

import { Calendar } from 'styled-icons/boxicons-regular';

import {
	ReccomendationContainer,
	ReccomendationContentContainer,
	ReccomendationImageContainer,
	ReccomendationImageContent
} from './Reccomendation';
import Image from '../../../Core/Image';
import Typography from '../../../Core/Typography';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';

const Reccomendation = ({ title, releaseDate, image, rating }) => (
	<ReccomendationContainer>
		<ReccomendationImageContainer>
			<Image
				width='100%'
				height='100%'
				alt={replacesSpacesWith(title, '-')}
				src={image}
				borderRadius='0px'
			/>
			<ReccomendationImageContent>
				<div style={{ margin: '0.5rem' }}>
					<Calendar size='20' />
				</div>
				<Typography type='p' size='0.8rem' text={releaseDate} colour='black' weight='bold' />
			</ReccomendationImageContent>
		</ReccomendationImageContainer>
		<ReccomendationContentContainer>
			<div>
				<Typography type='p' text={title} size='1rem' colour='black' />
			</div>
			<div>
				<Typography type='p' text={`${rating}%`} size='1rem' colour='black' />
			</div>
		</ReccomendationContentContainer>
	</ReccomendationContainer>
);

Reccomendation.propTypes = {
	title: PropTypes.string,
	releaseDate: PropTypes.string,
	image: PropTypes.string,
	rating: PropTypes.number
};

Reccomendation.defaultProps = {
	title: 'Ant Man and The Wasp',
	releaseDate: '07/04/2020',
	image: 'https://image.tmdb.org/t/p/original/6P3c80EOm7BodndGBUAJHHsHKrp.jpg',
	rating: 70
};

export default Reccomendation;
