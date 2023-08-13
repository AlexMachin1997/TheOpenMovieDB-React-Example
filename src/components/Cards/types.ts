export type BaseCardProps = {
	title: string;
	renderLink?: null | ((renderLinkArgs: { content: React.ReactNode }) => JSX.Element);
	image: string;
	children: React.ReactNode;
	imageHeight?: string;
	imageClassName?: string;
	contentClassName?: string;
	containerClassName?: string;
};

export interface KnownForCardProps extends Pick<BaseCardProps, 'renderLink' | 'image'> {
	name: string;
}

interface TopBilledCastMemberMovieMediaTypeProps
	extends Pick<BaseCardProps, 'renderLink' | 'image'> {
	name?: string;
	character?: string;
	mediaType: 'movie';
}

interface TopBilledCastMemberTVMediaTypeProps extends Pick<BaseCardProps, 'renderLink' | 'image'> {
	name?: string;
	character?: string;
	mediaType: 'tv';
	episodeCount?: number;
}

export type TopBilledCastMemberCardProps =
	| TopBilledCastMemberTVMediaTypeProps
	| TopBilledCastMemberMovieMediaTypeProps;

export interface PersonCardProps extends Pick<BaseCardProps, 'renderLink' | 'image'> {
	name?: string;
	knownFor: { original_title: string }[];
}

export interface PosterCardProps extends Pick<BaseCardProps, 'renderLink' | 'image' | 'title'> {
	releaseDate: string;
	rating: number;
}

export type RecommendationCardProps = PosterCardProps;

export interface CollectionCardProps extends Pick<BaseCardProps, 'renderLink' | 'image' | 'title'> {
	subtitle: string;
}

export interface ReviewCardProps extends Pick<BaseCardProps, 'renderLink'> {
	author?: {
		name?: string;
		username?: string;
		avatarPath?: string | null;
		rating?: number | null;
	};
	content?: string | null;
	createdOn?: string;
	isFeatured?: boolean;
}

export interface CurrentSeasonCardProps
	extends Pick<BaseCardProps, 'renderLink' | 'image' | 'title'> {
	overview?: string;
	episodeCount?: number;
	year?: number;
}

export interface VideoCardProps extends Pick<BaseCardProps, 'renderLink' | 'image' | 'title'> {
	subtitle?: string;
	thumbnailAction?: null | ((event: React.MouseEvent | React.KeyboardEvent) => void);
}
