import type { Meta, StoryObj } from '@storybook/react-vite';
import { VirtualizedList } from './VirtualizedList';

const meta: Meta<typeof VirtualizedList> = {
	title: 'Command/VirtualizedList',
	component: VirtualizedList,
	parameters: {
		layout: 'centered'
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

// Generate test data
interface TestItem {
	id: number;
	value: string;
	label: string;
}

const generateItems = (count: number): TestItem[] => {
	return Array.from({ length: count }, (_, i) => ({
		id: i,
		value: `item-${i}`,
		label: `Item ${i + 1}`
	}));
};

export const Default: Story = {
	render: () => {
		const items = generateItems(100);

		return (
			<div className='w-64 h-64 border rounded-md'>
				<VirtualizedList<TestItem> items={items}>
					{({ item, style }) => (
						<div style={style} className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
							{item.label}
						</div>
					)}
				</VirtualizedList>
			</div>
		);
	}
};

export const CustomSize: Story = {
	render: () => {
		const items = generateItems(50);

		return (
			<div className='w-80 h-96 border rounded-md'>
				<VirtualizedList<TestItem> items={items} estimateSize={48} overscan={3} maxHeight='100%'>
					{({ item, style }) => (
						<div style={style} className='px-4 py-3 hover:bg-blue-100 cursor-pointer border-b'>
							<div className='font-medium'>{item.label}</div>
							<div className='text-sm text-gray-500'>ID: {item.id}</div>
						</div>
					)}
				</VirtualizedList>
			</div>
		);
	}
};
