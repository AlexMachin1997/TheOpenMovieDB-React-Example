import * as React from 'react';

import KnownForCard from './KnownFor';

export const Default = () => (
	<div className='flex'>
		<KnownForCard />
	</div>
);

export const ActorName = () => (
	<div className='flex'>
		<KnownForCard actorName='Aurora Teagarden Mysteries: The Disappearing Game' />
	</div>
);

export const ActorImage = () => (
	<div className='flex'>
		<KnownForCard actorImage='https://image.tmdb.org/t/p/original/d9jZ2bKZw3ptTuxAyVHA6olPAVs.jpg' />
	</div>
);

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
