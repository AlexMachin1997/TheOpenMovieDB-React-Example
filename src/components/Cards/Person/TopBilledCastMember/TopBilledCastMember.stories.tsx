import { Meta, StoryObj } from '@storybook/react';

import { Link, MemoryRouter } from 'react-router-dom';

import TopBilledCastMember from './TopBilledCastMember';

const meta: Meta<typeof TopBilledCastMember> = {
	component: TopBilledCastMember,
	title: 'Cards/Person/Top Billed Cast Member'
};

export default meta;

type Story = StoryObj<typeof TopBilledCastMember>;

export const MediaTypeMovie: Story = {
	args: {
		name: 'Elizabeth Henstridge',
		character: 'Jemma Simmons',
		image: 'https://image.tmdb.org/t/p/original/ohoSW1kYL3GMlFgGWuLEC1IzjmE.jpg',
		mediaType: 'movie'
	}
};

export const MediaTypeTV: Story = {
	args: {
		...(MediaTypeMovie.args ?? {}),
		mediaType: 'tv',
		episodeCount: 150
	}
};

export const RenderLink: Story = {
	args: {
		...MediaTypeMovie.args,
		renderLink: ({ content }) => <Link to='/'>{content}</Link>
	},
	decorators: [
		(StoryComponent) => (
			<MemoryRouter>
				<StoryComponent />
			</MemoryRouter>
		)
	]
};

export const GroupedWestWorldExample: Story = {
	render: () => (
		<div className='flex w-full overflow-auto'>
			<TopBilledCastMember
				name='Evan Rachel Wood'
				character='Delores Abernathy, Christina'
				image='https://image.tmdb.org/t/p/original/g6XBBmsEd9fqP0gc4RuHsX0MXNl.jpg'
				mediaType='tv'
				episodeCount={28}
			/>

			<TopBilledCastMember
				name='Thandie Newton'
				character='Maeve Millay'
				image='https://image.tmdb.org/t/p/original/hZQLvxj7nV7pBrRyWTvWVz1CDi8.jpg'
				mediaType='tv'
				episodeCount={28}
			/>

			<TopBilledCastMember
				name='Jeffrey Wright'
				character='Bernard Lowe'
				image='https://image.tmdb.org/t/p/original/npJjOiFiAP4wiRDNjKsO8ho03Mg.jpg'
				mediaType='tv'
				episodeCount={28}
			/>
		</div>
	)
};

export const GroupedOldGuardExample: Story = {
	render: () => (
		<div className='flex w-full overflow-auto'>
			<TopBilledCastMember
				name='Charlize Theron'
				character='Andromache of Scythia / Andy'
				image='https://image.tmdb.org/t/p/original/1HloWLLhL3iTrmDtMigiitLB9Qx.jpg'
				mediaType='movie'
			/>

			<TopBilledCastMember
				name='Kiki Layne'
				character='Nille Freeman'
				image='https://image.tmdb.org/t/p/original/aqQNDmRLlpJvbmbpqpU4bYRXEtb.jpg'
				mediaType='movie'
			/>
		</div>
	)
};
