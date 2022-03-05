import * as React from 'react';

import KnownForCard from './KnownFor';

const Template = (args) => (
	<div className='flex'>
		<KnownForCard {...args} />
	</div>
);

export const Default = Template.bind({});

export const ActorName = Template.bind({});
ActorName.args = {
	actorName: 'Aurora Teagarden Mysteries: The Disappearing Game'
};

export const ActorImage = Template.bind({});
ActorImage.args = {
	actorImage: 'https://image.tmdb.org/t/p/original/d9jZ2bKZw3ptTuxAyVHA6olPAVs.jpg'
};

export const GroupedKnownFor = () => (
	<div className='w-100 flex overflow-x-auto overflow-y-auto'>
		<KnownForCard
			actorName='Fast and furious 7'
			actorImage='https://image.tmdb.org/t/p/original/d9jZ2bKZw3ptTuxAyVHA6olPAVs.jpg'
		/>

		<KnownForCard
			actorName='Fast and furious 6'
			actorImage='https://image.tmdb.org/t/p/original/n31VRDodbaZxkrZmmzyYSFNVpW5.jpg'
		/>

		<KnownForCard
			actorName='Fate Of The Furious'
			actorImage='https://image.tmdb.org/t/p/original/dImWM7GJqryWJO9LHa3XQ8DD5NH.jpg'
		/>
	</div>
);

export default {
	component: KnownForCard,
	title: 'Design System/Cards/Person/Know for'
};
