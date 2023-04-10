import * as React from 'react';
import PropTypes from 'prop-types';

import EntertainmentSidebar from '../../Sidebars/Entertainment/EntertainmentSidebar';
import { EntertainmentHeader } from '../../Headers';
import {
	TopBilledCastMember,
	EntertainmentRecommendationCard,
	EntertainmentReviewCard,
	MovieCollectionCard
} from '../../Cards';
import { Tabs } from '../../Core';

const MediaImage = ({ id, images }) => (
	<picture key={id} className='shrink-0'>
		{images?.map((posterImage) => {
			// Internal react key -> 1-w220_and_h330_face-image (Keys should be unique and there should be no duplicate dimensions)
			const key = `${id}-${posterImage.key}-image`;

			// When the image isn't a fallback use the source tag
			if (posterImage.isFallback === false) {
				return <source srcSet={posterImage.url} media='(min-width:768px)' key={key} />;
			}

			// When the poster image isn't a fallback use the img tag (Used when none of the queries defined in the <source/> are met)
			return <img src={posterImage.url} alt='Poster' key={key} className='lg:h-[300px]' />;
		}) ?? null}
	</picture>
);

MediaImage.propTypes = {
	id: PropTypes.string.isRequired,
	images: PropTypes.array.isRequired
};

const ViewMovieAndTVPage = ({
	entertainmentType,
	topBilledCastMembers,
	recommendations,
	header,
	review,
	media,
	sidebar,
	collection
}) => (
	<>
		<EntertainmentHeader {...header} />

		<main className='relative p-4'>
			<div className='space-y-2 lg:mr-[21rem]'>
				{/* Top billed cast members section, outputs the top billed cast for the movie or show */}
				<section className='border-b border-solid border-gray-400 pt-4' id='cast-members'>
					<h2 className='py-4 text-2xl font-bold'>Top Billed Cast Member</h2>

					<div className='flex w-full overflow-auto overflow-y-scroll pb-3 scrollbar'>
						{topBilledCastMembers?.map((castMember) => (
							<TopBilledCastMember
								key={castMember.name}
								name={castMember.name}
								character={castMember.characterName}
								image={castMember.image}
								entertainmentType='movie'
							/>
						)) ?? null}
					</div>

					<a
						href='https://www.themoviedb.org/movie/605116-project-power/cast?language=en-GB'
						className='inline-flex py-4 text-base font-bold text-black hover:underline'
					>
						Full Cast & Crew
					</a>
				</section>

				{/* Social section, includes the review and the discussions */}
				<section className='border-b border-solid border-gray-400 pt-4' id='social'>
					<h2 className='pb-4 text-2xl font-bold'>Social</h2>

					<Tabs
						tabs={[
							{
								tabLabel: 'Reviews',
								id: 'Reviews',
								content: (
									<>
										<EntertainmentReviewCard {...review} />

										<a
											href='https://www.themoviedb.org/movie/605116-project-power/reviews'
											className='inline-flex py-4 text-base font-bold text-black hover:underline'
										>
											Read all reviews
										</a>
									</>
								)
							},
							{
								tabLabel: 'Discussions',
								id: 'Discussions',
								content: 'Discussions coming soon',
								enabled: false
							}
						]}
						activeTabClassName='underline'
						tabClassName='bg-white py-4 text-lg font-bold text-black py-0'
					/>
				</section>

				{/* Media section, includes the videos, popular, posters and backdrop */}
				<section className='border-b border-solid border-gray-400 pt-4' id='media'>
					<h2 className='pb-4 text-2xl font-bold'>Media</h2>

					<Tabs
						tabs={[
							{ tabLabel: 'Videos', id: 'Videos', content: 'Videos' },
							{ tabLabel: 'Most Popular', id: 'MostPopular', content: 'Most Popular' },
							{
								tabLabel: 'Posters',
								id: 'Posters',
								content: (
									<>
										<div className='flex w-full overflow-auto overflow-y-scroll pb-3 scrollbar'>
											{media?.posters?.map((poster) => (
												<MediaImage
													id={poster?.id ?? ''}
													images={poster?.images ?? []}
													key={poster?.id ?? ''}
												/>
											)) ?? null}
										</div>
										<a
											href='https://www.themoviedb.org/movie/605116-project-power/images/posters'
											className='inline-flex items-center py-4 text-base font-bold text-black hover:underline'
										>
											View All Posters
										</a>
									</>
								)
							},
							{
								tabLabel: 'Backdrops',
								id: 'Backdrops',
								content: (
									<>
										<div className='flex w-full overflow-auto overflow-y-scroll pb-3 scrollbar'>
											{media?.backdrops?.map((backdrop) => (
												<MediaImage
													id={backdrop?.id ?? ''}
													images={backdrop?.images ?? []}
													key={backdrop?.id ?? ''}
												/>
											)) ?? null}
										</div>
										<a
											href='https://www.themoviedb.org/movie/605116-project-power/images/backdrops'
											className='inline-flex items-center py-4 text-base font-bold text-black hover:underline'
										>
											View All Backdrops
										</a>
									</>
								)
							}
						]}
						activeTabClassName='underline'
						tabClassName='bg-white py-4 text-lg font-bold text-black py-0'
					/>
				</section>

				{/* Collection section, only shown when entertainmentType === 'movie' and there is a collection available */}
				{entertainmentType === 'movie' && collection !== null && (
					<section className='border-b border-solid border-gray-400 pt-4' id='collection'>
						<h2 className='pb-4 text-2xl font-bold'>Collection</h2>

						<div className='pb-4'>
							<MovieCollectionCard
								title={collection?.title ?? ''}
								subtitle={collection?.subtitle ?? ''}
								image={collection?.image ?? ''}
								renderLink={null}
							/>
						</div>
					</section>
				)}

				{/* Recommendations section, outputs either movie or tv show you may like */}
				<section className='border-b border-solid border-gray-400 pt-4' id='recommendations'>
					<h2 className='pb-4 text-2xl font-bold'>Recommendations</h2>

					<div className='flex w-full space-x-4 overflow-auto pb-3 scrollbar'>
						{recommendations.map((movie) => (
							<EntertainmentRecommendationCard
								key={movie.title}
								title={movie.title}
								releaseDate={movie.releaseDate}
								image={movie.image}
								rating={movie.rating}
							/>
						))}
					</div>
				</section>
			</div>

			{/* Sidebar, for mobile it's part of the content and for desktop it's on the right hand side */}
			<div className='lg:absolute lg:inset-y-0 lg:right-0 lg:mt-4 lg:bg-white lg:pt-4'>
				<EntertainmentSidebar {...sidebar} />
			</div>
		</main>
	</>
);

ViewMovieAndTVPage.propTypes = {
	entertainmentType: PropTypes.oneOf(['movie', 'tv']).isRequired,
	topBilledCastMembers: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			characterName: PropTypes.string,
			image: PropTypes.string
		})
	),
	recommendations: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			releaseDate: PropTypes.string,
			image: PropTypes.string,
			rating: PropTypes.number
		})
	),
	header: PropTypes.shape({
		posterImage: PropTypes.string,
		backgroundImage: PropTypes.string,
		title: PropTypes.string,
		releaseDate: PropTypes.string,
		releaseYear: PropTypes.number,
		genres: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string,
				name: PropTypes.string
			})
		),
		runtime: PropTypes.string,
		rating: PropTypes.number,
		ageRating: PropTypes.string,
		tagline: PropTypes.string,
		overview: PropTypes.string,
		featuredCrew: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
				role: PropTypes.string
			})
		),
		isAuthenticated: PropTypes.bool
	}),
	sidebar: PropTypes.shape({
		facebookLink: PropTypes.string,
		twitterLink: PropTypes.string,
		instagramLink: PropTypes.string,
		homepageLink: PropTypes.string,
		status: PropTypes.string,
		type: PropTypes.string,
		keywords: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
				id: PropTypes.number
			})
		),
		originalLanguage: PropTypes.string,
		budget: PropTypes.string,
		revenue: PropTypes.string,
		networkImage: PropTypes.string,
		entertainmentType: PropTypes.string,
		entertainmentName: PropTypes.string
	}),
	review: PropTypes.shape({
		author: PropTypes.shape({
			name: PropTypes.string,
			username: PropTypes.string,
			avatarPath: PropTypes.string,
			rating: PropTypes.number
		}),
		isFeatured: PropTypes.bool,
		content: PropTypes.string,
		createdOn: PropTypes.string
	}),
	media: PropTypes.shape({
		posters: PropTypes.arrayOf(
			PropTypes.shape({
				url: PropTypes.string,
				isDefault: PropTypes.bool
			})
		),
		backdrops: PropTypes.arrayOf(
			PropTypes.shape({
				url: PropTypes.string,
				isDefault: PropTypes.bool
			})
		)
	}),
	collection: PropTypes.shape({
		title: PropTypes.string,
		subtitle: PropTypes.string,
		image: PropTypes.string
	})
};

ViewMovieAndTVPage.defaultProps = {
	topBilledCastMembers: [],
	recommendations: [],
	header: {},
	sidebar: {},
	review: {},
	media: {},
	collection: null
};

export default ViewMovieAndTVPage;
