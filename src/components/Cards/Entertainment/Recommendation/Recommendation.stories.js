import * as React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';

import RecommendationCard from './Recommendation';

const Template = (args) => (
	<div className='flex'>
		<RecommendationCard {...args} />
	</div>
);

export const Default = Template.bind({});

export const Title = Template.bind({});
Title.args = {
	title: 'Thor'
};

export const ReleaseDate = Template.bind({});
ReleaseDate.args = {
	releaseDate: '05/3/2022'
};

export const Image = Template.bind({});
Image.args = {
	image: 'https://image.tmdb.org/t/p/original/kaIfm5ryEOwYg8mLbq8HkPuM1Fo.jpg'
};

export const Rating = Template.bind({});
Rating.args = {
	rating: 75
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

export const PosterWithLinkElementAsButton = Template.bind({});
PosterWithLinkElementAsButton.args = {
	renderLink: ({ content }) => (
		<button onClick={() => console.log('clicked')} type='button'>
			{content}
		</button>
	)
};

export const RecommendationCardWithLinkElementAsReactRouterLink = Template.bind({});
RecommendationCardWithLinkElementAsReactRouterLink.args = {
	renderLink: ({ content }) => <Link to='/'>{content}</Link>
};
RecommendationCardWithLinkElementAsReactRouterLink.decorators = [
	(Story) => (
		<MemoryRouter>
			<Story />
		</MemoryRouter>
	)
];

export default {
	component: RecommendationCard,
	title: 'Design System/Cards/Entertainment/Recommendation'
};
