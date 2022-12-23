import * as React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';

import PersonCard from './Person';

const Template = (args) => <PersonCard {...args} />;

export const Default = Template.bind({});

export const ActorName = Template.bind({});
ActorName.args = {
	name: 'Tom Hanks'
};

export const ActorImage = Template.bind({});
ActorName.args = {
	image: 'https://image.tmdb.org/t/p/w235_and_h235_face/sQRntmQpeXiNEyrW323RANWwDeS.jpg'
};

export const KnownFor = Template.bind({});
KnownFor.args = {
	knownFor: [{ original_title: 'Forrest Gump' }, { original_title: 'Toy Story' }]
};

export const PersonWithLinkElementAsButton = Template.bind({});
PersonWithLinkElementAsButton.args = {
	renderLink: ({ content }) => (
		<button onClick={() => console.log('clicked')} type='button'>
			{content}
		</button>
	)
};

export const PersonCardWithLinkElementAsReactRouterLink = Template.bind({});
PersonCardWithLinkElementAsReactRouterLink.args = {
	renderLink: ({ content }) => <Link to='/'>{content}</Link>
};
PersonCardWithLinkElementAsReactRouterLink.decorators = [
	(Story) => (
		<MemoryRouter>
			<Story />
		</MemoryRouter>
	)
];

export default {
	component: PersonCard,
	title: 'Design System/Cards/Person/Person'
};
