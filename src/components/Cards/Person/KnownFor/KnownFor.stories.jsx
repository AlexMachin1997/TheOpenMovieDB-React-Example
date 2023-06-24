import * as React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';

import KnownForCard from './KnownFor';

export default {
	component: KnownForCard,
	title: 'Design System/Cards/Person/Know for'
};

const StoryArgs = {
	name: 'Timeless',
	image: 'https://image.tmdb.org/t/p/w150_and_h225_bestv2/wFaS9kROwztTWNxIKBbOLwIgApV.jpg',
	renderLink: null
};

export const Example = {
	args: { ...StoryArgs }
};

export const GroupedExample = () => (
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

export const ReactRouterLinkExample = {
	args: {
		...Example.args,
		renderLink: ({ content }) => <Link to='/'>{content}</Link>
	},

	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		)
	]
};
