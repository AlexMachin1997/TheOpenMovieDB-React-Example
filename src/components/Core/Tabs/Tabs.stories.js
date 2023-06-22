import * as React from 'react';
import PropTypes from 'prop-types';

import Tabs from './Tabs';

const Template = ({ tabs, children, tabClassName, activeTabClassName }) => (
	<Tabs tabs={tabs} tabClassName={tabClassName} activeTabClassName={activeTabClassName}>
		{children}
	</Tabs>
);

Template.propTypes = {
	tabs: PropTypes.array.isRequired,
	children: PropTypes.node.isRequired,
	tabClassName: PropTypes.string,
	activeTabClassName: PropTypes.string
};

Template.defaultProps = {
	tabClassName: undefined,
	activeTabClassName: undefined
};

export const TheOpenMovieDatabaseTabsExample = Template.bind({});
TheOpenMovieDatabaseTabsExample.args = {
	tabs: [
		{ label: 'Reviews', id: 'Reviews', content: 'Reviews' },
		{ label: 'Discussions', id: 'Discussions', content: 'Discussions' }
	],
	activeTabClassName: 'underline text-black',
	tabClassName: 'bg-white'
};

export const TheOpenMovieDatabaseTabsWithIconExample = Template.bind({});
TheOpenMovieDatabaseTabsWithIconExample.args = {
	tabs: [
		{ label: 'Reviews', id: 'Reviews', icon: 'fa-solid fa-book', content: 'Reviews' },
		{
			label: 'Discussions',
			id: 'Discussions',
			icon: 'fa-solid fa-walkie-talkie',
			content: 'Discussions'
		}
	],
	activeTabClassName: 'underline text-black',
	tabClassName: 'bg-white'
};

export const TheOpenMovieDatabaseTabsWithDisabledTabs = Template.bind({});
TheOpenMovieDatabaseTabsWithIconExample.args = {
	tabs: [
		{ label: 'Reviews', id: 'Reviews', icon: 'fa-solid fa-book', content: 'Reviews' },
		{
			label: 'Discussions',
			id: 'Discussions',
			icon: 'fa-solid fa-walkie-talkie',
			content: 'Discussions',
			enabled: false
		}
	],
	activeTabClassName: 'underline text-black',
	tabClassName: 'bg-white'
};

export default {
	component: Tabs,
	title: 'Design System/Core/Tabs'
};
