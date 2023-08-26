import { Meta, StoryObj } from '@storybook/react';

import { MemoryRouter } from 'react-router-dom';

import ViewEntertainmentResource from './ViewEntertainmentResource';
import { MEDIA_TYPE } from '../../../types/RoutingTypes';

const meta: Meta<typeof ViewEntertainmentResource> = {
	title: 'Templates/View Movie OR TV Show',
	component: ViewEntertainmentResource,
	decorators: [
		(StoryComponent) => (
			<MemoryRouter>
				<StoryComponent />
			</MemoryRouter>
		)
	]
};

export default meta;

type Story = StoryObj<typeof ViewEntertainmentResource>;

const generateMovieImages = (type: 'posters' | 'videos' | 'backdrops') => {
	switch (type) {
		case 'posters':
		case 'videos': {
			return [...Array(5).keys()].map((value) => ({
				id: `poster-${value}`,
				images: [
					{
						key: 'w220_and_h330_face',
						url: 'https://image.tmdb.org/t/p/w220_and_h330_bestv2/TnOeov4w0sTtV2gqICqIxVi74V.jpg',
						isFallback: false,
						type
					},
					{
						key: 'w94_and_h141_face',
						url: 'https://image.tmdb.org/t/p/w94_and_h141_bestv2/TnOeov4w0sTtV2gqICqIxVi74V.jpg',
						isFallback: true,
						type
					}
				]
			}));
		}

		case 'backdrops': {
			return [...Array(3).keys()].map((value) => ({
				id: `backdrop-${value}`,
				images: [
					{
						key: 'w533_and_h300_bestv2',
						url: 'https://image.tmdb.org/t/p/w533_and_h300_bestv2/qVygtf2vU15L2yKS4Ke44U4oMdD.jpg',
						isFallback: false
					},
					{
						key: 'w250_and_h141_face',
						url: 'https://image.tmdb.org/t/p/w250_and_h141_bestv2/qVygtf2vU15L2yKS4Ke44U4oMdD.jpg',
						isFallback: true
					}
				]
			}));
		}

		default: {
			return [];
		}
	}
};

export const ProjectPowerExample: Story = {
	args: {
		// Define the movie type so we can hide or show specific components
		mediaType: MEDIA_TYPE.MOVIE,

		// Cast members
		topBilledCastMembers: [
			{
				name: 'Jamie Fox',
				character: 'Art',
				headshotUrl: 'https://image.tmdb.org/t/p/original/hPwCMEq6jLAidsXAX5BfoYgIfg2.jpg',
				mediaType: MEDIA_TYPE.MOVIE
			},
			{
				name: 'Joseph Gordon-Levitt',
				character: 'Frank',
				headshotUrl: 'https://image.tmdb.org/t/p/original/lDlo5LFmrxrxa3iXqiwwNj1w52X.jpg',
				mediaType: MEDIA_TYPE.MOVIE
			},
			{
				name: 'Dominique Fishback',
				character: 'Robin',
				headshotUrl: 'https://image.tmdb.org/t/p/original/zduC0PM7xKzFX4F7DH8CCt5gt6O.jpg',
				mediaType: MEDIA_TYPE.MOVIE
			},
			{
				name: 'Rodrigo Santoro',
				character: 'Biggie',
				headshotUrl: 'https://image.tmdb.org/t/p/original/d3MaF9SPHDn2PMYHuqdnO0Csik6.jpg',
				mediaType: MEDIA_TYPE.MOVIE
			},
			{
				name: 'Courtney B. Vance',
				character: 'Captain Craine',
				headshotUrl: 'https://image.tmdb.org/t/p/original/q4oCmhqEPXKSRK2hTZzTz2Zt4Ba.jpg',
				mediaType: MEDIA_TYPE.MOVIE
			},
			{
				name: 'Amy Landecker',
				character: 'Gardner',
				headshotUrl: 'https://image.tmdb.org/t/p/original/3woCLCbumhHOxrkeVOT7ylWi7Lg.jpg',
				mediaType: MEDIA_TYPE.MOVIE
			},
			{
				name: 'Machine Gun Kelly',
				character: 'Newt',
				headshotUrl: 'https://image.tmdb.org/t/p/original/astSdaQqoYyI4p694WEllO6q3aN.jpg',
				mediaType: MEDIA_TYPE.MOVIE
			},
			{
				name: 'Tait Fletcher',
				character: 'Wallace',
				headshotUrl: 'https://image.tmdb.org/t/p/original/zAVsHT2GBLPaQ4RpTopnHvIrCbv.jpg',
				mediaType: MEDIA_TYPE.MOVIE
			},
			{
				name: 'Allen Maldonado',
				character: 'Landry',
				headshotUrl: 'https://image.tmdb.org/t/p/original/rl8YFsk4XsFZqCZO5jHNwP0Qoog.jpg',
				mediaType: MEDIA_TYPE.MOVIE
			}
		],

		// Film/TV Recommendations
		recommendations: [
			{
				name: 'The Old Guard',
				releaseDate: '10/07/2020',
				backgroundUrl: 'https://image.tmdb.org/t/p/original/m0ObOaJBerZ3Unc74l471ar8Iiy.jpg',
				rating: 72
			},
			{
				name: 'Tenet',
				releaseDate: '22/08/2020',
				backgroundUrl: 'https://image.tmdb.org/t/p/original/yY76zq9XSuJ4nWyPDuwkdV7Wt0c.jpg',
				rating: 72
			},
			{
				name: 'Ava',
				releaseDate: '02/07/2020',
				backgroundUrl: 'https://image.tmdb.org/t/p/original/il9nvQH3f92n5bBKJfpjfaHXFYi.jpg',
				rating: 50
			},
			{
				name: 'Enola Holmes',
				releaseDate: '25/08/2020',
				backgroundUrl: 'https://image.tmdb.org/t/p/original/pQQggUuDMleFSl2tQYxzTmKIiLU.jpg',
				rating: 50
			},
			{
				name: 'One Night in Bangkok',
				releaseDate: '23/09/2020',
				backgroundUrl: 'https://image.tmdb.org/t/p/original/riDrpqQtZpXGeiJdlmfcwwPH7nN.jpg',
				rating: 69
			},
			{
				name: 'Spenser Confidential',
				releaseDate: '06/09/2020',
				backgroundUrl: 'https://image.tmdb.org/t/p/original/ftODZXaXpWtV5XFD8gS9n9KwLDr.jpg',
				rating: 65
			},
			{
				name: 'Santana',
				releaseDate: '28/08/2020',
				backgroundUrl: 'https://image.tmdb.org/t/p/original/7fvdg211A2L0mHddvzyArRuRalp.jpg',
				rating: 56
			},
			{
				name: 'The Sleepover',
				releaseDate: '21/08/2020',
				backgroundUrl: 'https://image.tmdb.org/t/p/original/mQngZ4DtXqdkX9fOQRsm9iym5OW.jpg',
				rating: 64
			},
			{
				name: 'The Tax Collector',
				releaseDate: '07/08/2020',
				backgroundUrl: 'https://image.tmdb.org/t/p/original/zogWnCSztU8xvabaepQnAwsOtOt.jpg',
				rating: 64
			}
		],

		// Header data
		header: {
			mediaType: MEDIA_TYPE.MOVIE,
			// trailerLink: '',
			posterImageUrl: 'https://image.tmdb.org/t/p/original/TnOeov4w0sTtV2gqICqIxVi74V.jpg',
			backgroundImageUrl: 'https://image.tmdb.org/t/p/original/qVygtf2vU15L2yKS4Ke44U4oMdD.jpg',
			title: 'Project Power',
			releaseDate: '14/08/2020 (ES)',
			releaseYear: 2020,
			genres: [
				{
					id: 'action',
					name: 'Action'
				},
				{
					id: 'crime',
					name: 'Crime'
				},
				{
					id: 'science-fiction',
					name: 'Science Fiction'
				}
			],
			runtime: '1h 53m',
			rating: 66,
			ageRating: 'R',
			// trailerLink: '',
			tagline: 'What would you risk for five minutes of pure power?',
			overview:
				'An ex-soldier, a teen and a cop collide in New Orleans as they hunt for the source behind a dangerous new pill that grants users temporary superpowers.',
			featuredCrew: [
				{
					name: 'Henry Joost',
					role: 'Director'
				},
				{
					name: 'Ariel Schulman',
					role: 'Director'
				},
				{
					name: 'Mattson Tomlin',
					role: 'Writer'
				}
			]
		},

		isAuthenticated: false,

		// Sidebar data
		sidebar: {
			mediaType: MEDIA_TYPE.MOVIE,
			facebookLink: '',
			twitterLink: '',
			instagramLink: '',
			homePageLink: 'http://www.netflix.com/projectpower',
			status: 'Released',
			keywords: [
				{
					name: 'drugs',
					id: '14964'
				},
				{
					name: 'super power',
					id: '33637'
				},
				{
					name: 'force',
					id: '33728'
				},
				{
					name: 'pills',
					id: '255064'
				}
			],
			originalLanguage: 'English',
			budget: '',
			revenue: ''
		},

		// Random review for the current show
		review: {
			author: {
				name: 'Cat Ellington',
				username: 'CatEllington',
				avatarUrl:
					'https://www.themoviedb.org/t/p/w64_and_h64_face/yHGV91jVzmqpFOtRSHF0avBZmPm.jpg',
				rating: 5
			},
			isFeatured: false,
			content:
				'Star Wars (1977) is a true masterpiece of cinema, and is \r\n  definitely one of the best films ever made.\r\n\r\nFor me Star Wars (1977) is the best movie of all time,tied with The Lord of the Rings trilogy. Star Wars (1977) it is for sure the most iconic film of all time everything in it is iconic. The direction, the script, the performances in this film are brilliant, all the characters are captivating and well developed. \r\n\r\nAnyway, this is a totally perfect film, I only have praise for it, it is certainly a masterpiece of cinema, and my grade for it is 10\\10.',
			createdOn: 'November 1, 2017'
		},

		// Media sections e.g. posters, videos, popular etc
		media: {
			posters: generateMovieImages('posters'),
			backdrops: generateMovieImages('backdrops'),
			videos: generateMovieImages('videos')
		}
	}
};

export const GameOfThronesExample: Story = {
	args: {
		// Define the movie type so we can hide or show specific components
		mediaType: MEDIA_TYPE.TV,

		// Cast members
		topBilledCastMembers: [
			{
				name: 'Kit Harington',
				character: 'Jon Snow',
				headshotUrl: 'https://image.tmdb.org/t/p/original/htGBMno71BJAEGF3Y9f62MdA3Yt.jpg',
				mediaType: MEDIA_TYPE.TV,
				episodeCount: 79
			},
			{
				name: 'Peter Dinklage',
				character: "Tyrion 'The Halfman' Lannister",
				headshotUrl: 'https://image.tmdb.org/t/p/original/9CAd7wr8QZyIN0E7nm8v1B6WkGn.jpg',
				mediaType: MEDIA_TYPE.TV,
				episodeCount: 73
			},
			{
				name: 'Nikolaj Coster-Waldau',
				character: "Sir Jaime 'Kingslayer' Lannister",
				headshotUrl: 'https://image.tmdb.org/t/p/original/9FIP8NqMuMfmXloq7f1L45czPX0.jpg',
				mediaType: MEDIA_TYPE.TV,
				episodeCount: 73
			},
			{
				name: 'Emilia Clarke',
				character: 'Daenerys Targaryen',
				headshotUrl: 'https://image.tmdb.org/t/p/original/puWXJbe5ZGnOqJhVr9lEgstvygy.jpg',
				mediaType: MEDIA_TYPE.TV,
				episodeCount: 73
			},
			{
				name: 'Maisie Williams',
				character: 'Arya Stark',
				headshotUrl: 'https://image.tmdb.org/t/p/original/q4oCmhqEPXKSRK2hTZzTz2Zt4Ba.jpg',
				mediaType: MEDIA_TYPE.TV,
				episodeCount: 73
			},
			{
				name: 'Sophie Turner',
				character: 'Sansa Stark',
				headshotUrl: 'https://image.tmdb.org/t/p/original/zopxZsUZmxZ4sGEfm4cRr7FVoM4.jpg',
				mediaType: MEDIA_TYPE.TV,
				episodeCount: 73
			},
			{
				name: 'John Bradley',
				character: "Samwell 'Sam' Tarly",
				headshotUrl: 'https://image.tmdb.org/t/p/original/eLcisM9qqCLWnf0iImHuSn08FOi.jpg',
				mediaType: MEDIA_TYPE.TV,
				episodeCount: 72
			},
			{
				name: 'Isaac Hempstead-Wright',
				character: "Brandon 'Bran' Stark",
				headshotUrl: 'https://image.tmdb.org/t/p/original/gabehMRu2XPnmjLA1XQ8oYNwnG5.jpg',
				mediaType: MEDIA_TYPE.TV,
				episodeCount: 68
			},
			{
				name: 'Lena Headey',
				character: 'Cersei Lannister',
				headshotUrl: 'https://image.tmdb.org/t/p/original/rKoDN3VOIkvoubUsuYXgMe93hJW.jpg',
				mediaType: MEDIA_TYPE.TV,
				episodeCount: 67
			}
		],

		// Film/TV Recommendations
		recommendations: [
			{
				name: 'The Old Guard',
				releaseDate: '10/07/2020',
				backgroundUrl: 'https://image.tmdb.org/t/p/original/m0ObOaJBerZ3Unc74l471ar8Iiy.jpg',
				rating: 72
			},
			{
				name: 'Tenet',
				releaseDate: '22/08/2020',
				backgroundUrl: 'https://image.tmdb.org/t/p/original/yY76zq9XSuJ4nWyPDuwkdV7Wt0c.jpg',
				rating: 72
			},
			{
				name: 'Ava',
				releaseDate: '02/07/2020',
				backgroundUrl: 'https://image.tmdb.org/t/p/original/il9nvQH3f92n5bBKJfpjfaHXFYi.jpg',
				rating: 50
			},
			{
				name: 'Enola Holmes',
				releaseDate: '25/08/2020',
				backgroundUrl: 'https://image.tmdb.org/t/p/original/pQQggUuDMleFSl2tQYxzTmKIiLU.jpg',
				rating: 50
			},
			{
				name: 'One Night in Bangkok',
				releaseDate: '23/09/2020',
				backgroundUrl: 'https://image.tmdb.org/t/p/original/riDrpqQtZpXGeiJdlmfcwwPH7nN.jpg',
				rating: 69
			},
			{
				name: 'Spenser Confidential',
				releaseDate: '06/09/2020',
				backgroundUrl: 'https://image.tmdb.org/t/p/original/ftODZXaXpWtV5XFD8gS9n9KwLDr.jpg',
				rating: 65
			},
			{
				name: 'Santana',
				releaseDate: '28/08/2020',
				backgroundUrl: 'https://image.tmdb.org/t/p/original/7fvdg211A2L0mHddvzyArRuRalp.jpg',
				rating: 56
			},
			{
				name: 'The Sleepover',
				releaseDate: '21/08/2020',
				backgroundUrl: 'https://image.tmdb.org/t/p/original/mQngZ4DtXqdkX9fOQRsm9iym5OW.jpg',
				rating: 64
			},
			{
				name: 'The Tax Collector',
				releaseDate: '07/08/2020',
				backgroundUrl: 'https://image.tmdb.org/t/p/original/zogWnCSztU8xvabaepQnAwsOtOt.jpg',
				rating: 64
			}
		],

		// Header data
		header: {
			mediaType: MEDIA_TYPE.TV,
			// trailerLink: '',
			posterImageUrl: 'https://image.tmdb.org/t/p/original/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
			backgroundImageUrl: 'https://image.tmdb.org/t/p/original/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg',
			title: 'Game of Thrones',
			releaseYear: 2011,
			genres: [
				{
					id: 'action',
					name: 'Sci-Fi & Fantasy'
				},
				{
					id: 'crime',
					name: 'Drama'
				},
				{
					id: 'science-fiction',
					name: 'Action & Adventure'
				}
			],
			rating: 84,
			ageRating: 'TV-MA',
			// trailerLink: '',
			tagline: 'What would you risk for five minutes of pure power?',
			overview:
				"Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
			featuredCrew: [
				{
					name: 'David Benioff',
					role: 'Creator'
				},
				{
					name: 'D.B. Weiss',
					role: 'Creator'
				}
			]
		},

		isAuthenticated: true,

		// Sidebar data
		sidebar: {
			entertainmentName: 'Game of thrones',
			mediaType: MEDIA_TYPE.TV,
			facebookLink: 'https://www.facebook.com/GameOfThrones',
			twitterLink: 'https://twitter.com/GameOfThrones',
			instagramLink: 'https://instagram.com/gameofthrones/',
			homePageLink: 'http://www.hbo.com/game-of-thrones',
			status: 'Ended',
			type: '',
			keywords: [
				{
					name: 'based on novel or book',
					id: '14964'
				},
				{
					name: 'kingdom',
					id: '33637'
				},
				{
					name: 'dragon',
					id: '33728'
				},
				{
					name: 'king',
					id: '255064'
				},
				{
					name: 'intrigue',
					id: '255065'
				},
				{
					name: 'fantasy world',
					id: '255066'
				}
			],
			originalLanguage: 'English',
			networkImageUrl: 'https://www.themoviedb.org/t/p/h30/tuomPhY2UtuPTqqFnKMVHvSb724.png'
		},

		// Random review for the current show
		review: {
			author: {
				name: 'Vlad Ulbricht',
				username: 'Vlad Ulbricht',
				avatarUrl:
					'https://www.themoviedb.org/t/p/w45_and_h45_face/srVsbbWgrmA4lmpqsrIYRYxJerc.jpg',
				rating: 9
			},
			isFeatured: false,
			content:
				'Cruel, bloody, vulgar, Machiavellian, unrepentant. And that is just the writing. The camera angles, the score, the pacing mesh together for grand storytelling: a mix of horror, swords and sorcery, and endless treachery.',
			createdOn: 'May 11, 2017'
		},

		// Media sections e.g. posters, videos, popular etc
		media: {
			posters: generateMovieImages('posters'),
			backdrops: generateMovieImages('backdrops'),
			videos: generateMovieImages('videos')
		},

		mostRecentEpisode: {
			seasonTitle: 'Season 8',
			posterUrl:
				'https://www.themoviedb.org/t/p/w130_and_h195_bestv2/3OcQhbrecf4F4pYss2gSirTGPvD.jpg',
			releaseYear: 2019,
			numberOfEpisodesInTheSeason: 6,
			episodeRating: 6.5,
			episodeAirDate: '19 May 2019',
			episodeAndSeason: '8x6',
			episodeName: 'The Iron Throne',
			hasFinalEpisodeAir: true,
			episodeOverview:
				"The Great War has come, the Wall has fallen and the Night King's army of the dead marches towards Westeros. The end is here, but who will take the Iron Throne?"
		}
	}
};
