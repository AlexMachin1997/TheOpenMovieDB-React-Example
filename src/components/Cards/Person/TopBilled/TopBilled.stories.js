import * as React from 'react';

import TopBilledCard from './TopBilled';

const Template = (args) => (
	<div className='flex'>
		<TopBilledCard {...args} />
	</div>
);

export const Default = Template.bind({});

export const ActorName = Template.bind({});
ActorName.args = {
	actorName: 'Gregg Clark'
};

export const CharacterName = Template.bind({});
CharacterName.args = {
	characterName: 'Phil Coulson / Sarge'
};

export const Image = Template.bind({});
Image.args = {
	actorImage: 'https://image.tmdb.org/t/p/w138_and_h175_face/mq686D91XoZpqkzELn0888NOiZW.jpg'
};

export const OnClick = Template.bind({});
OnClick.args = {
	onClick: () => 'Click'
};

export const OnKeyDown = Template.bind({});
OnKeyDown.args = {
	onKeyDown: () => 'Click'
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
	actorName: 'Evan Rachel Wood',
	characterName: 'Dolores Abernathy',
	actorImage: 'https://image.tmdb.org/t/p/w138_and_h175_face/g6XBBmsEd9fqP0gc4RuHsX0MXNl.jpg',
	entertainmentType: 'tv',
	episodeCount: 28
};

export const TopBilledMovieExample = Template.bind({});
TopBilledMovieExample.args = {
	actorName: 'Willem Dafoe',
	characterName: 'Norman Osborn / Green Goblin',
	actorImage: 'https://www.themoviedb.org/t/p/w276_and_h350_face/ui8e4sgZAwMPi3hzEO53jyBJF9B.jpg',
	entertainmentType: 'movie'
};

export const MultipleCardsExampleTVExample = () => (
	<div className='w-100 flex overflow-x-auto overflow-y-auto'>
		<div className='mr-2'>
			<TopBilledCard
				actorName='Evan Rachel Wood'
				characterName='Delores Abernathy'
				actorImage='https://image.tmdb.org/t/p/original/g6XBBmsEd9fqP0gc4RuHsX0MXNl.jpg'
				entertainmentType='tv'
				episodeCount={28}
			/>
		</div>

		<div className='mr-2'>
			<TopBilledCard
				actorName='Thandie Newton'
				characterName='Maeve Millay'
				actorImage='https://image.tmdb.org/t/p/original/hZQLvxj7nV7pBrRyWTvWVz1CDi8.jpg'
				entertainmentType='tv'
				episodeCount={28}
			/>
		</div>

		<TopBilledCard
			actorName='Jeffrey Wright'
			characterName='Bernard Lowe'
			actorImage='https://image.tmdb.org/t/p/original/npJjOiFiAP4wiRDNjKsO8ho03Mg.jpg'
			entertainmentType='tv'
			episodeCount={28}
		/>
	</div>
);

export const MultipleCardsExampleMovieExample = () => (
	<div className='w-100 flex overflow-x-auto overflow-y-auto'>
		<div className='mr-2'>
			<TopBilledCard
				actorName='Charlize Theron'
				characterName='Andromache of Scythia / Andy'
				actorImage='https://image.tmdb.org/t/p/original/1HloWLLhL3iTrmDtMigiitLB9Qx.jpg'
				entertainmentType='movie'
			/>
		</div>

		<TopBilledCard
			actorName='Kiki Layne'
			characterName='Nille Freeman'
			actorImage='https://image.tmdb.org/t/p/original/aqQNDmRLlpJvbmbpqpU4bYRXEtb.jpg'
			entertainmentType='movie'
		/>
	</div>
);

export default {
	component: TopBilledCard,
	title: 'Design System/Cards/Person/Top Billed Cast Member',
	argTypes: { onClick: { action: 'onClick click' }, onKeyDown: { action: 'onKeyDown event' } }
};
