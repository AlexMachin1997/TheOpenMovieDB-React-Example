import { Meta, StoryObj } from '@storybook/react';
import Footer from './Footer';

const meta: Meta<typeof Footer> = {
	component: Footer,
	title: 'Layout/Footer'
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Simple: Story = {};
