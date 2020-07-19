import React from 'react';

import CurrentSeason from './index';

export const Default = () => <CurrentSeason />;

export const Image = () => (
	<CurrentSeason image='https://image.tmdb.org/t/p/original/q3rlhCrawPHssE5kY7GeI2hN0GB.jpg' />
);

export const Title = () => <CurrentSeason title='Season 10' />;

export const Year = () => <CurrentSeason year={2019} />;

export const EpisodeCount = () => <CurrentSeason episodeCount={16} />;

export const Overview = () => (
	<CurrentSeason overview='It is now Spring, a few months after the end of Season 9, when our group of survivors dared to cross into Whisperer territory during the harsh winter. The collected communities are still dealing with the after effects of Alpha’s horrific display of power, reluctantly respecting the new borderlines being imposed on them, all while organising themselves into a militia-style fighting force, preparing for a battle that may be unavoidable. But the Whisperers are a threat unlike any they have ever faced. Backed by a massive horde of the dead it is seemingly a fight they cannot win.' />
);

export const TheWalkingDeadExample = () => (
	<CurrentSeason
		image='https://image.tmdb.org/t/p/original/q3rlhCrawPHssE5kY7GeI2hN0GB.jpg'
		title='Season 10'
		year='2016'
		episodeCount={16}
		overview='It is now Spring, a few months after the end of Season 9, when our group of survivors dared to cross into Whisperer territory during the harsh winter. The collected communities are still dealing with the after effects of Alpha’s horrific display of power, reluctantly respecting the new borderlines being imposed on them, all while organising themselves into a militia-style fighting force, preparing for a battle that may be unavoidable. But the Whisperers are a threat unlike any they have ever faced. Backed by a massive horde of the dead it is seemingly a fight they cannot win.'
	/>
);

export default {
	component: CurrentSeason,
	title: 'Card - Current Season',
};
