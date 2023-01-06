import * as React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';

import TopBilledCard from './TopBilledCastMember';

export default {
	component: TopBilledCard,
	title: 'Design System/Cards/Person/Top Billed Cast Member'
};

const StoryArgs = {
	name: 'Elizabeth Henstridge',
	character: 'Jemma Simmons',
	image: 'https://image.tmdb.org/t/p/original/ohoSW1kYL3GMlFgGWuLEC1IzjmE.jpg',
	entertainmentType: 'movie',
	episodeCount: 136,
	renderLink: null
};

const Template = (args) => <TopBilledCard {...args} />;

export const Example = Template.bind({});
Example.args = { ...StoryArgs };

export const MediaTypeTVExample = Template.bind({});
MediaTypeTVExample.args = {
	...Example.args,
	mediaType: 'tv'
};

export const GroupedWestWorldExample = () => (
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

export const GroupedOldGuardExample = () => (
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

export const ReactRouterLinkExample = Template.bind({});
ReactRouterLinkExample.args = {
	...Example.args,
	renderLink: ({ content }) => <Link to='/'>{content}</Link>
};
ReactRouterLinkExample.decorators = [
	(Story) => (
		<MemoryRouter>
			<Story />
		</MemoryRouter>
	)
];
