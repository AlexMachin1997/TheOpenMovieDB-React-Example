import { Meta, StoryObj } from '@storybook/react';

import { Link, MemoryRouter } from 'react-router-dom';

import KnownForCard from './KnownFor';

const meta: Meta<typeof KnownForCard> = {
	component: KnownForCard,
	title: 'Cards/Person/Known For'
};

export default meta;

type Story = StoryObj<typeof KnownForCard>;

export const Simple: Story = {
	args: {
		name: 'Timeless',
		image: 'https://image.tmdb.org/t/p/w150_and_h225_bestv2/wFaS9kROwztTWNxIKBbOLwIgApV.jpg'
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

export const GroupedExample: Story = {
	render: () => (
		<div className='flex w-full overflow-auto'>
			<KnownForCard
				name='Fast and furious 7'
				image='https://image.tmdb.org/t/p/original/d9jZ2bKZw3ptTuxAyVHA6olPAVs.jpg'
			/>

			<KnownForCard
				name='Fast and furious 6'
				image='https://image.tmdb.org/t/p/original/n31VRDodbaZxkrZmmzyYSFNVpW5.jpg'
			/>

			<KnownForCard
				name='Fate Of The Furious'
				image='https://image.tmdb.org/t/p/original/dImWM7GJqryWJO9LHa3XQ8DD5NH.jpg'
			/>
		</div>
	)
};
