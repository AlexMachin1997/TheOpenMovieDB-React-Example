import { MEDIA_TYPE } from '~/types/RoutingTypes';

type BaseCredit = {
	title: string;
	character: string;
	year: number;
};

interface MovieCredit extends BaseCredit {
	mediaType: MEDIA_TYPE.MOVIE;
}

interface TVCredit extends BaseCredit {
	mediaType: MEDIA_TYPE.TV;
	episodeCount: number;
}

export type Credit = TVCredit | MovieCredit;
