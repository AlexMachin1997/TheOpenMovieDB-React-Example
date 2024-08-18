import { Link } from 'react-router-dom';
import EntertainmentSidebar, {
	EntertainmentSideProps
} from '../../Sidebars/EntertainmentSidebar/EntertainmentSidebar';
import { EntertainmentHeader } from '../../Headers';
import {
	EntertainmentRecommendationCard,
	EntertainmentReviewCard,
	MovieCollectionCard,
	MostRecentEpisodeCard,
	TopBilledCastMember
} from '../../Cards';
import { Icon, Tabs } from '../../Core';
import { MEDIA_TYPE } from '../../../types/RoutingTypes';
import { EntertainmentHeaderProps } from '../../Headers/Entertainment/EntertainmentHeader';

type Media = {
	id: string;
	images: {
		key: string;
		url: string;
		isFallback: boolean;
	}[];
};

type BaseViewMovieAndTVPageProps = {
	recommendations: { name: string; releaseDate: string; backgroundUrl: string; rating: number }[];
	isAuthenticated?: boolean;
	header: EntertainmentHeaderProps;
	sidebar: EntertainmentSideProps;
	review: {
		author?: {
			name: string;
			username: string;
			avatarUrl: string;
			rating: number;
		} | null;
		createdOn: string;
		isFeatured?: boolean;
		content?: string | null;
	};
	media: {
		posters: Media[];
		backdrops: Media[];
		videos: Media[];
	};
};

interface ViewMovieProps extends BaseViewMovieAndTVPageProps {
	mediaType: MEDIA_TYPE.MOVIE;
	topBilledCastMembers: {
		name: string;
		character: string;
		headshotUrl: string;
		mediaType: MEDIA_TYPE.MOVIE;
	}[];
	collection?: {
		name: string;
		includes: string;
		posterUrl: string;
	} | null;
}

interface ViewTVShowProps extends BaseViewMovieAndTVPageProps {
	mediaType: MEDIA_TYPE.TV;
	topBilledCastMembers: {
		name: string;
		character: string;
		headshotUrl: string;
		episodeCount: number;
		mediaType: MEDIA_TYPE.TV;
	}[];
	mostRecentEpisode: {
		seasonTitle: string;
		posterUrl: string;
		releaseYear: number;
		numberOfEpisodesInTheSeason: number;
		episodeRating: number;
		episodeAirDate: string;
		episodeAndSeason: string;
		episodeName: string;
		hasFinalEpisodeAir: boolean;
		episodeOverview: string;
	} | null;
}

type ViewEntertainmentResourceProps = ViewMovieProps | ViewTVShowProps;

const MediaImage = ({
	id,
	images,
	type
}: {
	id: string;
	images: {
		key: string;
		url: string;
		isFallback: boolean;
	}[];
	type: 'video' | 'poster' | 'backdrop';
}) => {
	// Generate the "pictures" element (Handles switching between different image sizes)
	const pictures = (
		<picture key={id} className='flex shrink-0 flex-row'>
			{images?.map((posterImage) => {
				// Internal react key -> 1-w220_and_h330_face-image (Keys should be unique and there should be no duplicate dimensions)
				const key = `${id}-${posterImage.key}-image`;

				// When the image isn't a fallback use the source tag
				if (posterImage.isFallback === false) {
					return <source srcSet={posterImage.url} media='(min-width:768px)' key={key} />;
				}

				// When the poster image isn't a fallback use the img tag (Used when none of the queries defined in the <source/> are met)
				return (
					<img src={posterImage.url} alt='Poster' key={key} className='h-[200px] lg:h-[300px]' />
				);
			}) ?? null}
		</picture>
	);

	// When the type is "video" wrap the image in an icon, this will be used to trigger additional actions e.g. opening a youtube iframe
	if (type === 'video') {
		return (
			<div key={id} className='relative shrink-0'>
				<div className='absolute left-0 top-0 flex h-[100%] w-[100%] items-center justify-center text-white'>
					<Icon className='fa-solid fa-play cursor-pointer text-5xl delay-150' />
				</div>
				{pictures}
			</div>
		);
	}

	// When it's not of type "video" just return the picture
	return pictures;
};

const ViewEntertainmentResource = ({
	topBilledCastMembers,
	recommendations,
	header,
	review,
	media,
	sidebar,
	isAuthenticated = false,
	...props
}: ViewEntertainmentResourceProps) => (
	<>
		{header.mediaType === MEDIA_TYPE.MOVIE && (
			<EntertainmentHeader
				mediaType={MEDIA_TYPE.MOVIE}
				posterImageUrl={header?.posterImageUrl ?? ''}
				backgroundImageUrl={header?.backgroundImageUrl ?? ''}
				title={header?.title ?? ''}
				releaseDate={header?.releaseDate ?? ''}
				releaseYear={header?.releaseYear ?? 0}
				genres={header?.genres ?? []}
				runtime={header?.runtime ?? ''}
				rating={header?.rating ?? ''}
				// trailerLink={header?.trailerLink ?? ""}
				tagline={header?.tagline ?? ''}
				overview={header?.overview ?? ''}
				featuredCrew={header?.featuredCrew ?? ''}
				ageRating={header?.ageRating ?? ''}
				isAuthenticated={isAuthenticated}
			/>
		)}

		{header.mediaType === MEDIA_TYPE.TV && (
			<EntertainmentHeader
				mediaType={MEDIA_TYPE.TV}
				posterImageUrl={header?.posterImageUrl ?? ''}
				backgroundImageUrl={header?.backgroundImageUrl ?? ''}
				title={header?.title ?? ''}
				releaseYear={header?.releaseYear ?? 0}
				genres={header?.genres ?? []}
				rating={header?.rating ?? ''}
				// trailerLink={header?.trailerLink ?? ""}
				tagline={header?.tagline ?? ''}
				overview={header?.overview ?? ''}
				featuredCrew={header?.featuredCrew ?? ''}
				ageRating={header?.ageRating ?? ''}
				isAuthenticated={isAuthenticated}
			/>
		)}

		<main className='relative px-2 py-4'>
			<div className='space-y-2 lg:mr-[23rem]'>
				{/* Top billed cast members section, outputs the top billed cast for the movie or show */}
				<section className='border-b border-solid border-gray-400 pt-4' id='cast-members'>
					<h3 className='py-4 text-2xl font-bold'>Top Billed Cast Member</h3>

					<div className='flex w-full overflow-y-auto pb-3 '>
						{topBilledCastMembers?.map((topBilledCastMember) => {
							if (topBilledCastMember.mediaType === MEDIA_TYPE.MOVIE) {
								return (
									<TopBilledCastMember
										key={topBilledCastMember.name}
										image={topBilledCastMember.headshotUrl}
										mediaType={MEDIA_TYPE.MOVIE}
										subtitle={topBilledCastMember.character}
										title={topBilledCastMember.name}
										renderLink={({ content }) => <Link to='/'>{content}</Link>}
									/>
								);
							}

							return (
								<TopBilledCastMember
									key={topBilledCastMember.name}
									image={topBilledCastMember.headshotUrl}
									mediaType={MEDIA_TYPE.TV}
									subtitle={topBilledCastMember.character}
									title={topBilledCastMember.name}
									renderLink={({ content }) => <Link to='/'>{content}</Link>}
									episodeCount={topBilledCastMember.episodeCount}
								/>
							);
						}) ?? null}
					</div>

					<a
						href='https://www.themoviedb.org/movie/605116-project-power/cast?language=en-GB'
						className='inline-flex py-4 text-base font-bold text-black hover:underline'
					>
						Full Cast & Crew
					</a>
				</section>

				{props.mediaType === MEDIA_TYPE.TV && (
					<section className='border-b border-solid border-gray-400 pt-4' id='social'>
						<h3 className='py-4 text-2xl font-bold'>
							{props.mostRecentEpisode?.hasFinalEpisodeAir === false
								? 'Next Season'
								: 'Last Season'}
						</h3>

						<div className='pb-3'>
							<MostRecentEpisodeCard
								renderLink={({ content }) => <Link to='/'>{content}</Link>}
								image={props.mostRecentEpisode?.posterUrl ?? ''}
								title={props.mostRecentEpisode?.seasonTitle ?? ''}
								releaseYear={props.mostRecentEpisode?.releaseYear}
								numberOfEpisodesInTheSeason={props.mostRecentEpisode?.numberOfEpisodesInTheSeason}
								rating={props.mostRecentEpisode?.episodeRating}
								airDate={props.mostRecentEpisode?.episodeAirDate}
								episodeAndSeason={props.mostRecentEpisode?.episodeAndSeason}
								episodeName={props.mostRecentEpisode?.episodeName}
								hasFinalEpisodeAir={props.mostRecentEpisode?.hasFinalEpisodeAir}
								overview={props.mostRecentEpisode?.episodeOverview}
							/>
						</div>
					</section>
				)}

				{/* Social section, includes the review and the discussions */}
				<section className='border-b border-solid border-gray-400 pt-4' id='social'>
					<h3 className='pb-4 text-2xl font-bold'>Social</h3>

					<Tabs
						tabs={[
							{
								label: 'Reviews',
								id: 'Reviews',
								content: (
									<>
										<EntertainmentReviewCard
											author={review?.author ?? {}}
											isFeatured={review?.isFeatured ?? false}
											content={review?.content ?? ''}
											createdOn={review?.createdOn ?? ''}
											renderLink={null}
										/>
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
								label: 'Discussions',
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
					<h3 className='pb-4 text-2xl font-bold'>Media</h3>

					<Tabs
						tabs={[
							{
								label: 'Videos',
								id: 'Videos',
								content: (
									<>
										<div className='flex w-full overflow-x-scroll pb-3 '>
											{media?.videos?.map((poster) => (
												<MediaImage
													id={poster?.id ?? ''}
													images={poster?.images ?? []}
													key={poster?.id ?? ''}
													type='video'
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
								label: 'Most Popular',
								id: 'MostPopular',
								content: 'Most Popular',
								enabled: false
							},
							{
								label: 'Posters',
								id: 'Posters',
								content: (
									<>
										<div className='flex w-full overflow-x-scroll pb-3 '>
											{media?.posters?.map((poster) => (
												<MediaImage
													id={poster?.id ?? ''}
													images={poster?.images ?? []}
													key={poster?.id ?? ''}
													type='poster'
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
								label: 'Backdrops',
								id: 'Backdrops',
								content: (
									<>
										<div className='flex w-full overflow-x-scroll pb-3 '>
											{media?.backdrops?.map((backdrop) => (
												<MediaImage
													id={backdrop?.id ?? ''}
													images={backdrop?.images ?? []}
													key={backdrop?.id ?? ''}
													type='backdrop'
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

				{/* Collection section, only shown when entertainmentType is 'movie' and there is a collection */}
				{props.mediaType === MEDIA_TYPE.MOVIE && (props?.collection ?? null) !== null && (
					<section className='border-b border-solid border-gray-400 pt-4' id='collection'>
						<h3 className='pb-4 text-2xl font-bold'>Collection</h3>

						<div className='pb-4'>
							<MovieCollectionCard
								title={props.collection?.name ?? ''}
								subtitle={props.collection?.includes ?? ''}
								image={props.collection?.posterUrl ?? ''}
								renderLink={({ content }) => <Link to='/'>{content}</Link>}
							/>
						</div>
					</section>
				)}

				{/* Recommendations section, outputs either movie or tv show you may like */}
				<section className='border-b border-solid border-gray-400 py-4' id='recommendations'>
					<h3 className='pb-4 text-2xl font-bold'>Recommendations</h3>

					<div className='flex w-full space-x-4 overflow-auto pb-3 '>
						{recommendations.map((recommendation) => (
							<EntertainmentRecommendationCard
								key={recommendation.name}
								title={recommendation.name}
								releaseDate={recommendation.releaseDate}
								image={recommendation.backgroundUrl}
								subtitle={`${recommendation.rating}%`}
							/>
						))}
					</div>
				</section>
			</div>

			{/* Sidebar, for mobile it's part of the content and for desktop it's on the right hand side */}
			<div className='lg:absolute lg:inset-y-0 lg:right-0 lg:mt-4 lg:bg-white lg:pt-4'>
				{sidebar.mediaType === MEDIA_TYPE.MOVIE && (
					<EntertainmentSidebar
						mediaType={MEDIA_TYPE.MOVIE}
						socials={sidebar?.socials ?? []}
						status={sidebar?.status ?? ''}
						keywords={sidebar?.keywords ?? []}
						originalLanguage={sidebar?.originalLanguage ?? ''}
						budget={sidebar?.budget ?? ''}
						revenue={sidebar?.revenue ?? ''}
					/>
				)}

				{sidebar.mediaType === MEDIA_TYPE.TV && (
					<EntertainmentSidebar
						mediaType={MEDIA_TYPE.TV}
						entertainmentName={header?.title ?? ''}
						socials={sidebar?.socials ?? []}
						status={sidebar?.status ?? ''}
						type={sidebar?.type ?? ''}
						keywords={sidebar?.keywords ?? []}
						originalLanguage={sidebar?.originalLanguage ?? ''}
						networkImageUrl={sidebar?.networkImageUrl ?? ''}
					/>
				)}
			</div>
		</main>
	</>
);

export default ViewEntertainmentResource;
