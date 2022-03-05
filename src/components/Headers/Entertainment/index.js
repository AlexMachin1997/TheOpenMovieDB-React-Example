import * as React from 'react';
import PropTypes from 'prop-types';

import FeaturedCrew from './FeaturedCrew';
import Overview from './Overview';
import MetaData from './MetaData';

import {
	BackgroundImage,
	BackgroundOverlay,
	DesktopPosterContent,
	MobilePosterContent,
	Title,
	Actions,
	RatingText,
	PosterImage,
	ContentContainer,
	Pipe
} from './Desktop';

// TODO: Remove once this has been renamed with a native heading tag
import Typography from '../../Core/Typography';

import { Image, PercentageRating, Icon, Tooltip } from '../../Core';

const EntertainmentHeader = ({
	posterImage,
	backgroundImage,
	title,
	releaseDate,
	releaseYear,
	genres,
	runtime,
	rating,
	// trailerLink,
	tagline,
	overview,
	featuredCrew,
	ageRating
}) => (
	<>
		<BackgroundImage backgroundImage={backgroundImage}>
			<BackgroundOverlay>
				<ContentContainer>
					<PosterImage>
						<Image
							src={posterImage}
							width='200px'
							height='300px'
							alt={`${title} Poster Image`}
							borderRadius='0.5rem'
						/>
					</PosterImage>

					<DesktopPosterContent>
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
							<li>
								<PercentageRating size={50} textSize='0.9rem' percentage={rating} strokeWidth={5} />
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
							</li>
							<li>
								<Tooltip
									content={
										<div className='flex h-[50px] w-[50px] items-center justify-center rounded-full bg-primary'>
											<Icon className='fa-solid fa-list-ol' />
										</div>
									}
									tooltipText='Login to create and edit custom lists'
								/>
							</li>

							<li>
								<Tooltip
									content={
										<div className='flex h-[50px] w-[50px] items-center justify-center rounded-full bg-primary'>
											<Icon className='fa-solid fa-heart' />
										</div>
									}
									tooltipText='Login to create and add it to your favorites list'
								/>
							</li>

							<li>
								<Tooltip
									content={
										<div className='flex h-[50px] w-[50px] items-center justify-center rounded-full bg-primary'>
											<Icon className='fa-solid fa-bookmark' />
										</div>
									}
									tooltipText='Login to create and add it to your watch list'
								/>
							</li>

							<li>
								<Tooltip
									content={
										<div className='flex h-[50px] w-[50px] items-center justify-center rounded-full bg-primary'>
											<Icon className='fa-solid fa-star' />
										</div>
									}
									tooltipText='Login to rate this title'
								/>
							</li>

							<li className='flex items-center'>
								<Icon className='fa-solid fa-play mr-3 text-white' />
								<p className='text-base text-white'>Play Trailer</p>
							</li>
						</Actions>

						<Overview tagline={tagline} overview={overview} />

						<FeaturedCrew featuredCrew={featuredCrew} />
					</DesktopPosterContent>
				</ContentContainer>
			</BackgroundOverlay>
		</BackgroundImage>

		<MobilePosterContent>
			<Title>
				<span style={{ marginRight: '0.3rem' }}>
					<Typography type='h1' text={title} colour='white' size='1.5rem' weight='bolder' />
				</span>
				<Typography type='p' text={`(${releaseYear})`} colour='white' size='1.5rem' weight={400} />
			</Title>

			<Actions>
				<li>
					<PercentageRating size={50} textSize='0.9rem' percentage={rating} strokeWidth={5} />
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
				</li>

				<li>
					<Pipe />
				</li>

				<li>
					<Icon className='fa-solid fa-play mr-3 text-white' />
					<Typography type='p' colour='white' text='Play Trailer' size='1rem' />
				</li>
			</Actions>

			<MetaData ageRating={ageRating} releaseDate={releaseDate} runtime={runtime} genres={genres} />

			<div style={{ padding: '1.2rem' }}>
				<Overview overview={overview} tagline={tagline} />
				<FeaturedCrew featuredCrew={featuredCrew} />
			</div>
		</MobilePosterContent>
	</>
);

EntertainmentHeader.propTypes = {
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
	// trailerLink: PropTypes.string.isRequired,
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

export default EntertainmentHeader;
