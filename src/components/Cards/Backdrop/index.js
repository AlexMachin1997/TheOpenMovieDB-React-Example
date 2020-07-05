import React from 'react';
import PropTypes from 'prop-types';

import Image from '../../Image';
import Heading from '../../Heading';
import Paragraph from '../../Paragraph';
import Rating from '../../Rating';

import { ContentContainer, BackdropContainer, RatingContainer, CardInformation } from './Backdrop';

import replacesSpacesWith from '../../../utils/formatters/replaceSpacesWith';

const Backdrop = ({ title, releaseDate, rating, img, onClick }) => (
	<BackdropContainer id={`${replacesSpacesWith(title, '-')}-container`} onClick={onClick}>
		<Image
			width='100%'
			height='250px'
			alt={replacesSpacesWith(title, '-')}
			src={img}
			borderRadius='0px'
		/>
		<ContentContainer id={`${replacesSpacesWith(title, '-')}-content`}>
			<RatingContainer id={`${replacesSpacesWith(title, '-')}-rating`}>
				<Rating percentage={rating} size={50} strokeWidth={5} />
			</RatingContainer>
			<CardInformation id={`${replacesSpacesWith(title, '-')}-information`}>
				<Heading type='h1' text={title} size='1.2rem' weight='bolder' />
				<Paragraph size='1rem' text={releaseDate} weight='lighter' colour='#A9A9A9' />
			</CardInformation>
		</ContentContainer>
	</BackdropContainer>
);

Backdrop.defaultProps = {
	title: 'Example title',
	releaseDate: 'September 17th, 2020',
	rating: 50,
	img: 'https://image.tmdb.org/t/p/original/3lBDg3i6nn5R2NKFCJ6oKyUo2j5.jpg',
	onClick: () => false,
};

Backdrop.propTypes = {
	title: PropTypes.string,
	releaseDate: PropTypes.string,
	rating: PropTypes.number,
	img: PropTypes.string,
	onClick: PropTypes.func,
};

export default Backdrop;
