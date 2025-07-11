export enum SOCIAL {
	FACEBOOK = 'Facebook',
	TWITTER = 'Twitter',
	INSTAGRAM = 'Instagram',
	TIKTOK = 'Tiktok',
	YOUTUBE = 'Youtube',
	HOMEPAGE = 'Homepage',
	JUST_WATCH = 'Just Watch'
}

export type SocialLink = {
	type: SOCIAL;
	link: string;
};
