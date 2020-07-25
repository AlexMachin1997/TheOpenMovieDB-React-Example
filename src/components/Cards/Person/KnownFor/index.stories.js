import React from 'react';

import KnownForCard from './index';
import Preview from '../../../Blocks/Storybook/Preview';
import { CardGroup } from '../../Shared';

export const Default = () => <Preview content={<KnownForCard />} background='white' />;

export const actorName = () => (
	<Preview
		content={<KnownForCard actorName='Aurora Teagarden Mysteries: The Disappearing Game' />}
		background='white'
	/>
);

export const actorImage = () => (
	<Preview
		content={
			<KnownForCard actorImage='https://image.tmdb.org/t/p/original/d9jZ2bKZw3ptTuxAyVHA6olPAVs.jpg' />
		}
		background='white'
	/>
);

export const GroupedKnownFor = () => (
	<Preview
		content={
			<CardGroup>
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
			</CardGroup>
		}
		background='white'
	/>
);

export default {
	component: KnownForCard,
<<<<<<< HEAD
	title: 'Card -> Person -> KnownFor'
=======
	title: 'Card - KnownFor'
>>>>>>> 69ca42d4ec3b98b139feebc68236943d1716d6a6
};
