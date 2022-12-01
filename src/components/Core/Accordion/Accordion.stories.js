import * as React from 'react';

import Accordion from './Accordion';

const DefaultStoryArgs = {
	children: 'Will only show when the Accordion is open',
	title: 'What is refund your refund policy'
};

const Template = (args) => <Accordion {...args} />;

export const DefaultIsOpen = Template.bind({});
DefaultIsOpen.args = {
	...DefaultStoryArgs,
	defaultIsOpen: true
};

export const IsDisabled = Template.bind({});
IsDisabled.args = {
	...DefaultStoryArgs,
	isDisabled: true
};

export const FullExample = Template.bind({});
FullExample.args = {
	...DefaultStoryArgs
};

export default {
	component: Accordion,
	title: 'Design System/Core/Accordion'
};
