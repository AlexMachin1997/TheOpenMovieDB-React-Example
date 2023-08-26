import { Meta, StoryObj } from '@storybook/react';

import Tooltip from './Tooltip';
import Icon from '../Icon/Icon';

const meta: Meta<typeof Tooltip> = {
	component: Tooltip,
	title: 'Core/Tooltip'
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

const Template = (args: Story['args']) => <Tooltip tooltip='Custom tooltip message' {...args} />;

export const TooltipWithIcon: Story = {
	render: Template,
	args: {
		children: <Icon className='fa-brands fa-facebook-f' />
	}
};

export const Placement: Story = {
	render: Template,
	args: {
		placement: 'bottom',
		children: <Icon className='fa-brands fa-facebook-f' />
	}
};

export const MaxWidth: Story = {
	render: Template,
	args: {
		children: <Icon className='fa-brands fa-facebook-f' />,
		maxWidth: 100
	}
};
