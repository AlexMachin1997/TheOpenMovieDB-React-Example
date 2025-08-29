import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { CommandProvider } from './CommandProvider';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';
import { Button } from '~/components/Button/Button';
import { CommandSearch } from './CommandSearch';
import { Command } from './Command';
import { CommandList } from './CommandList';
import { CommandItem } from './CommandItem';

const meta: Meta<typeof CommandProvider> = {
	title: 'Command/CommandProvider',
	component: CommandProvider,
	parameters: {
		layout: 'centered'
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

// Test component that uses the CommandProvider
const TestComponent = () => {
	const { open, toggle, searchValue } = useCommandContext();

	return (
		<div className='space-y-4'>
			<Button onClick={toggle}>{open ? 'Close' : 'Open'} Dropdown</Button>

			{open && (
				<div className='border rounded-md p-4 bg-white shadow-lg'>
					<CommandSearch placeholder='Search...' />
					<div className='mt-2'>
						<p>Search value: {searchValue}</p>
						<p>Open state: {open ? 'true' : 'false'}</p>
					</div>
				</div>
			)}
		</div>
	);
};

// Test component with Command items to demonstrate closeOnSelect
const TestComponentWithItems = () => {
	const { open, toggle } = useCommandContext();
	const [selectedItem, setSelectedItem] = React.useState<string>('');

	return (
		<div className='space-y-4'>
			<Button onClick={toggle}>{open ? 'Close' : 'Open'} Command Menu</Button>
			{selectedItem && <p>Selected: {selectedItem}</p>}

			{open && (
				<div className='border rounded-md bg-white shadow-lg w-64'>
					<Command>
						<CommandSearch placeholder='Search items...' />
						<CommandList>
							<CommandItem onSelect={() => setSelectedItem('Item 1')}>Item 1</CommandItem>
							<CommandItem onSelect={() => setSelectedItem('Item 2')}>Item 2</CommandItem>
							<CommandItem onSelect={() => setSelectedItem('Item 3')}>Item 3</CommandItem>
						</CommandList>
					</Command>
				</div>
			)}
		</div>
	);
};

const DefaultComponent = () => {
	const [items, setItems] = React.useState<unknown[]>([]);
	const [open, setOpen] = React.useState(false);

	return (
		<CommandProvider items={items} setItems={setItems} open={open} setOpen={setOpen}>
			<TestComponent />
		</CommandProvider>
	);
};

export const Default: Story = {
	render: () => <DefaultComponent />
};

const CloseOnSelectComponent = () => {
	const [items, setItems] = React.useState<unknown[]>([]);
	const [open, setOpen] = React.useState(false);

	return (
		<CommandProvider
			items={items}
			setItems={setItems}
			closeOnSelect={true}
			open={open}
			setOpen={setOpen}
		>
			<TestComponentWithItems />
		</CommandProvider>
	);
};

export const WithItemsCloseOnSelect: Story = {
	render: () => <CloseOnSelectComponent />
};

const KeepOpenComponent = () => {
	const [items, setItems] = React.useState<unknown[]>([]);
	const [open, setOpen] = React.useState(false);

	return (
		<CommandProvider
			items={items}
			setItems={setItems}
			closeOnSelect={false}
			open={open}
			setOpen={setOpen}
		>
			<TestComponentWithItems />
		</CommandProvider>
	);
};

export const WithItemsKeepOpen: Story = {
	render: () => <KeepOpenComponent />
};
