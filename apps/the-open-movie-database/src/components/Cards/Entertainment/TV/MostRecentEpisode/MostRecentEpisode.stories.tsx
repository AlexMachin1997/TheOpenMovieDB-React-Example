import { Meta, StoryObj } from '@storybook/react-vite';

import { Link, MemoryRouter } from 'react-router-dom';

import MostRecentEpisode from '~/components/Cards/Entertainment/TV/MostRecentEpisode/MostRecentEpisode';

const meta: Meta<typeof MostRecentEpisode> = {
	component: MostRecentEpisode,
	title: 'Cards/Entertainment/TV/Most Recent Episode Card'
};

export default meta;

type Story = StoryObj<typeof MostRecentEpisode>;

export const Simple: Story = {
	args: {
		image: 'https://www.themoviedb.org/t/p/w260_and_h390_bestv2/8MfgyFHf7XEboZJPZXCIDqqiz6e.jpg',
		title: 'Season Four: The Choice',
		releaseYear: 2022,
		numberOfEpisodesInTheSeason: 8,
		overview:
			'The season picks up over seven years later after the protracted war – humanity is finally free. Or so it seems. Maeve and Caleb begin to suspect that Hale and a host version of The Man in Black are trying to regain control of the human race. Meanwhile, Bernard returns from The Sublime. A young writer, Christina, begins to question the nature of her reality.',
		airDate: 'August 14 2022',
		episodeAndSeason: '4x8',
		episodeName: 'Que Será, Será'
	}
};

export const FinalEpisodeHasAired: Story = {
	args: {
		...Simple.args,
		hasFinalEpisodeAir: true
	}
};

export const WithEpisodeRating: Story = {
	args: {
		...Simple.args,
		rating: 7.3,
		hasFinalEpisodeAir: true
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
