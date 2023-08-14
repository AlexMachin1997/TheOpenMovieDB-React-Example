import { Meta, StoryObj } from '@storybook/react';

import { MemoryRouter } from 'react-router-dom';

import ViewEntertainmentResource from './ViewEntertainmentResource';

const meta: Meta<typeof ViewEntertainmentResource> = {
	title: 'Page Templates/View Movie OR TV Show',
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
		entertainmentType: 'movie',

		// Cast members
		topBilledCastMembers: [
			{
				name: 'Jamie Fox',
				character: 'Art',
				headshotUrl: 'https://image.tmdb.org/t/p/original/hPwCMEq6jLAidsXAX5BfoYgIfg2.jpg'
			},
			{
				name: 'Joseph Gordon-Levitt',
				character: 'Frank',
				headshotUrl: 'https://image.tmdb.org/t/p/original/lDlo5LFmrxrxa3iXqiwwNj1w52X.jpg'
			},
			{
				name: 'Dominique Fishback',
				character: 'Robin',
				headshotUrl: 'https://image.tmdb.org/t/p/original/zduC0PM7xKzFX4F7DH8CCt5gt6O.jpg'
			},
			{
				name: 'Rodrigo Santoro',
				character: 'Biggie',
				headshotUrl: 'https://image.tmdb.org/t/p/original/d3MaF9SPHDn2PMYHuqdnO0Csik6.jpg'
			},
			{
				name: 'Courtney B. Vance',
				character: 'Captain Craine',
				headshotUrl: 'https://image.tmdb.org/t/p/original/q4oCmhqEPXKSRK2hTZzTz2Zt4Ba.jpg'
			},
			{
				name: 'Amy Landecker',
				character: 'Gardner',
				headshotUrl: 'https://image.tmdb.org/t/p/original/3woCLCbumhHOxrkeVOT7ylWi7Lg.jpg'
			},
			{
				name: 'Machine Gun Kelly',
				character: 'Newt',
				headshotUrl: 'https://image.tmdb.org/t/p/original/astSdaQqoYyI4p694WEllO6q3aN.jpg'
			},
			{
				name: 'Tait Fletcher',
				character: 'Wallace',
				headshotUrl: 'https://image.tmdb.org/t/p/original/zAVsHT2GBLPaQ4RpTopnHvIrCbv.jpg'
			},
			{
				name: 'Allen Maldonado',
				character: 'Landry',
				headshotUrl: 'https://image.tmdb.org/t/p/original/rl8YFsk4XsFZqCZO5jHNwP0Qoog.jpg'
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
			trailerLink: '',
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
			facebookLink: '',
			twitterLink: '',
			instagramLink: '',
			homepageLink: 'http://www.netflix.com/projectpower',
			status: 'Released',
			type: '',
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
			budget: '-',
			revenue: '-',
			networkImageUrl: '',
			entertainmentName: ''
		},

		// Random review for the current show
		review: {
			author: {
				name: 'Cat Ellington',
				username: 'CatEllington',
				avatarPathUrl:
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
		},

		// Collection, only applicable for tv shows
		collection: {
			name: 'Avatar',
			includes: 'Includes Avatar, Avatar: The Way of Water, Avatar 3, Avatar 4, and Avatar 5',
			posterUrl:
				'https://image.tmdb.org/t/p/w1440_and_h320_multi_faces/iaEsDbQPE45hQU2EGiNjXD2KWuF.jpg'
		}
	}
};
