import React from 'react';
import PropTypes from 'prop-types';

import { BackgroundImage, BackgroundOverlay } from '../Shared';
import {
	Container,
	Title,
	Actions,
	RatingContainer,
	RatingText,
	PlayTrailer,
	Pipe
} from './Mobile';
import Image from '../../../Core/Image';
import Typography from '../../../Core/Typography';
import Rating from '../../../Ratings/Percentage';
import Icon from '../../../Core/Icon';
import Overview from '../Shared/Overview';
import FeaturedCrew from '../Shared/FeaturedCrew';
import MetaData from '../Shared/MetaData';

const MobileEntertainmentHeader = ({
	posterImage,
	backgroundImage,
	title,
	releaseDate,
	releaseYear,
	genres,
	runtime,
	rating,
	trailerLink,
	tagline,
	overview,
	featuredCrew,
	ageRating
}) => (
	<div style={{ backgroundColor: 'rgba(11.76%, 15.29%, 17.25%, 0.96)' }}>
		<BackgroundImage backgroundImage={backgroundImage}>
			<BackgroundOverlay>
				<Container>
					<div>
						<Image
							src={posterImage}
							width='150px'
							height='200px'
							alt={`${title} Poster Image`}
							borderRadius='0.5rem'
						/>
					</div>
				</Container>
			</BackgroundOverlay>
		</BackgroundImage>

		<Title>
			<span style={{ marginRight: '0.3rem' }}>
				<Typography type='h1' text={title} colour='white' size='1.5rem' weight='bolder' />
			</span>
			<Typography type='p' text={`(${releaseYear})`} colour='white' size='1.5rem' weight={400} />
		</Title>

		<Actions>
			<RatingContainer>
				<Rating size={50} textSize='0.9rem' percentage={rating} strokeWidth={5} />
				<RatingText>
					<Typography
						type='p'
						text='User Score'
						colour='white'
						height={0}
						size='0.9rem'
						weight='bolder'
					/>
				</RatingText>
			</RatingContainer>

			<Pipe />

			<PlayTrailer>
				<Icon size={20} colour='white' icon='PlayFill' />
				<Typography type='p' colour='white' text='Play Trailer' size='1rem' />
			</PlayTrailer>
		</Actions>

		<MetaData ageRating={ageRating} releaseDate={releaseDate} runtime={runtime} genres={genres} />

		<div style={{ padding: '1.2rem' }}>
			<Overview overview={overview} tagline={tagline} />
			<FeaturedCrew featuredCrew={featuredCrew} />
		</div>
	</div>
);

export default MobileEntertainmentHeader;
