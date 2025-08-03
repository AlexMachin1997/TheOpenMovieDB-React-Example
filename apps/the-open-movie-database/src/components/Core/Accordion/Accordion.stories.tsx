import type { Meta, StoryObj } from '@storybook/react-vite';

import Accordion from '~/components/Core/Accordion/Accordion';

const meta: Meta<typeof Accordion> = {
	component: Accordion,
	title: 'Core/Accordion'
};

export default meta;

type Story = StoryObj<typeof Accordion>;

const DefaultStoryArgs: Story['args'] = {
	children: 'Will only show when the Accordion is open',
	title: 'What is refund your refund policy'
};

export const DefaultIsOpen: Story = {
	args: {
		...DefaultStoryArgs,
		defaultIsOpen: true
	}
};

export const IsDisabled: Story = {
	args: {
		...DefaultStoryArgs,
		isDisabled: true
	}
};

export const FullExample: Story = {
	args: {
		...DefaultStoryArgs
	}
};
