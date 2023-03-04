import * as React from 'react';

import EntertainmentSidebar from '../../Sidebars/Entertainment/EntertainmentSidebar';
import { EntertainmentHeader } from '../../Headers';
import {
	TopBilledCastMember,
	EntertainmentRecommendationCard,
	EntertainmentReviewCard
} from '../../Cards';

const StoryArgs = {
	author: {
		name: 'Cat Ellington',
		username: 'CatEllington',
		avatarPath: 'https://www.themoviedb.org/t/p/w64_and_h64_face/yHGV91jVzmqpFOtRSHF0avBZmPm.jpg',
		rating: 5
	},
	isFeatured: false,
	content:
		'Star Wars (1977) is a true masterpiece of cinema, and is \r\n  definitely one of the best films ever made.\r\n\r\nFor me Star Wars (1977) is the best movie of all time,tied with The Lord of the Rings trilogy. Star Wars (1977) it is for sure the most iconic film of all time everything in it is iconic. The direction, the script, the performances in this film are brilliant, all the characters are captivating and well developed. \r\n\r\nAnyway, this is a totally perfect film, I only have praise for it, it is certainly a masterpiece of cinema, and my grade for it is 10\\10.',
	createdOn: 'November 1, 2017',
	renderLink: null
};

const ViewMoviePage = () => {
	const [activeTab, setActiveTabIndex] = React.useState(0);

	const TopBilledCastMembers = React.useMemo(
		() => [
			{
				name: 'Jamie Fox',
				characterName: 'Art',
				image: 'https://image.tmdb.org/t/p/original/hPwCMEq6jLAidsXAX5BfoYgIfg2.jpg'
			},
			{
				name: 'Joseph Gordon-Levitt',
				characterName: 'Frank',
				image: 'https://image.tmdb.org/t/p/original/lDlo5LFmrxrxa3iXqiwwNj1w52X.jpg'
			},
			{
				name: 'Dominique Fishback',
				characterName: 'Robin',
				image: 'https://image.tmdb.org/t/p/original/zduC0PM7xKzFX4F7DH8CCt5gt6O.jpg'
			},
			{
				name: 'Rodrigo Santoro',
				characterName: 'Biggie',
				image: 'https://image.tmdb.org/t/p/original/d3MaF9SPHDn2PMYHuqdnO0Csik6.jpg'
			},
			{
				name: 'Courtney B. Vance',
				characterName: 'Captain Craine',
				image: 'https://image.tmdb.org/t/p/original/q4oCmhqEPXKSRK2hTZzTz2Zt4Ba.jpg'
			},
			{
				name: 'Amy Landecker',
				characterName: 'Gardner',
				image: 'https://image.tmdb.org/t/p/original/3woCLCbumhHOxrkeVOT7ylWi7Lg.jpg'
			},
			{
				name: 'Machine Gun Kelly',
				characterName: 'Newt',
				image: 'https://image.tmdb.org/t/p/original/astSdaQqoYyI4p694WEllO6q3aN.jpg'
			},
			{
				name: 'Tait Fletcher',
				characterName: 'Wallace',
				image: 'https://image.tmdb.org/t/p/original/zAVsHT2GBLPaQ4RpTopnHvIrCbv.jpg'
			},
			{
				name: 'Allen Maldonado',
				characterName: 'Landry',
				image: 'https://image.tmdb.org/t/p/original/rl8YFsk4XsFZqCZO5jHNwP0Qoog.jpg'
			}
		],
		[]
	);

	const Reccomendations = React.useMemo(
		() => [
			{
				title: 'The Old Guard',
				releaseDate: '10/07/2020',
				image: 'https://image.tmdb.org/t/p/original/m0ObOaJBerZ3Unc74l471ar8Iiy.jpg',
				rating: '72'
			},
			{
				title: 'Tenet',
				releaseDate: '22/08/2020',
				image: 'https://image.tmdb.org/t/p/original/yY76zq9XSuJ4nWyPDuwkdV7Wt0c.jpg',
				rating: '72'
			},
			{
				title: 'Ava',
				releaseDate: '02/07/2020',
				image: 'https://image.tmdb.org/t/p/original/il9nvQH3f92n5bBKJfpjfaHXFYi.jpg',
				rating: '50'
			},
			{
				title: 'Enola Holmes',
				releaseDate: '25/08/2020',
				image: 'https://image.tmdb.org/t/p/original/pQQggUuDMleFSl2tQYxzTmKIiLU.jpg',
				rating: '50'
			},
			{
				title: 'One Night in Bangkok',
				releaseDate: '23/09/2020',
				image: 'https://image.tmdb.org/t/p/original/riDrpqQtZpXGeiJdlmfcwwPH7nN.jpg',
				rating: '69'
			},
			{
				title: 'Spenser Confidential',
				releaseDate: '06/09/2020',
				image: 'https://image.tmdb.org/t/p/original/ftODZXaXpWtV5XFD8gS9n9KwLDr.jpg',
				rating: '65'
			},
			{
				title: 'Santana',
				releaseDate: '28/08/2020',
				image: 'https://image.tmdb.org/t/p/original/7fvdg211A2L0mHddvzyArRuRalp.jpg',
				rating: '56'
			},
			{
				title: 'The Sleepover',
				releaseDate: '21/08/2020',
				image: 'https://image.tmdb.org/t/p/original/mQngZ4DtXqdkX9fOQRsm9iym5OW.jpg',
				rating: '64'
			},
			{
				title: 'The Tax Collector',
				releaseDate: '07/08/2020',
				image: 'https://image.tmdb.org/t/p/original/zogWnCSztU8xvabaepQnAwsOtOt.jpg',
				rating: '64'
			}
		],
		[]
	);

	return (
		<>
			<EntertainmentHeader
				posterImage='https://image.tmdb.org/t/p/original/TnOeov4w0sTtV2gqICqIxVi74V.jpg'
				backgroundImage='https://image.tmdb.org/t/p/original/qVygtf2vU15L2yKS4Ke44U4oMdD.jpg'
				title='Project Power'
				releaseDate='14/08/2020 (ES)'
				releaseYear='2020'
				genres={[
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
				]}
				runtime='1h 53m'
				rating={66}
				ageRating='R'
				// trailerLink:''
				tagline='What would you risk for five minutes of pure power?'
				overview='An ex-soldier, a teen and a cop collide in New Orleans as they hunt for the source behind a dangerous new pill that grants users temporary superpowers.'
				featuredCrew={[
					{
						name: 'Henry Joost',
						roles: 'Director'
					},
					{
						name: 'Ariel Schulman',
						roles: 'Director'
					},
					{
						name: 'Mattson Tomlin',
						roles: 'Writer'
					}
				]}
				isAuthenticated={false}
			/>

			<main className='relative p-4'>
				<div className='mr-72 space-y-2'>
					<section className='border-b border-solid border-gray-400 pt-4'>
						<h2 className='py-4 text-2xl font-bold'>Top Billed Cast Member</h2>

						<div className='flex w-full overflow-auto'>
							{TopBilledCastMembers.map((castMember) => (
								<TopBilledCastMember
									key={castMember.name}
									name={castMember.name}
									character={castMember.characterName}
									image={castMember.image}
									entertainmentType='movie'
								/>
							))}
						</div>

						<a
							href='https://www.themoviedb.org/movie/605116-project-power/cast?language=en-GB'
							className='inline-flex py-4 text-base font-bold text-black hover:underline'
						>
							Full Cast & Crew
						</a>
					</section>

					<section className='border-b border-solid border-gray-400 pt-4'>
						<h2 className='py-4 text-2xl font-bold'>Recommendations</h2>

						<div className='flex w-full space-x-4 overflow-auto pb-2'>
							{Reccomendations.map((movie) => (
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

					<section className='border-b border-solid border-gray-400 pt-4'>
						<div>
							<h2 className='py-4 text-2xl font-bold'>Social</h2>
						</div>

						<EntertainmentReviewCard
							author={{
								name: 'Cat Ellington',
								username: 'CatEllington',
								avatarPath:
									'https://www.themoviedb.org/t/p/w64_and_h64_face/yHGV91jVzmqpFOtRSHF0avBZmPm.jpg',
								rating: 5
							}}
							isFeatured={false}
							content={
								'Star Wars (1977) is a true masterpiece of cinema, and is \r\n  definitely one of the best films ever made.\r\n\r\nFor me Star Wars (1977) is the best movie of all time,tied with The Lord of the Rings trilogy. Star Wars (1977) it is for sure the most iconic film of all time everything in it is iconic. The direction, the script, the performances in this film are brilliant, all the characters are captivating and well developed. \r\n\r\nAnyway, this is a totally perfect film, I only have praise for it, it is certainly a masterpiece of cinema, and my grade for it is 10\\10.'
							}
							createdOn='November 1, 2017'
						/>
					</section>
				</div>

				<div className='absolute inset-y-0 right-0 mt-4 bg-white pt-4'>
					<EntertainmentSidebar
						facebookLink=''
						twitterLink=''
						instagramLink=''
						homePageLink='http://www.netflix.com/projectpower'
						status='Released'
						type=''
						keywords={[
							{
								name: 'drugs',
								id: 14964
							},
							{
								name: 'super power',
								id: 33637
							},
							{
								name: 'force',
								id: 33728
							},
							{
								name: 'pills',
								id: 255064
							}
						]}
						originalLanguage='English'
						budget='-'
						revenue='-'
						networkImage=''
						entertainmentType='movie'
						entertainmentName=''
					/>
				</div>
			</main>
		</>
	);
};

export default ViewMoviePage;
