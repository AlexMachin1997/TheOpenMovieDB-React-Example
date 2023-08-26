import { Meta, StoryObj } from '@storybook/react';

import { Link, MemoryRouter } from 'react-router-dom';

import RecommendationCard from './Recommendation';

const meta: Meta<typeof RecommendationCard> = {
	component: RecommendationCard,
	title: 'Cards/Entertainment/Recommendation'
};

export default meta;

type Story = StoryObj<typeof RecommendationCard>;

export const Simple: Story = {
	args: {
		title: 'Ant Man and The Wasp',
		releaseDate: '07/04/2020',
		image: 'https://image.tmdb.org/t/p/original/6P3c80EOm7BodndGBUAJHHsHKrp.jpg',
		subtitle: '70%'
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
	<div className='flex w-full space-x-4 overflow-auto'>
		<RecommendationCard
			title='Black Panther'
			releaseDate='13/02/2018'
			image='https://image.tmdb.org/t/p/original/6ELJEzQJ3Y45HczvreC3dg0GV5R.jpg'
			subtitle='50%'
		/>
		<RecommendationCard
			title='Deadpool 2'
			releaseDate='05/10/2018'
			image='https://image.tmdb.org/t/p/original/3P52oz9HPQWxcwHOwxtyrVV1LKi.jpg'
			subtitle='64%'
		/>
		<RecommendationCard
			title='Spider-man: Homecoming'
			releaseDate='05/07/2018'
			image='https://image.tmdb.org/t/p/original/vc8bCGjdVp0UbMNLzHnHSLRbBWQ.jpg'
			subtitle='45%'
		/>
	</div>
);
