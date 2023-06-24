import * as React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';

import PersonCard from './Person';

const StoryArgs = {
	name: 'Bryan Cranston',
	image: 'https://image.tmdb.org/t/p/w235_and_h235_face/7Jahy5LZX2Fo8fGJltMreAI49hC.jpg',
	knownFor: [
		{ original_title: 'Saving Private Ryan' },
		{ original_title: 'Drive' },
		{ original_title: 'Godzilla' },
		{ original_title: 'Breaking bad' }
	],
	renderLink: null
};

export const Example = {
	args: {
		...StoryArgs
	}
};

export const ExampleWithoutRoles = {
	args: {
		...Example.args,
		knownFor: []
	}
};

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

export default {
	component: PersonCard,
	title: 'Design System/Cards/Person/Person'
};
