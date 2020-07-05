import React from 'react';
import PropTypes from 'prop-types';

import Heading from '../../Heading';
import Paragraph from '../../Paragraph';
import Image from '../../Image';
import Rating from '../../Rating';

import { PosterContainer, PosterRatingContainer, PosterInformation } from './Poster';

import replacesSpacesWith from '../../../utils/formatters/replaceSpacesWith';

const Poster = ({ title, releaseDate, rating, img, onClick, hasInformation }) => (
	<PosterContainer onClick={onClick} id={`${replacesSpacesWith(title, '-')}-container`}>
		<Image
			width='100%'
			height='100%'
			alt={replacesSpacesWith(title, '-')}
			src={img}
			borderRadius={hasInformation === true ? '1rem 1rem 0 0' : '1rem'}
		/>

		<PosterInformation id={`${replacesSpacesWith(title, '-')}-content`} display={hasInformation}>
			<PosterRatingContainer id={`${replacesSpacesWith(title, '-')}-rating`}>
				<Rating percentage={rating} size={34} strokeWidth={2.5} />
			</PosterRatingContainer>
			<Heading type='h1' text={title} size='1rem' weight='bolder' />
			<Paragraph size='1rem' text={releaseDate} weight='lighter' colour='rgba(0,0,0,0.6)' />
		</PosterInformation>
	</PosterContainer>
);

Poster.defaultProps = {
	title: 'Dark',
	releaseDate: 'Dec 01, 2017',
	rating: 50,
	img: 'https://image.tmdb.org/t/p/original/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg',
	onClick: () => false,
	hasInformation: true
};

Poster.propTypes = {
	title: PropTypes.string,
	releaseDate: PropTypes.string,
	rating: PropTypes.number,
	img: PropTypes.string,
	onClick: PropTypes.func,
	hasInformation: PropTypes.bool
};

export default Poster;
