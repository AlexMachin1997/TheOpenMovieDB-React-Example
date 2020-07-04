import React from 'react';
import PropTypes from 'prop-types';

import Image from '../../Image';
import Heading from '../../Heading';
import Paragraph from '../../Paragraph';
import Rating from '../../Rating';

import { ContentContainer, BackdropContainer, RatingContainer, CardInformation } from './Backdrop';

import replacesSpacesWith from '../../../utils/formatters/replaceSpacesWith';

const Backdrop = ({ title, releaseDate, rating, img }) => (
	<BackdropContainer>
		<Image
			width="100%"
			height="300px"
			alt={replacesSpacesWith(title, '-')}
			src={img}
			borderRadius="0px"
		/>
		<ContentContainer>
			<RatingContainer>
				<Rating percentage={rating} sqSize={50} strokeWidth="5" />
			</RatingContainer>
			<CardInformation>
				<Heading type="h1" text={title} size="1.5rem" weight="bolder" />
				<Paragraph size="1rem" text={releaseDate} weight="lighter" />
			</CardInformation>
		</ContentContainer>
	</BackdropContainer>
);

Backdrop.defaultProps = {
	title: 'Example title',
	releaseDate: 'September 17th, 2020',
	rating: 59,
	img: 'https://via.placeholder.com/468x60?text=Default+Card+Image'
};

Backdrop.propTypes = {
	title: PropTypes.string,
	releaseDate: PropTypes.string,
	rating: PropTypes.number,
	img: PropTypes.string
};

export default Backdrop;
