type BaseCredit = {
	title: string;
	character: string;
	year: number;
};

interface MovieCredit extends BaseCredit {
	mediaType: 'movie';
}

interface TVCredit extends BaseCredit {
	mediaType: 'tv';
	episodeCount: number;
}

export type Credit = TVCredit | MovieCredit;
