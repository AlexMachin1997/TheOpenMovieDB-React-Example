import { Meta, StoryObj } from '@storybook/react';

import { Link, MemoryRouter } from 'react-router-dom';

import CurrentSeasonCard from './CurrentSeason';

const meta: Meta<typeof CurrentSeasonCard> = {
	component: CurrentSeasonCard,
	title: 'Cards/Entertainment/TV/Current Season'
};

export default meta;

type Story = StoryObj<typeof CurrentSeasonCard>;

export const Simple: Story = {
	args: {
		image: 'https://image.tmdb.org/t/p/original/eFWtQwYetPum9RvCmqkUk2aiBIi.jpg',
		title: 'Season Three: The New World',
		year: 2020,
		episodeCount: 8,
		overview:
			'Taking place immediately after the events of the second season, Dolores develops a relationship with Caleb in neo-Los Angeles, and learns how robots are treated in the real world. Meanwhile, Maeve finds herself in another Delos park, this one with a World War II theme and set in Fascist Italy.'
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
