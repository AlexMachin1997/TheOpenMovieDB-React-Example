import React from 'react';

import KnownForCard from './index';
import Preview from '../../../Blocks/Storybook/Preview';
import Column from '../../../Layouts/Column';
import Row from '../../../Layouts/Row';

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
			<KnownForCard actorImage='https://image.tmdb.org/t/p/w150_and_h225_bestv2/d9jZ2bKZw3ptTuxAyVHA6olPAVs.jpg' />
		}
		background='white'
	/>
);

export const GroupedKnownFor = () => (
	<Preview
		content={
			<Row>
				<Column autoWidth>
					<KnownForCard
						actorName='Fast and furious 7'
						actorImage='https://image.tmdb.org/t/p/w150_and_h225_bestv2/d9jZ2bKZw3ptTuxAyVHA6olPAVs.jpg'
					/>
				</Column>
				<Column autoWidth>
					<KnownForCard
						actorName='Fast and furious 6'
						actorImage='https://image.tmdb.org/t/p/w150_and_h225_bestv2/n31VRDodbaZxkrZmmzyYSFNVpW5.jpg'
					/>
				</Column>
				<Column>
					<KnownForCard
						actorName='Fate Of The Furious'
						actorImage='https://image.tmdb.org/t/p/w150_and_h225_bestv2/dImWM7GJqryWJO9LHa3XQ8DD5NH.jpg'
					/>
				</Column>
			</Row>
		}
		background='white'
	/>
);

export default {
	component: KnownForCard,
	title: 'Card - KnownFor',
};
