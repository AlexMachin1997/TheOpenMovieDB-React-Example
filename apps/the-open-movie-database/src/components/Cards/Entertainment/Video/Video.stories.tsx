import { Meta, StoryObj } from '@storybook/react-vite';

import { Link, MemoryRouter } from 'react-router-dom';

import VideoCard from '~/components/Cards/Entertainment/Video/Video';

const meta: Meta<typeof VideoCard> = {
	component: VideoCard,
	title: 'Cards/Entertainment/Video'
};

export default meta;

type Story = StoryObj<typeof VideoCard>;

export const Simple: Story = {
	args: {
		title: 'The Umbrella Academy',
		subtitle: 'The Umbrella Academy Season 2 | Official Trailer | Netflix',
		image: 'https://image.tmdb.org/t/p/original/mE3zzMkpP8yqlkzdjPsQmJHceoe.jpg'
	}
};

export const RenderLink: Story = {
	args: {
		...Simple.args,
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

export const GroupedExample = () => (
	<div className='flex w-full overflow-auto'>
		<VideoCard
			title='Marvel Agents of S.H.I.E.L.D'
			subtitle="Marvel's Agents of S.H.I.E.L.D. - Official Season 7 Trailer"
			image='https://image.tmdb.org/t/p/original/mUCV0W6TaAk8UWA5yAmqCywC63F.jpg'
		/>

		<VideoCard
			title='The Umbrella Academy'
			subtitle='The Umbrella Academy Season 2 | Official Trailer | Netflix'
			image='https://image.tmdb.org/t/p/original/mE3zzMkpP8yqlkzdjPsQmJHceoe.jpg'
		/>
	</div>
);
