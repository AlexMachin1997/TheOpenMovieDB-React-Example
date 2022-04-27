import * as React from 'react';

import CurrentSeasonCard from './CurrentSeason';

const Template = (args) => (
	<div className='flex'>
		<CurrentSeasonCard {...args} />
	</div>
);

export const Default = Template.bind({});

export const Title = Template.bind({});
Title.args = {
	title: 'Season 10'
};

export const Image = Template.bind({});
Image.args = {
	image: 'https://image.tmdb.org/t/p/original/q3rlhCrawPHssE5kY7GeI2hN0GB.jpg'
};

export const Year = Template.bind({});
Year.args = {
	year: 2020
};

export const EpisodeCount = Template.bind({});
EpisodeCount.args = {
	episodeCount: 16
};

export const Overview = Template.bind({});
Overview.args = {
	overview:
		'It is now Spring, a few months after the end of Season 9, when our group of survivors dared to cross into Whisperer territory during the harsh winter. The collected communities are still dealing with the after effects of Alpha’s horrific display of power, reluctantly respecting the new borderlines being imposed on them, all while organising themselves into a militia-style fighting force, preparing for a battle that may be unavoidable. But the Whisperers are a threat unlike any they have ever faced. Backed by a massive horde of the dead it is seemingly a fight they cannot win.'
};

export default {
	component: CurrentSeasonCard,
	title: 'Design System/Cards/Entertainment/TV/CurrentSeason'
};
