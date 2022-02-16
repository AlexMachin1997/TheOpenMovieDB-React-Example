import * as React from 'react';

import { MemoryRouter } from 'react-router-dom';

import MobileMenuDropdown from './MobileMenuDropdown';

const Template = (args) => <MobileMenuDropdown {...args} />;

export const Default = Template.bind({});

export const Title = Template.bind({});
Title.args = {
	title: 'People'
};

export const Items = Template.bind({});
Items.args = {
	title: 'People',
	items: [
		{ text: 'Popular', to: '/', type: 'internal' },
		{ text: 'Discover', to: '/', type: 'internal' },
		{ text: 'Now Playing', to: '/', type: 'internal' }
	]
};

export const OnItemClick = Template.bind({});
OnItemClick.args = {
	title: 'People',
	items: [
		{ text: 'Popular', to: '/', type: 'internal' },
		{ text: 'Discover', to: '/', type: 'internal' },
		{ text: 'Now Playing', to: '/', type: 'internal' }
	],
	onItemClick: () => 'Hello'
};

export default {
	title: 'Design System/Layouts/Menu/Mobile Menu Dropdown',
	component: MobileMenuDropdown,
	decorators: [
		(Story) => (
			<MemoryRouter>
				<div className='bg-primary opacity-90'>
					<Story />
				</div>
			</MemoryRouter>
		)
	],
	argTypes: {
		onItemClick: { action: 'clicked' }
	}
};
