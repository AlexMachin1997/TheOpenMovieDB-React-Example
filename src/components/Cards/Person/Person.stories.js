import * as React from 'react';

import PersonCard from './Person';

const Template = (args) => (
	<div className='flex'>
		<PersonCard {...args} />
	</div>
);

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

// TODO: Output this in the "Storybook" Actions tab, it's currently not outputting.....
export const OnClick = Template.bind({});
OnClick.args = {
	onClick: () => 'Click'
};

export const OnKeyDown = Template.bind({});
OnKeyDown.args = {
	onKeyDown: () => 'Click'
};

export default {
	component: PersonCard,
	title: 'Design System/Cards/Person/Person'
};
