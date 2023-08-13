import { Meta, StoryObj } from '@storybook/react';

import { Link, MemoryRouter } from 'react-router-dom';

import PersonCard from './Person';

const meta: Meta<typeof PersonCard> = {
	component: PersonCard,
	title: 'Cards/Person/Person'
};

export default meta;

type Story = StoryObj<typeof PersonCard>;

export const Simple: Story = {
	args: {
		name: 'Bryan Cranston',
		image: 'https://image.tmdb.org/t/p/w235_and_h235_face/7Jahy5LZX2Fo8fGJltMreAI49hC.jpg',
		knownFor: [
			{ original_title: 'Saving Private Ryan' },
			{ original_title: 'Drive' },
			{ original_title: 'Godzilla' },
			{ original_title: 'Breaking bad' }
		]
	}
};

export const NoKnownForRolesAvailable: Story = {
	args: {
		...Simple.args,
		knownFor: []
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
