import { Meta, StoryObj } from '@storybook/react';

import Tabs from './Tabs';

const meta: Meta<typeof Tabs> = {
	component: Tabs,
	title: 'Design System/Core/Tabs'
};

export default meta;

type Story = StoryObj<typeof Tabs>;

const Template = ({ tabs = [], tabClassName, activeTabClassName }: Story['args'] = {}) => (
	<Tabs tabs={tabs} tabClassName={tabClassName} activeTabClassName={activeTabClassName} />
);

export const TabsExample: Story = {
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

export const TabsWithIcons: Story = {
	render: Template,
	args: {
		tabs: [
			{ label: 'Reviews', id: 'Reviews', icon: 'fa-solid fa-book', content: 'Reviews' },
			{
				label: 'Discussions',
				id: 'Discussions',
				icon: 'fa-solid fa-walkie-talkie',
				content: 'Discussions',
				enabled: true
			}
		],
		activeTabClassName: 'underline text-black',
		tabClassName: 'bg-white'
	}
};

export const TabsWithIconsAndDisabledTabs: Story = {
	render: Template,
	args: {
		tabs: [
			{
				label: 'Reviews',
				id: 'Reviews',
				icon: 'fa-solid fa-book',
				content: 'Reviews',
				enabled: true
			},
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
