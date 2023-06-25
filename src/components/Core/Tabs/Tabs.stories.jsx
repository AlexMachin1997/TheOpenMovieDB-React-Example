import * as React from 'react';
import PropTypes from 'prop-types';

import Tabs from './Tabs';

const Template = ({ tabs, children, tabClassName, activeTabClassName }) => (
	<Tabs tabs={tabs} tabClassName={tabClassName} activeTabClassName={activeTabClassName}>
		{children}
	</Tabs>
);

Template.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	tabs: PropTypes.array.isRequired,
	children: PropTypes.node.isRequired,
	tabClassName: PropTypes.string,
	activeTabClassName: PropTypes.string
};

Template.defaultProps = {
	tabClassName: undefined,
	activeTabClassName: undefined
};

export const TheOpenMovieDatabaseTabsExample = {
	render: Template,

	args: {
		tabs: [
			{ label: 'Reviews', id: 'Reviews', content: 'Reviews' },
			{ label: 'Discussions', id: 'Discussions', content: 'Discussions' }
		],
		activeTabClassName: 'underline text-black',
		tabClassName: 'bg-white'
	}
};

export const TheOpenMovieDatabaseTabsWithIconExample = {
	render: Template,

	args: {
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
	}
};

export const TheOpenMovieDatabaseTabsWithDisabledTabs = {
	render: Template
};

export default {
	component: Tabs,
	title: 'Design System/Core/Tabs'
};
