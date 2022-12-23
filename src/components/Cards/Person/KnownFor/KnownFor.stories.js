import * as React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';

import KnownForCard from './KnownFor';

const Template = (args) => (
	<div className='flex'>
		<KnownForCard {...args} />
	</div>
);

export const Default = Template.bind({});

export const ActorName = Template.bind({});
ActorName.args = {
	name: 'Aurora Teagarden Mysteries: The Disappearing Game'
};

export const ActorImage = Template.bind({});
ActorImage.args = {
	image: 'https://image.tmdb.org/t/p/original/d9jZ2bKZw3ptTuxAyVHA6olPAVs.jpg'
};

export const GroupedKnownFor = () => (
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
);

export const KnownForWithLinkElementAsButton = Template.bind({});
KnownForWithLinkElementAsButton.args = {
	renderLink: ({ content }) => (
		<button onClick={() => console.log('clicked')} type='button'>
			{content}
		</button>
	)
};

export const KnownForCardWithLinkElementAsReactRouterLink = Template.bind({});
KnownForCardWithLinkElementAsReactRouterLink.args = {
	renderLink: ({ content }) => <Link to='/'>{content}</Link>
};
KnownForCardWithLinkElementAsReactRouterLink.decorators = [
	(Story) => (
		<MemoryRouter>
			<Story />
		</MemoryRouter>
	)
];

export default {
	component: KnownForCard,
	title: 'Design System/Cards/Person/Know for'
};
