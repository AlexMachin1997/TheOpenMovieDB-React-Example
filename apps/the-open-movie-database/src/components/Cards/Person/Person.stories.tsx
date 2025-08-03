import { Meta, StoryObj } from '@storybook/react-vite';

import { Link, MemoryRouter } from 'react-router-dom';

import PersonCard from '~/components/Cards/Person/Person';

const meta: Meta<typeof PersonCard> = {
	component: PersonCard,
	title: 'Cards/Person/Person'
};

export default meta;

type Story = StoryObj<typeof PersonCard>;

export const Simple: Story = {
	args: {
		title: 'Bryan Cranston',
		image: 'https://image.tmdb.org/t/p/w235_and_h235_face/7Jahy5LZX2Fo8fGJltMreAI49hC.jpg',
		subtitle: 'Saving Private Ryan, Drive, Godzilla, Breaking Bad'
	}
};

export const NoKnownForRolesAvailable: Story = {
	args: {
		...Simple.args,
		subtitle: ''
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
