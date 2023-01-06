import * as React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';

import RecommendationCard from './Recommendation';

export default {
	component: RecommendationCard,
	title: 'Design System/Cards/Entertainment/Recommendation'
};

const Template = (args) => <RecommendationCard {...args} />;

const StoryArgs = {
	title: 'Ant Man and The Wasp',
	releaseDate: '07/04/2020',
	image: 'https://image.tmdb.org/t/p/original/6P3c80EOm7BodndGBUAJHHsHKrp.jpg',
	rating: 70,
	renderLink: null
};

export const Example = Template.bind({});
Example.args = {
	...StoryArgs
};

export const GroupedExample = () => (
	<div className='flex w-full space-x-4 overflow-auto'>
		<RecommendationCard
			title='Black Panther'
			releaseDate='13/02/2018'
			image='https://image.tmdb.org/t/p/original/6ELJEzQJ3Y45HczvreC3dg0GV5R.jpg'
			rating={50}
			renderLink={({ content }) => (
				<button onClick={() => console.log('clicked')} type='button'>
					{content}
				</button>
			)}
		/>
		<RecommendationCard
			title='Deadpool 2'
			releaseDate='0/5/10/2018'
			image='https://image.tmdb.org/t/p/original/3P52oz9HPQWxcwHOwxtyrVV1LKi.jpg'
			rating={64}
			renderLink={({ content }) => (
				<button onClick={() => console.log('clicked')} type='button'>
					{content}
				</button>
			)}
		/>
		<RecommendationCard
			title='Spider-man: Homecoming'
			releaseDate='05/07/2018'
			image='https://image.tmdb.org/t/p/original/vc8bCGjdVp0UbMNLzHnHSLRbBWQ.jpg'
			rating={45}
			renderLink={({ content }) => (
				<button onClick={() => console.log('clicked')} type='button'>
					{content}
				</button>
			)}
		/>
	</div>
);

export const ReactRouterLinkExample = Template.bind({});
ReactRouterLinkExample.args = {
	...Example.args,
	renderLink: ({ content }) => <Link to='/'>{content}</Link>
};
ReactRouterLinkExample.decorators = [
	(Story) => (
		<MemoryRouter>
			<Story />
		</MemoryRouter>
	)
];
