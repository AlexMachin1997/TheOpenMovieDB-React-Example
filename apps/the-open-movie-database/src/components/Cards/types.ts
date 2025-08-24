import { MEDIA_TYPE } from '~/types/RoutingTypes';

export type BaseCardProps = {
	title: string;
	subtitle?: string;
	renderLink?:
		| null
		| ((renderLinkArgs: {
				content: React.ReactNode;
				className?: string;
		  }) => React.ReactElement<{ className?: string }>);
	image: string;
	children: React.ReactNode;
	imageHeight?: string;
	imageClassName?: string;
	contentClassName?: string;
	containerClassName?: string;
};

// The Card component wrapper that goes around vast majority of the cards, it extends the base but omits 'subtitle' as the subtitle isn't needed for this part of the component that is handled elsewhere
export type CardComponentProps = Omit<BaseCardProps, 'subtitle'>;

export type KnownForCardProps = Pick<BaseCardProps, 'renderLink' | 'image' | 'title'>;

export interface TopBilledCastMemberMovieMediaTypeProps
	extends Pick<BaseCardProps, 'renderLink' | 'image' | 'title'> {
	subtitle: string;
	mediaType: MEDIA_TYPE.MOVIE;
}

export interface TopBilledCastMemberTVMediaTypeProps
	extends Pick<BaseCardProps, 'renderLink' | 'image' | 'title' | 'subtitle'> {
	mediaType: MEDIA_TYPE.TV;
	episodeCount?: number;
}

export type TopBilledCastMemberCardProps =
	| TopBilledCastMemberTVMediaTypeProps
	| TopBilledCastMemberMovieMediaTypeProps;

export type PersonCardProps = Pick<BaseCardProps, 'renderLink' | 'image' | 'title' | 'subtitle'>;

export interface PosterCardProps
	extends Pick<BaseCardProps, 'renderLink' | 'image' | 'title' | 'subtitle'> {
	rating: number;
}

export interface RecommendationCardProps
	extends Pick<BaseCardProps, 'title' | 'subtitle' | 'image' | 'renderLink'> {
	releaseDate: string;
}

export type CollectionCardProps = Pick<
	BaseCardProps,
	'renderLink' | 'image' | 'title' | 'subtitle'
>;

export interface MostRecentEpisodeCardProps
	extends Pick<BaseCardProps, 'renderLink' | 'image' | 'title'> {
	numberOfEpisodesInTheSeason?: number | null;
	hasFinalEpisodeAir?: boolean | null;
	releaseYear?: number;
	rating?: number | null;
	episodeName?: string | null;
	episodeAndSeason?: string | null;
	airDate?: string | null;
	overview?: string | null;
}

export interface VideoCardProps
	extends Pick<BaseCardProps, 'renderLink' | 'image' | 'title' | 'subtitle'> {
	thumbnailAction?: null | ((event: React.MouseEvent | React.KeyboardEvent) => void);
}

// Very specific props for this custom component as it's not as simple as the others ie it requires additional props such as author which has the avatar image url
export interface ReviewCardProps extends Pick<BaseCardProps, 'renderLink'> {
	author?: {
		name?: string;
		username?: string;
		avatarUrl?: string | null;
		rating?: number | null;
	};
	content?: string | null;
	createdOn?: string;
	isFeatured?: boolean;
}
