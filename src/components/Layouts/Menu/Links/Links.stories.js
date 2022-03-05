import * as React from 'react';

import { MemoryRouter } from 'react-router-dom';

import LinksComponent from './Links';

const Template = (args) => <LinksComponent {...args} />;

export const Default = Template.bind({});

export const Links = Template.bind({});
Links.args = {
	links: [
		{ url: '/', menuTitle: 'Popular' },
		{ url: '/', menuTitle: 'Now Playing' },
		{ url: '/', menuTitle: 'Upcoming' },
		{ url: '/', menuTitle: 'Top Rated' }
	]
};

export const OnItemClick = Template.bind({});
OnItemClick.args = {
	links: [{ url: '/', menuTitle: 'Awesome menu item' }]
};

export const WrapperTag = Template.bind({});
WrapperTag.args = {
	wrapperTag: 'div',
	links: [{ url: '/', menuTitle: 'Awesome menu item' }]
};

export const ListItemClassName = Template.bind({});
ListItemClassName.args = {
	listItemClassName: 'pl-4 pr-4 cursor-pointer p-2',
	links: [
		{ url: '/', menuTitle: 'Popular' },
		{ url: '/', menuTitle: 'Now Playing' },
		{ url: '/', menuTitle: 'Upcoming' },
		{ url: '/', menuTitle: 'Top Rated' }
	]
};

export const AnchorClassName = Template.bind({});
AnchorClassName.args = {
	anchorClassName: 'text-white text-2xl	p-0 m-0',
	links: [{ url: '/', menuTitle: 'Awesome menu item' }]
};

export default {
	title: 'Design System/Layouts/Menu/Links',
	component: Links,
	argTypes: { onItemClick: { action: 'onItemClick click' } },
	decorators: [
		(Story) => (
			<MemoryRouter>
				<div className='bg-primary opacity-90'>
					<Story />
				</div>
			</MemoryRouter>
		)
	]
};
