import * as React from 'react';
import { action } from '@storybook/addon-actions';

import Overview from './Overview';
import Preview from '../../../Blocks/Storybook/Preview';
import { GroupedExample } from '../../Shared';

export const Default = () => <Overview />;

export const Image = () => (
	<Preview
		content={
			<Overview image='https://image.tmdb.org/t/p/original/q3rlhCrawPHssE5kY7GeI2hN0GB.jpg' />
		}
	/>
);

export const Title = () => <Preview content={<Overview title='The Walking Dead' />} />;

export const OverviewProperty = () => (
	<Preview
		content={
			<Overview overview='Sixth-grader Peter is pretty much your average kid—he likes gaming, hanging with his friends and his beloved pair of Air Jordans. But when his recently widowed grandfather Ed  moves in with Peter’s family, the boy is forced to give up his most prized possession of all, his bedroom. Unwilling to let such an injustice stand, Peter devises a series of increasingly elaborate pranks to drive out the interloper, but Grandpa Ed won’t go without a fight.' />
		}
	/>
);

export const ReleaseDate = () => (
	<Preview content={<Overview releaseDate='10th October, 2010' />} />
);

export const OnClick = () => <Preview content={<Overview onClick={action('Search Result')} />} />;

export const Rating = () => <Preview content={<Overview rating={100} />} />;

export const GroupExample = () => (
	<>
		<GroupedExample>
			<Overview overview='Sixth-grader Peter is pretty much your average kid—he likes gaming, hanging with his friends and his beloved pair of Air Jordans. But when his recently widowed grandfather Ed  moves in with Peter’s family, the boy is forced to give up his most prized possession of all, his bedroom. Unwilling to let such an injustice stand, Peter devises a series of increasingly elaborate pranks to drive out the interloper, but Grandpa Ed won’t go without a fight.' />

			<Overview overview='Sixth-grader Peter is pretty much your average kid—he likes gaming, hanging with his friends and his beloved pair of Air Jordans. But when his recently widowed grandfather Ed  moves in with Peter’s family, the boy is forced to give up his most prized possession of all, his bedroom. Unwilling to let such an injustice stand, Peter devises a series of increasingly elaborate pranks to drive out the interloper, but Grandpa Ed won’t go without a fight.' />

			<Overview overview='Sixth-grader Peter is pretty much your average kid—he likes gaming, hanging with his friends and his beloved pair of Air Jordans. But when his recently widowed grandfather Ed  moves in with Peter’s family, the boy is forced to give up his most prized possession of all, his bedroom. Unwilling to let such an injustice stand, Peter devises a series of increasingly elaborate pranks to drive out the interloper, but Grandpa Ed won’t go without a fight.' />

			<Overview overview='Sixth-grader Peter is pretty much your average kid—he likes gaming, hanging with his friends and his beloved pair of Air Jordans. But when his recently widowed grandfather Ed  moves in with Peter’s family, the boy is forced to give up his most prized possession of all, his bedroom. Unwilling to let such an injustice stand, Peter devises a series of increasingly elaborate pranks to drive out the interloper, but Grandpa Ed won’t go without a fight.' />
		</GroupedExample>
	</>
);

export default {
	component: Overview,
	title: 'Design System/Cards/Entertainment/Overview'
};
