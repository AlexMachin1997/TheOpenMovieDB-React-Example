import * as React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';

import TopBilledCard from './TopBilledCastMember';

const Template = (args) => <TopBilledCard {...args} />;

export const Default = Template.bind({});

export const ActorName = Template.bind({});
ActorName.args = {
	name: 'Gregg Clark'
};

export const CharacterName = Template.bind({});
CharacterName.args = {
	character: 'Phil Coulson / Sarge'
};

export const Image = Template.bind({});
Image.args = {
	image: 'https://image.tmdb.org/t/p/w138_and_h175_face/mq686D91XoZpqkzELn0888NOiZW.jpg'
};

export const EntertainmentType = Template.bind({});
EntertainmentType.args = {
	entertainmentType: 'movie'
};

export const EpisodeCount = Template.bind({});
EpisodeCount.args = {
	episodeCount: 100
};

export const TopBilledTVExample = Template.bind({});
TopBilledTVExample.args = {
	name: 'Evan Rachel Wood',
	character: 'Dolores Abernathy',
	image: 'https://image.tmdb.org/t/p/w138_and_h175_face/g6XBBmsEd9fqP0gc4RuHsX0MXNl.jpg',
	entertainmentType: 'tv',
	episodeCount: 28
};

export const TopBilledMovieExample = Template.bind({});
TopBilledMovieExample.args = {
	name: 'Willem Dafoe',
	character: 'Norman Osborn / Green Goblin',
	image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/ui8e4sgZAwMPi3hzEO53jyBJF9B.jpg',
	entertainmentType: 'movie'
};

export const MultipleCardsExampleTVExample = () => (
	<div className='flex w-full overflow-auto'>
		<TopBilledCard
			name='Evan Rachel Wood'
			character='Delores Abernathy, Christina'
			image='https://image.tmdb.org/t/p/original/g6XBBmsEd9fqP0gc4RuHsX0MXNl.jpg'
			entertainmentType='tv'
			episodeCount={28}
		/>

		<TopBilledCard
			name='Thandie Newton'
			character='Maeve Millay'
			image='https://image.tmdb.org/t/p/original/hZQLvxj7nV7pBrRyWTvWVz1CDi8.jpg'
			entertainmentType='tv'
			episodeCount={28}
		/>

		<TopBilledCard
			name='Jeffrey Wright'
			character='Bernard Lowe'
			image='https://image.tmdb.org/t/p/original/npJjOiFiAP4wiRDNjKsO8ho03Mg.jpg'
			entertainmentType='tv'
			episodeCount={28}
		/>
	</div>
);

export const MultipleCardsExampleMovieExample = () => (
	<div className='flex w-full overflow-auto'>
		<TopBilledCard
			name='Charlize Theron'
			character='Andromache of Scythia / Andy'
			image='https://image.tmdb.org/t/p/original/1HloWLLhL3iTrmDtMigiitLB9Qx.jpg'
			entertainmentType='movie'
		/>

		<TopBilledCard
			name='Kiki Layne'
			character='Nille Freeman'
			image='https://image.tmdb.org/t/p/original/aqQNDmRLlpJvbmbpqpU4bYRXEtb.jpg'
			entertainmentType='movie'
		/>
	</div>
);

export const TopBilledCastMemberWithLinkElementAsButton = Template.bind({});
TopBilledCastMemberWithLinkElementAsButton.args = {
	renderLink: ({ content }) => (
		<button onClick={() => console.log('clicked')} type='button'>
			{content}
		</button>
	)
};

export const TopBilledCastMemberWithLinkElementAsReactRouterLink = Template.bind({});
TopBilledCastMemberWithLinkElementAsReactRouterLink.args = {
	renderLink: ({ content }) => <Link to='/'>{content}</Link>
};
TopBilledCastMemberWithLinkElementAsReactRouterLink.decorators = [
	(Story) => (
		<MemoryRouter>
			<Story />
		</MemoryRouter>
	)
];

export default {
	component: TopBilledCard,
	title: 'Design System/Cards/Person/Top Billed Cast Member'
};
