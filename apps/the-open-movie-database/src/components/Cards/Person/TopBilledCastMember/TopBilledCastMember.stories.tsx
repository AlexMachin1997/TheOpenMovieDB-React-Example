import { Meta, StoryObj } from '@storybook/react-vite';

import { Link, MemoryRouter } from 'react-router-dom';

import TopBilledCastMember from './TopBilledCastMember';
import { MEDIA_TYPE } from '../../../../types/RoutingTypes';

const meta: Meta<typeof TopBilledCastMember> = {
	component: TopBilledCastMember,
	title: 'Cards/Person/Top Billed Cast Member'
};

export default meta;

type Story = StoryObj<typeof TopBilledCastMember>;

export const MediaTypeMovie: Story = {
	args: {
		title: 'Elizabeth Henstridge',
		subtitle: 'Jemma Simmons',
		image: 'https://image.tmdb.org/t/p/original/ohoSW1kYL3GMlFgGWuLEC1IzjmE.jpg',
		mediaType: MEDIA_TYPE.MOVIE
	}
};

export const MediaTypeTV: Story = {
	args: {
		...(MediaTypeMovie.args ?? {}),
		mediaType: MEDIA_TYPE.TV,
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
				title='Evan Rachel Wood'
				subtitle='Delores Abernathy, Christina'
				image='https://image.tmdb.org/t/p/original/g6XBBmsEd9fqP0gc4RuHsX0MXNl.jpg'
				mediaType={MEDIA_TYPE.TV}
				episodeCount={28}
			/>

			<TopBilledCastMember
				title='Thandie Newton'
				subtitle='Maeve Millay'
				image='https://image.tmdb.org/t/p/original/hZQLvxj7nV7pBrRyWTvWVz1CDi8.jpg'
				mediaType={MEDIA_TYPE.TV}
				episodeCount={28}
			/>

			<TopBilledCastMember
				title='Jeffrey Wright'
				subtitle='Bernard Lowe'
				image='https://image.tmdb.org/t/p/original/npJjOiFiAP4wiRDNjKsO8ho03Mg.jpg'
				mediaType={MEDIA_TYPE.TV}
				episodeCount={28}
			/>
		</div>
	)
};

export const GroupedOldGuardExample: Story = {
	render: () => (
		<div className='flex w-full overflow-auto'>
			<TopBilledCastMember
				title='Charlize Theron'
				subtitle='Andromache of Scythia / Andy'
				image='https://image.tmdb.org/t/p/original/1HloWLLhL3iTrmDtMigiitLB9Qx.jpg'
				mediaType={MEDIA_TYPE.MOVIE}
			/>

			<TopBilledCastMember
				title='Kiki Layne'
				subtitle='Nille Freeman'
				image='https://image.tmdb.org/t/p/original/aqQNDmRLlpJvbmbpqpU4bYRXEtb.jpg'
				mediaType={MEDIA_TYPE.MOVIE}
			/>
		</div>
	)
};
