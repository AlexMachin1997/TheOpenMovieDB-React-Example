import * as React from 'react';

import Dropdown from './Dropdown';

const Template = (args) => <Dropdown {...args} />;

const DefaultStoryArgs = {
	title: 'Default title',
	buttonClass: '',
	dropdownClass: '',
	containerClass: '',
	onClick: null,
	alignment: 'left',
	children: <p>Children are required for this component</p>
};

export const Default = Template.bind({});
Default.args = {
	...DefaultStoryArgs,
	children: <p>Children are required for this component</p>
};

export const Title = Template.bind({});
Title.args = {
	...DefaultStoryArgs,
	title: 'My custom title'
};

export const ButtonClass = Template.bind({});
ButtonClass.args = {
	...DefaultStoryArgs,
	buttonClass: 'text-indigo-500'
};

export const DropdownClass = Template.bind({});
DropdownClass.args = {
	...DefaultStoryArgs,
	dropdownClass: 'bg-white border-slate-300 border-[1px]'
};

// TODO: Output this in the "Storybook" Actions tab, it's currently not outputting.....
export const OnClick = Template.bind({});
OnClick.args = {
	...DefaultStoryArgs,
	onClick: () => 'Hello'
};

export default {
	component: Dropdown,
	title: 'Design System/Core/Dropdown'
};
