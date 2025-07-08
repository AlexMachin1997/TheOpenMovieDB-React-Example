import { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import ViewPersonResource from './ViewPersonResource';
import { SOCIAL } from '../../../types/Social';
import ActingGroupData from '../../Person/CreditsTable/ActingGroupData';

const meta: Meta<typeof ViewPersonResource> = {
	title: 'Templates/View Person',
	component: ViewPersonResource,
	decorators: [
		(StoryComponent) => (
			<MemoryRouter>
				<StoryComponent />
			</MemoryRouter>
		)
	]
};

export default meta;

type Story = StoryObj<typeof ViewPersonResource>;

const biography = `
An American and Canadian actor, producer, and semi-retired professional wrestler, signed with WWE. Johnson is half-Black and half-Samoan. His father, Rocky Johnson, is a Black Canadian from Nova Scotia and part of the first Black tag team champions in WWE history, along with Tony Atlas. His mother is Samoan and the daughter of Peter Maivia, who was also a pro wrestler. Maivia's wife, Lia Maivia, was one of wrestling's few female promoters, taking over Polynesian Pacific Pro Wrestling after her husband's death in 1982 until 1988. Through his mother, he is considered a non-blood relative of the Anoa'i wrestling family. On March 29, 2008, The Rock inducted his father and his grandfather into the WWE Hall of Fame.

As of 2014, Johnson has a home in Southwest Ranches, Florida, as well as Los Angeles, California. He also owns a farm in Virginia. In 2009, Johnson gained citizenship in Canada in honor of his father's background. Though Johnson was previously registered as a Republican, he voted for Barack Obama in the 2008 and 2012 United States presidential elections and is now an independent voter. He stated he did not vote in the 2016 U.S. election.

In recognition of his service to the Samoan people, and because he is a descendant of Samoan chiefs, Johnson had the noble title of Seiuli bestowed upon him by Malietoa Tanumafili II during his visit there in July 2004. He received a partial Samoan pe'a tattoo on his left side in 2003, and in 2017, had the small "Brahma bull" tattoo on his right arm covered with a larger half-sleeve tattoo of a bull's skull.

Johnson married Dany Garcia on May 3, 1997. Their only child together, a daughter named Simone, was born in August 2001. On June 1, 2007, they announced they were splitting up amicably. Johnson then began dating Lauren Hashian, daughter of Boston drummer Sib Hashian. They first met in 2006 while Johnson was filming The Game Plan. Their first child together, a daughter, was born in December 2015. Their second child, another daughter, was born in April 2018.

Johnson attended the 2000 Democratic National Convention as part of WWE's non-partisan "Smackdown Your Vote" campaign, which aimed to influence young people to vote. He also had a speaking role at the 2000 Republican National Convention that same year.

In 2006, Johnson founded the Dwayne Johnson Rock Foundation, a charity working with at-risk and terminally ill children. On October 2, 2007, he and his ex-wife donated $1 million to the University of Miami to support the renovation of its football facilities; it was noted as the largest donation ever given to the university's athletics department by former students. The University of Miami renamed the Hurricanes' locker room in Johnson's honor. In 2015, Johnson donated $1,500 to a GoFundMe to pay for an abandoned dog's surgery. In 2017, he donated $25,000 to Hurricane Harvey relief efforts. In 2018, Johnson donated a gym to a military base in Oahu, Hawaii. After the 2018 Hawaii floods, he worked with Malama Kauai, a nonprofit organization, to help repair damages caused by the floods.
`;

export const DwayneJohnson: Story = {
	args: {
		person: {
			name: 'Dwayne Johnson',
			headshotUrl: 'https://image.tmdb.org/t/p/original/kuqFzlYMc2IrsOyPznMd1FroeGq.jpg',
			knownForDepartment: 'Acting',
			numberOfCredits: 256,
			gender: 'Male',
			birthday: '2nd May 1972 (48 years old)',
			biography,
			knownAs: [
				'The Rock',
				'Rock Maivia',
				'The Rock 1',
				'Dwayne ‘The Rock’ Johnson',
				'The Corporate Champion',
				'The Rock',
				'Rock Maivia',
				'The Rock 1',
				'Dwayne ‘The Rock’ Johnson',
				'The Corporate Champion',
				'The Rock',
				'Rock Maivia',
				'The Rock 1',
				'Dwayne ‘The Rock’ Johnson',
				'The Corporate Champion'
			],
			socials: [
				{
					type: SOCIAL.FACEBOOK,
					link: 'https://www.facebook.com/DwayneJohnson'
				},
				{
					type: SOCIAL.TWITTER,
					link: 'https://twitter.com/therock'
				},
				{
					type: SOCIAL.INSTAGRAM,
					link: 'https://instagram.com/therock/'
				},
				{
					type: SOCIAL.TIKTOK,
					link: 'https://instagram.com/therock/'
				},
				{
					type: SOCIAL.YOUTUBE,
					link: 'https://instagram.com/therock/'
				},
				{
					type: SOCIAL.HOMEPAGE,
					link: 'https://www.wwe.com/superstars/the-rock'
				}
			],
			placeOfBirth: 'Hayward, California, USA'
		},
		knownFor: [
			{
				title: 'Jumanji: Welcome to the Jungle',
				posterUrl:
					'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/pSgXKPU5h6U89ipF7HBYajvYt7j.jpg'
			},
			{
				title: 'San Andreas',
				posterUrl:
					'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/2Gfjn962aaFSD6eST6QU3oLDZTo.jpg'
			},
			{
				title: 'Jumanji: The Next Level',
				posterUrl:
					'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/jyw8VKYEiM1UDzPB7NsisUgBeJ8.jpg'
			},
			{
				title: 'Baywatch',
				posterUrl:
					'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/6HE4xd8zloDqmjMZuhUCCw2UcY1.jpg'
			},
			{
				title: 'Fast & Furious Presents: Hobbs & Shaw',
				posterUrl:
					'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg'
			},
			{
				title: 'Rampage',
				posterUrl:
					'	https://www.themoviedb.org/t/p/w300_and_h450_bestv2/MGADip4thVSErP34FAAfzFBTZ5.jpg'
			},
			{
				title: 'Moana',
				posterUrl:
					'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/vNJFiwtsl7Twww7C0uM4qPnygNw.jpg'
			},
			{
				title: 'Central Intelligence',
				posterUrl:
					'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/7irCMBIivXAqjZ7MgZoGVLrgACR.jpg'
			}
		],
		credits: ActingGroupData
	}
};
