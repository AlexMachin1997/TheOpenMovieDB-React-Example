import * as React from 'react';

import Dropdown from './Dropdown';

const Template = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
	children: <p>Children are required for this component</p>
};

export const Title = Template.bind({});
Title.args = {
	title: 'My custom title'
};

export const ButtonClass = Template.bind({});
ButtonClass.args = {
	buttonClass: 'text-indigo-500'
};

export const DropdownClass = Template.bind({});
DropdownClass.args = {
	dropdownClass: 'bg-white border-slate-300 border-[1px]'
};

// TODO: Output this in the "Storybook" Actions tab, it's currently not outputting.....
export const OnClick = Template.bind({});
OnClick.args = {
	onClick: () => 'Hello'
};

export default {
	component: Dropdown,
	title: 'Design System/Core/Dropdown'
};
