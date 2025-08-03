import { Meta, StoryObj } from '@storybook/react-vite';

import { Link, MemoryRouter } from 'react-router-dom';

import CollectionCard from '~/components/Cards/Entertainment/Movie/Collection/Collection';

const meta: Meta<typeof CollectionCard> = {
	component: CollectionCard,
	title: 'Cards/Entertainment/Movie/Collection'
};

export default meta;

type Story = StoryObj<typeof CollectionCard>;

export const Simple: Story = {
	args: {
		title: 'The Avengers',
		subtitle: 'Includes The Avengers, Avengers: Age of Ultron, Avengers: Infinity War',
		image: 'https://image.tmdb.org/t/p/original/zuW6fOiusv4X9nnW3paHGfXcSll.jpg'
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
