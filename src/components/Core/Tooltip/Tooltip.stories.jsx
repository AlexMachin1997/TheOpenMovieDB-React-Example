import * as React from 'react';

import Tooltip from './Tooltip';

import Icon from '../Icon/Icon';

const Template = (args) => (
	<Tooltip tooltip='Custom tooltip message' title='Custom title' {...args} />
);

export const Default = {
	render: Template,

	args: {
		children: <Icon className='fa-brands fa-facebook-f' />
	}
};

export const Placement = {
	render: Template,

	args: {
		placement: 'bottom',
		children: <Icon className='fa-brands fa-facebook-f' />
	}
};

export const Children = {
	render: Template,

	args: {
		children: <p>Custom children</p>
	}
};

export const MaxWidth = {
	render: Template,

	args: {
		children: <p>Custom children</p>,
		maxWidth: 100
	}
};

export const Title = {
	render: Template,

	args: {
		children: <Icon className='fa-brands fa-facebook-f' />,
		title: 'My awesome title'
	}
};

export default {
	component: Tooltip,
	title: 'Design System/Core/Tooltip'
};
