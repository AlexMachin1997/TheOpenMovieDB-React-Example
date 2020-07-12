import React from 'react';
import PropTypes from 'prop-types';

import Image from '../../../Image';
import Heading from '../../../Heading';
import Paragraph from '../../../Paragraph';
import Rating from '../../../Rating';

import { ContentContainer, BackdropContainer, RatingContainer, CardInformation } from './Backdrop';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';
import generateComponentId from '../../../../utils/formatters/generateComponentId';

const Backdrop = ({
	entertainmentTitle,
	entertainmentReleaseDate,
	entertainmentRating,
	entertainmentImage,
	entertainmentAction,
}) => (
	<BackdropContainer
		id={generateComponentId(entertainmentTitle, 'backdrop-card-container')}
		onClick={entertainmentAction}
	>
		<Image
			width='100%'
			height='250px'
			alt={replacesSpacesWith(entertainmentTitle, '-')}
			src={entertainmentImage}
			borderRadius='0px'
		/>
		<ContentContainer id={generateComponentId(entertainmentTitle, 'backdrop-card-content')}>
			<RatingContainer id={generateComponentId(entertainmentTitle, 'backdrop-card-rating')}>
				<Rating percentage={entertainmentRating} size={50} strokeWidth={5} />
			</RatingContainer>
			<CardInformation id={generateComponentId(entertainmentTitle, 'backdrop-card-information')}>
				<Heading type='h1' text={entertainmentTitle} size='1.2rem' weight='bolder' />
				<Paragraph size='1rem' text={entertainmentReleaseDate} weight='lighter' colour='#A9A9A9' />
			</CardInformation>
		</ContentContainer>
	</BackdropContainer>
);

Backdrop.defaultProps = {
	entertainmentTitle: 'Dark',
	entertainmentReleaseDate: 'September 17th, 2020',
	entertainmentRating: 50,
	entertainmentImage: 'https://image.tmdb.org/t/p/original/3lBDg3i6nn5R2NKFCJ6oKyUo2j5.jpg',
	entertainmentAction: () => false,
};

Backdrop.propTypes = {
	entertainmentTitle: PropTypes.string,
	entertainmentReleaseDate: PropTypes.string,
	entertainmentRating: PropTypes.number,
	entertainmentImage: PropTypes.string,
	entertainmentAction: PropTypes.func,
};

export default Backdrop;
