import { Meta, StoryObj } from '@storybook/react-vite';
import Footer from '~/components/Layouts/Footer/Footer';

const meta: Meta<typeof Footer> = {
	component: Footer,
	title: 'Layout/Footer'
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Simple: Story = {};
