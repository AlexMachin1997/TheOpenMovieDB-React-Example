import * as React from 'react';

import Button from './Button';

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
	children: 'Login'
};

// TODO: Output this in the "Storybook" Actions tab, it's currently not outputting.....
export const OnClick = Template.bind({});
OnClick.args = {
	onClick: () => 'Click',
	children: 'Login'
};

// TODO: Output this in the "Storybook" Actions tab, it's currently not outputting.....
export const OnKeyDown = Template.bind({});
OnKeyDown.args = {
	onKeyDown: () => 'Keydown',
	children: 'Login'
};

export const AdditionalProperties = Template.bind({});
AdditionalProperties.args = {
	className: 'text-orange-400 p-2',
	children: 'Login'
};

export default {
	component: Button,
	title: 'Design System/Core/Button'
};
