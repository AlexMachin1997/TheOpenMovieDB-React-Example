import React from 'react';
import PropTypes from 'prop-types';

import { BackgroundImage, BackgroundOverlay, ContentContainer } from '../Shared';
import FeaturedCrew from '../Shared/FeaturedCrew';
import Overview from '../Shared/Overview';
import MetaData from '../Shared/MetaData';

import {
	EntertainmentInfoContainer,
	Title,
	Actions,
	RatingContainer,
	RatingText,
	AddToList,
	AddToFavorites,
	AddToBookmarks,
	RateIt,
	PlayTrailer
} from './Desktop';

import Image from '../../../Core/Image';
import Typography from '../../../Core/Typography';
import Rating from '../../../Ratings/Percentage';
import Icon from '../../../Core/Icon';

import Action from './Action';

const DesktopEntertainmentHeader = ({
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
	<BackgroundImage backgroundImage={backgroundImage}>
		<BackgroundOverlay>
			<ContentContainer>
				<div>
					<Image
						src={posterImage}
						width='300px'
						height='450px'
						alt={`${title} Poster Image`}
						borderRadius='0.5rem'
					/>
				</div>
				<EntertainmentInfoContainer>
					<div>
						<Title>
							<span style={{ marginRight: '0.3rem' }}>
								<Typography type='h1' text={title} colour='white' size='2.2rem' weight='bolder' />
							</span>
							<Typography
								type='p'
								text={`(${releaseYear})`}
								colour='white'
								size='2.2rem'
								weight={400}
							/>
						</Title>

						<MetaData
							ageRating={ageRating}
							releaseDate={releaseDate}
							genres={genres}
							runtime={runtime}
						/>
					</div>

					<Actions>
						<RatingContainer>
							<Rating size={50} textSize='0.9rem' percentage={rating} strokeWidth={5} />
							<RatingText>
								<Typography
									type='p'
									text='User'
									colour='white'
									height={0}
									size='0.9rem'
									weight='bolder'
								/>
								<br />
								<Typography
									type='p'
									text='Score'
									colour='white'
									height={0}
									size='0.9rem'
									weight='bolder'
								/>
							</RatingText>
						</RatingContainer>

						<AddToList>
							<Action tooltip='Login to create and edit custom lists' icon='ListTask' />
						</AddToList>

						<AddToFavorites>
							<Action
								tooltip='Login to create and add it to your favorites list'
								icon='HeartFilled'
							/>
						</AddToFavorites>

						<AddToBookmarks>
							<Action tooltip='Login to create and add it to your watch list' icon='BookmarkFill' />
						</AddToBookmarks>

						<RateIt>
							<Action tooltip='Login to rate this title' icon='StarFill' />
						</RateIt>

						<PlayTrailer>
							<Icon size={20} colour='white' icon='PlayFill' />
							Play Trailer
						</PlayTrailer>
					</Actions>

					<Overview tagline={tagline} overview={overview} />

					<FeaturedCrew featuredCrew={featuredCrew} />
				</EntertainmentInfoContainer>
			</ContentContainer>
		</BackgroundOverlay>
	</BackgroundImage>
);

DesktopEntertainmentHeader.propTypes = {
	posterImage: PropTypes.string.isRequired,
	backgroundImage: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	releaseDate: PropTypes.string.isRequired,
	releaseYear: PropTypes.string.isRequired,
	genres: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string
		}).isRequired
	).isRequired,
	runtime: PropTypes.string.isRequired,
	rating: PropTypes.number.isRequired,
	trailerLink: PropTypes.string.isRequired,
	tagline: PropTypes.string.isRequired,
	overview: PropTypes.string.isRequired,
	featuredCrew: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.number,
			roles: PropTypes.string
		}).isRequired
	).isRequired,
	ageRating: PropTypes.string.isRequired
};

export default DesktopEntertainmentHeader;
