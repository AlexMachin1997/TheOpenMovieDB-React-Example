import * as React from 'react';

import Tooltip from './Tooltip';

import Icon from '../Icon/Icon';

const Template = (args) => (
	<Tooltip tooltip='Custom tooltip message' title='Custom title' {...args} />
);

export const Default = Template.bind({});
Default.args = {
	children: <Icon className='fa-brands fa-facebook-f' />
};

export const Placement = Template.bind({});
Placement.args = {
	placement: 'bottom',
	children: <Icon className='fa-brands fa-facebook-f' />
};

export const Children = Template.bind({});
Children.args = {
	children: <p>Custom children</p>
};

export const MaxWidth = Template.bind({});
MaxWidth.args = {
	children: <p>Custom children</p>,
	maxWidth: 100
};

export const Title = Template.bind({});
Title.args = {
	children: <Icon className='fa-brands fa-facebook-f' />,
	title: 'My awesome title'
};

export default {
	component: Tooltip,
	title: 'Design System/Core/Tooltip'
};
