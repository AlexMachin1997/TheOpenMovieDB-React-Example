import { Meta, StoryObj } from '@storybook/react-vite';

import { Link, MemoryRouter } from 'react-router-dom';

import PosterCard from '~/components/Cards/Entertainment/Poster/Poster';

const meta: Meta<typeof PosterCard> = {
	title: 'Cards/Entertainment/Poster',
	component: PosterCard,
	decorators: [
		(StoryComponent) => (
			<div className='flex max-w-[12rem]'>
				<StoryComponent />
			</div>
		)
	]
};

export default meta;

type Story = StoryObj<typeof PosterCard>;

export const Simple: Story = {
	args: {
		title: 'Dark',
		subtitle: 'Dec 01, 2017',
		rating: 50,
		image: 'https://image.tmdb.org/t/p/original/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg',
		renderLink: null
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

export const BadRating: Story = {
	args: { ...Simple.args, rating: 10 }
};

export const MediumRating: Story = {
	args: { ...Simple.args, rating: 50 }
};

export const GreatRating: Story = {
	args: { ...Simple.args, rating: 100 }
};
