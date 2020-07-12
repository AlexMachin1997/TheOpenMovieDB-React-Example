import React from 'react';
import PropTypes from 'prop-types';

import Heading from '../../../Heading';
import Paragraph from '../../../Paragraph';
import Image from '../../../Image';
import Rating from '../../../Rating';

import { PosterContainer, RatingContainer, ContentContainer } from './Poster';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';
import generateComponentId from '../../../../utils/formatters/generateComponentId';

const Poster = ({
	entertainmentName,
	entertainmentReleaseDate,
	entertainmentRating,
	entertainmentImage,
	entertainmentAction,
}) => (
	<PosterContainer
		entertainmentAction={entertainmentAction}
		id={generateComponentId(entertainmentName, 'poster-card-container')}
	>
		<Image
			width='100%'
			height='244px'
			alt={replacesSpacesWith(entertainmentName, '-')}
			src={entertainmentImage}
			borderRadius='1rem 1rem 0 0'
		/>

		<ContentContainer id={generateComponentId(entertainmentName, 'poster-card-content')}>
			<RatingContainer id={generateComponentId(entertainmentName, 'poster-card-rating')}>
				<Rating percentage={entertainmentRating} size={34} strokeWidth={2.5} />
			</RatingContainer>
			<div id={generateComponentId(entertainmentName, 'poster-card-meta')}>
				<Heading type='h1' text={entertainmentName} size='1rem' weight='bolder' />
				<Paragraph size='1rem' text={entertainmentReleaseDate} weight='lighter' colour='#C0C0C0' />
			</div>
		</ContentContainer>
	</PosterContainer>
);

Poster.defaultProps = {
	entertainmentName: 'Dark',
	entertainmentReleaseDate: 'Dec 01, 2017',
	entertainmentRating: 50,
	entertainmentImage: 'https://image.tmdb.org/t/p/original/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg',
	entertainmentAction: () => false,
};

Poster.propTypes = {
	entertainmentName: PropTypes.string,
	entertainmentReleaseDate: PropTypes.string,
	entertainmentRating: PropTypes.number,
	entertainmentImage: PropTypes.string,
	entertainmentAction: PropTypes.func,
};

export default Poster;
