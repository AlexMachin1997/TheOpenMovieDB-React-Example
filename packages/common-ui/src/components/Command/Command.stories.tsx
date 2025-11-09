import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import {
	SearchIcon,
	CalendarIcon,
	SettingsIcon,
	UserIcon,
	FileTextIcon,
	HomeIcon
} from 'lucide-react';
import {
	Command,
	CommandDialog,
	CommandProvider,
	CommandListItems,
	CommandVirtualizedList,
	CommandGroupedList,
	CommandGroupedVirtualizedList,
	CommandItem,
	CommandShortcut,
	CommandInterface
} from '~/components/Command/components';
// Internal components for stories
import type { Option } from '~/types/Option';

type CommandVirtualizedStorybookTypes = {
	estimateSize?: number;
	overscan?: number;
	className?: string;
};

type CommandGroupedStorybookTypes = {
	groupOrder?: string[];
	ungroupedPosition?: 'top' | 'bottom';
	className?: string;
};

type CommandGroupedVirtualizedStorybookTypes = {
	estimateSize?: number;
	overscan?: number;
	ungroupedPosition?: 'top' | 'bottom';
	className?: string;
};

type CommandBasicStorybookTypes = {
	showClearButton?: boolean;
	searchPlaceholder?: string;
};

const meta: Meta<typeof Command> = {
	title: 'Components/Command',
	component: Command,
	parameters: {
		layout: 'centered'
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Command Component Template
const BasicCommandTemplate = (args: CommandBasicStorybookTypes) => {
	const [open, setOpen] = React.useState(false);

	// Basic options for the command
	const options: Option[] = React.useMemo(
		() => [
			{ id: 'calendar', value: 'calendar', label: 'Calendar' },
			{ id: 'search-emoji', value: 'search-emoji', label: 'Search Emoji' },
			{ id: 'calculator', value: 'calculator', label: 'Calculator' },
			{ id: 'profile', value: 'profile', label: 'Profile' },
			{ id: 'settings', value: 'settings', label: 'Settings' },
			{ id: 'dashboard', value: 'dashboard', label: 'Dashboard' }
		],
		[]
	);

	return (
		<div className='w-[350px]'>
			<CommandProvider open={open} setOpen={setOpen} options={options}>
				<CommandInterface
					searchConfig={{
						searchPlaceholder: args.searchPlaceholder || 'Search',
						showClearButton: args.showClearButton || false
					}}
				>
					<CommandListItems>
						{({ item }) => (
							<CommandItem key={item.id} value={item.value} className='flex items-center gap-2'>
								{item.value === 'calendar' && <CalendarIcon className='size-4' />}
								{item.value === 'search-emoji' && <SearchIcon className='size-4' />}
								{item.value === 'calculator' && <FileTextIcon className='size-4' />}
								{item.value === 'profile' && <UserIcon className='size-4' />}
								{item.value === 'settings' && <SettingsIcon className='size-4' />}
								{item.value === 'dashboard' && <HomeIcon className='size-4' />}
								<span>{item.label}</span>
							</CommandItem>
						)}
					</CommandListItems>
				</CommandInterface>
			</CommandProvider>
		</div>
	);
};

export const Basic: Story = {
	render: (args) => <BasicCommandTemplate {...args} />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Test 1: User opens command palette and sees available options
		const searchInput = canvas.getByPlaceholderText('Search');
		expect(searchInput).toBeInTheDocument();

		// User should see all available options initially
		await waitFor(() => {
			expect(canvas.getByText('Calendar')).toBeInTheDocument();
			expect(canvas.getByText('Settings')).toBeInTheDocument();
			expect(canvas.getByText('Profile')).toBeInTheDocument();
		});

		// Test 2: User searches for a specific option
		await userEvent.type(searchInput, 'calendar');
		await waitFor(() => {
			expect(canvas.getByText('Calendar')).toBeInTheDocument();
			// Other options should be filtered out
			expect(canvas.queryByText('Settings')).not.toBeInTheDocument();
		});

		// Test 3: User searches for something that doesn't exist
		await userEvent.clear(searchInput);
		await userEvent.type(searchInput, 'nonexistent');
		await waitFor(() => {
			expect(canvas.getByText('No options for "nonexistent"')).toBeInTheDocument();
		});

		// Test 4: User clears search and selects an option
		await userEvent.clear(searchInput);
		await userEvent.type(searchInput, 'settings');
		await waitFor(() => {
			expect(canvas.getByText('Settings')).toBeInTheDocument();
		});

		// User clicks to select the option
		await userEvent.click(canvas.getByText('Settings'));
	}
};

export const WithClearButton: StoryObj<CommandBasicStorybookTypes> = {
	render: (args) => <BasicCommandTemplate {...args} />,
	args: {
		showClearButton: true,
		searchPlaceholder: 'Search'
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Test 1: User opens command palette - no clear button visible initially
		const searchInput = canvas.getByPlaceholderText('Search');
		expect(searchInput).toBeInTheDocument();
		expect(canvas.queryByRole('button', { name: /clear search/i })).not.toBeInTheDocument();

		// Verify all options are visible initially
		await waitFor(() => {
			expect(canvas.getByText('Calendar')).toBeInTheDocument();
			expect(canvas.getByText('Settings')).toBeInTheDocument();
			expect(canvas.getByText('Profile')).toBeInTheDocument();
		});

		// Test 2: User types in search - clear button appears and results are filtered
		await userEvent.type(searchInput, 'calc');
		await waitFor(() => {
			expect(canvas.getByRole('button', { name: /clear search/i })).toBeInTheDocument();
		});

		// Verify search input has the typed value
		expect(searchInput).toHaveValue('calc');

		// Verify that only matching results are visible (Calculator should be visible, others should not)
		await waitFor(() => {
			expect(canvas.getByText('Calculator')).toBeInTheDocument();
			expect(canvas.queryByText('Calendar')).not.toBeInTheDocument();
			expect(canvas.queryByText('Settings')).not.toBeInTheDocument();
			expect(canvas.queryByText('Profile')).not.toBeInTheDocument();
		});

		// Test 3: User clicks clear button - search is cleared, button disappears, and all options are visible again
		const clearButton = canvas.getByRole('button', { name: /clear search/i });
		await userEvent.click(clearButton);

		await waitFor(() => {
			expect(searchInput).toHaveValue('');
			expect(canvas.queryByRole('button', { name: /clear search/i })).not.toBeInTheDocument();
		});
	}
};

// CommandContainer Template
const CommandContainerTemplate = (args: React.ComponentProps<typeof CommandInterface>) => {
	const [open, setOpen] = React.useState(false);

	// Basic options for the command
	const options: Option[] = React.useMemo(
		() => [
			{ id: 'calendar', value: 'calendar', label: 'Calendar' },
			{ id: 'search-emoji', value: 'search-emoji', label: 'Search Emoji' },
			{ id: 'calculator', value: 'calculator', label: 'Calculator' },
			{ id: 'profile', value: 'profile', label: 'Profile' },
			{ id: 'settings', value: 'settings', label: 'Settings' },
			{ id: 'dashboard', value: 'dashboard', label: 'Dashboard' }
		],
		[]
	);

	return (
		<div className='w-[350px]'>
			<CommandProvider open={open} setOpen={setOpen} options={options}>
				<CommandInterface {...args}>
					<CommandListItems>
						{({ item }) => (
							<CommandItem key={item.id} value={item.value} className='flex items-center gap-2'>
								{item.value === 'calendar' && <CalendarIcon className='size-4' />}
								{item.value === 'search-emoji' && <SearchIcon className='size-4' />}
								{item.value === 'calculator' && <FileTextIcon className='size-4' />}
								{item.value === 'profile' && <UserIcon className='size-4' />}
								{item.value === 'settings' && <SettingsIcon className='size-4' />}
								{item.value === 'dashboard' && <HomeIcon className='size-4' />}
								<span>{item.label}</span>
							</CommandItem>
						)}
					</CommandListItems>
				</CommandInterface>
			</CommandProvider>
		</div>
	);
};

export const WithContainer: Story = {
	render: (args) => <CommandContainerTemplate {...args} />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// The command interface should be open by default in stories
		const searchInput = canvas.getByPlaceholderText('Search');
		expect(searchInput).toBeInTheDocument();

		// Test that all options are visible initially
		await waitFor(() => {
			const calendarOption = canvas.getByText('Calendar');
			const settingsOption = canvas.getByText('Settings');
			const dashboardOption = canvas.getByText('Dashboard');
			expect(calendarOption).toBeInTheDocument();
			expect(settingsOption).toBeInTheDocument();
			expect(dashboardOption).toBeInTheDocument();
		});

		// Test search functionality
		const searchInputForSearch = canvas.getByPlaceholderText('Search');
		await userEvent.type(searchInputForSearch, 'calc');

		await waitFor(() => {
			// Should show calculator option
			const calculatorOption = canvas.getByText('Calculator');
			expect(calculatorOption).toBeInTheDocument();
			// Other options should be hidden
			const calendarOption = canvas.queryByText('Calendar');
			expect(calendarOption).not.toBeInTheDocument();
		});
	}
};

// Command with Shortcuts Template
const CommandWithShortcutsTemplate = (args: React.ComponentProps<typeof Command>) => {
	const [open, setOpen] = React.useState(false);

	// Options with shortcuts for the command
	const options: Option[] = React.useMemo(
		() => [
			{ id: 'calendar', value: 'calendar', label: 'Calendar' },
			{ id: 'search-emoji', value: 'search-emoji', label: 'Search Emoji' },
			{ id: 'calculator', value: 'calculator', label: 'Calculator' },
			{ id: 'go-home', value: 'go-home', label: 'Go to Home' },
			{ id: 'view-profile', value: 'view-profile', label: 'View Profile' }
		],
		[]
	);

	return (
		<div className='w-[350px]'>
			<CommandProvider open={open} setOpen={setOpen} options={options}>
				<CommandInterface {...args} searchConfig={{ searchPlaceholder: 'Search' }}>
					<CommandListItems>
						{({ item }) => (
							<CommandItem key={item.id} value={item.value} className='flex items-center gap-2'>
								{item.value === 'calendar' && <CalendarIcon className='size-4' />}
								{item.value === 'search-emoji' && <SearchIcon className='size-4' />}
								{item.value === 'calculator' && <FileTextIcon className='size-4' />}
								{item.value === 'go-home' && <HomeIcon className='size-4' />}
								{item.value === 'view-profile' && <UserIcon className='size-4' />}
								<span>{item.label}</span>
								{item.value === 'calendar' && <CommandShortcut>⌘C</CommandShortcut>}
								{item.value === 'search-emoji' && <CommandShortcut>⌘E</CommandShortcut>}
								{item.value === 'calculator' && <CommandShortcut>⌘K</CommandShortcut>}
								{item.value === 'go-home' && <CommandShortcut>⌘H</CommandShortcut>}
								{item.value === 'view-profile' && <CommandShortcut>⌘P</CommandShortcut>}
							</CommandItem>
						)}
					</CommandListItems>
				</CommandInterface>
			</CommandProvider>
		</div>
	);
};

export const WithShortcuts: Story = {
	render: (args) => <CommandWithShortcutsTemplate {...args} />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// The command interface should be open by default in stories
		const searchInput = canvas.getByPlaceholderText('Search');
		expect(searchInput).toBeInTheDocument();

		// Test that shortcuts are visible next to their items
		await waitFor(() => {
			const calendarShortcut = canvas.getByText('⌘C');
			const searchShortcut = canvas.getByText('⌘E');
			const calculatorShortcut = canvas.getByText('⌘K');
			expect(calendarShortcut).toBeInTheDocument();
			expect(searchShortcut).toBeInTheDocument();
			expect(calculatorShortcut).toBeInTheDocument();
		});

		// Test that shortcuts appear alongside their corresponding items
		await waitFor(() => {
			// User should see Calendar with its shortcut nearby
			const calendarItem = canvas.getByText('Calendar');
			const calendarShortcut = canvas.getByText('⌘C');
			expect(calendarItem).toBeInTheDocument();
			expect(calendarShortcut).toBeInTheDocument();

			// User should see Search Emoji with its shortcut nearby
			const searchItem = canvas.getByText('Search Emoji');
			const searchShortcut = canvas.getByText('⌘E');
			expect(searchItem).toBeInTheDocument();
			expect(searchShortcut).toBeInTheDocument();
		});

		// Test search functionality with shortcuts visible
		const searchInputForShortcuts = canvas.getByPlaceholderText('Search');
		await userEvent.type(searchInputForShortcuts, 'calendar');

		await waitFor(() => {
			// Calendar option should be visible with its shortcut
			const calendarOption = canvas.getByText('Calendar');
			const calendarShortcut = canvas.getByText('⌘C');
			expect(calendarOption).toBeInTheDocument();
			expect(calendarShortcut).toBeInTheDocument();
		});

		// Test selecting an item with shortcut
		const calendarOption = canvas.getByText('Calendar');
		await userEvent.click(calendarOption);

		// Command should remain open after selection (core Command behavior)
		await waitFor(() => {
			const searchInput = canvas.getByPlaceholderText('Search');
			expect(searchInput).toBeInTheDocument();
		});
	}
};

// Command Dialog Template
const CommandDialogTemplate = (args: React.ComponentProps<typeof CommandDialog>) => {
	const [open, setOpen] = React.useState(false);

	// Options for the dialog command
	const options: Option[] = React.useMemo(
		() => [
			{ id: 'calendar', value: 'calendar', label: 'Calendar' },
			{ id: 'search-emoji', value: 'search-emoji', label: 'Search Emoji' },
			{ id: 'calculator', value: 'calculator', label: 'Calculator' },
			{ id: 'profile', value: 'profile', label: 'Profile' },
			{ id: 'settings', value: 'settings', label: 'Settings' }
		],
		[]
	);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	return (
		<>
			<div className='flex items-center justify-center'>
				<button
					onClick={() => setOpen(true)}
					className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'
				>
					Open Command Palette
				</button>
			</div>
			<CommandProvider open={open} setOpen={setOpen} options={options}>
				<CommandDialog {...args}>
					<CommandInterface searchConfig={{ searchPlaceholder: 'Search' }}>
						<CommandListItems>
							{({ item }) => (
								<CommandItem key={item.id} value={item.value} className='flex items-center gap-2'>
									{item.value === 'calendar' && <CalendarIcon className='size-4' />}
									{item.value === 'search-emoji' && <SearchIcon className='size-4' />}
									{item.value === 'calculator' && <FileTextIcon className='size-4' />}
									{item.value === 'profile' && <UserIcon className='size-4' />}
									{item.value === 'settings' && <SettingsIcon className='size-4' />}
									<span>{item.label}</span>
								</CommandItem>
							)}
						</CommandListItems>
					</CommandInterface>
				</CommandDialog>
			</CommandProvider>
		</>
	);
};

export const Dialog: Story = {
	render: (args) => <CommandDialogTemplate {...args} />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const documentScope = within(document.body);

		// Test 1: User opens command palette dialog
		expect(documentScope.queryByPlaceholderText('Search')).not.toBeInTheDocument();

		const openButton = canvas.getByRole('button', { name: /open command palette/i });
		await userEvent.click(openButton);

		await waitFor(() => {
			expect(documentScope.getByPlaceholderText('Search')).toBeInTheDocument();
		});

		// Test 2: User sees all available options in the dialog
		await waitFor(() => {
			expect(documentScope.getByText('Calendar')).toBeInTheDocument();
			expect(documentScope.getByText('Settings')).toBeInTheDocument();
			expect(documentScope.getByText('Profile')).toBeInTheDocument();
		});

		// Test 3: User searches for a specific option
		const searchInput = documentScope.getByPlaceholderText('Search');
		await userEvent.type(searchInput, 'calc');

		await waitFor(() => {
			expect(documentScope.getByText('Calculator')).toBeInTheDocument();
		});

		// Test 4: User selects an option by clicking
		await userEvent.click(documentScope.getByText('Calculator'));

		// Dialog should close after selection
		await waitFor(() => {
			expect(documentScope.queryByPlaceholderText('Search')).not.toBeInTheDocument();
		});

		// Test 5: User opens dialog again using keyboard shortcut (Cmd/Ctrl + K)
		await userEvent.keyboard('{Meta>}k{/Meta}');

		await waitFor(() => {
			expect(documentScope.getByPlaceholderText('Search')).toBeInTheDocument();
		});

		// Test 6: User closes dialog using Escape key
		await userEvent.keyboard('{Escape}');

		await waitFor(() => {
			expect(documentScope.queryByPlaceholderText('Search')).not.toBeInTheDocument();
		});

		// Test 7: User opens dialog again and selects using keyboard
		await userEvent.keyboard('{Meta>}k{/Meta}');

		await waitFor(() => {
			expect(documentScope.getByPlaceholderText('Search')).toBeInTheDocument();
		});

		// User presses Enter to select the first option
		await userEvent.keyboard('{Enter}');

		// Dialog should close after selection
		await waitFor(() => {
			expect(documentScope.queryByPlaceholderText('Search')).not.toBeInTheDocument();
		});
	}
};

const DisabledItemsTemplate = (args: React.ComponentProps<typeof Command>) => {
	const [open, setOpen] = React.useState(false);

	// Options with some disabled items
	const options: Option[] = React.useMemo(
		() => [
			{ id: 'calendar', value: 'calendar', label: 'Calendar' },
			{ id: 'search-emoji', value: 'search-emoji', label: 'Search Emoji' },
			{ id: 'calculator', value: 'calculator', label: 'Calculator (Coming Soon)', disabled: true },
			{ id: 'profile', value: 'profile', label: 'Profile' },
			{
				id: 'advanced-settings',
				value: 'advanced-settings',
				label: 'Advanced Settings (Disabled)',
				disabled: true
			}
		],
		[]
	);

	return (
		<div className='w-[350px]'>
			<CommandProvider open={open} setOpen={setOpen} options={options}>
				<CommandInterface {...args} searchConfig={{ searchPlaceholder: 'Search' }}>
					<CommandListItems>
						{({ item }) => (
							<CommandItem
								key={item.id}
								value={item.value}
								className='flex items-center gap-2'
								disabled={item.disabled}
							>
								{item.value === 'calendar' && <CalendarIcon className='size-4' />}
								{item.value === 'search-emoji' && <SearchIcon className='size-4' />}
								{item.value === 'calculator' && <FileTextIcon className='size-4' />}
								{item.value === 'profile' && <UserIcon className='size-4' />}
								{item.value === 'advanced-settings' && <SettingsIcon className='size-4' />}
								<span>{item.label}</span>
							</CommandItem>
						)}
					</CommandListItems>
				</CommandInterface>
			</CommandProvider>
		</div>
	);
};

export const WithDisabledItems: Story = {
	render: (args) => <DisabledItemsTemplate {...args} />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Test 1: User opens command palette and sees both enabled and disabled options
		const searchInput = canvas.getByPlaceholderText('Search');
		expect(searchInput).toBeInTheDocument();

		await waitFor(() => {
			expect(canvas.getByText('Calendar')).toBeInTheDocument();
			expect(canvas.getByText('Calculator (Coming Soon)')).toBeInTheDocument();
			expect(canvas.getByText('Advanced Settings (Disabled)')).toBeInTheDocument();
		});

		// Test 2: Verify disabled items are properly marked as disabled
		const disabledCalculatorItem = canvas.getByText('Calculator (Coming Soon)');
		const disabledSettingsItem = canvas.getByText('Advanced Settings (Disabled)');
		const enabledCalendarItem = canvas.getByText('Calendar');

		// Verify disabled items are visible and have disabled attribute
		expect(disabledCalculatorItem).toBeInTheDocument();
		expect(disabledSettingsItem).toBeInTheDocument();

		// Check that disabled items have the disabled attribute set
		// (cmdk sets this on the underlying element)
		const calculatorItemElement = disabledCalculatorItem.closest('[data-slot="command-item"]');
		const settingsItemElement = disabledSettingsItem.closest('[data-slot="command-item"]');

		expect(calculatorItemElement).toHaveAttribute('data-disabled', 'true');
		expect(settingsItemElement).toHaveAttribute('data-disabled', 'true');

		// Verify enabled item does not have disabled attribute
		const calendarItemElement = enabledCalendarItem.closest('[data-slot="command-item"]');
		expect(calendarItemElement).not.toHaveAttribute('data-disabled', 'true');

		// Test 3: User can click enabled items despite disabled items being present
		await userEvent.click(enabledCalendarItem);
	}
};

// Custom Styling Template
const CustomStylingTemplate = (args: React.ComponentProps<typeof Command>) => {
	const [open, setOpen] = React.useState(false);

	// Options for custom styling
	const options: Option[] = React.useMemo(
		() => [
			{ id: 'react-components', value: 'react-components', label: 'React Components' },
			{ id: 'typescript-tips', value: 'typescript-tips', label: 'TypeScript Tips' },
			{ id: 'schedule-meeting', value: 'schedule-meeting', label: 'Schedule Meeting' },
			{ id: 'create-document', value: 'create-document', label: 'Create Document' }
		],
		[]
	);

	return (
		<div className='w-[400px]'>
			<CommandProvider open={open} setOpen={setOpen} options={options}>
				<CommandInterface
					{...args}
					className='border border-border rounded-lg shadow-lg'
					searchConfig={{ searchPlaceholder: 'Search for anything...' }}
				>
					<CommandListItems className='max-h-[300px]'>
						{({ item }) => (
							<CommandItem
								key={item.id}
								value={item.value}
								className='flex items-center gap-2 hover:bg-primary/10'
							>
								{item.value === 'react-components' && (
									<SearchIcon className='size-4 text-primary' />
								)}
								{item.value === 'typescript-tips' && <SearchIcon className='size-4 text-primary' />}
								{item.value === 'schedule-meeting' && <CalendarIcon className='size-4' />}
								{item.value === 'create-document' && <FileTextIcon className='size-4' />}
								<span
									className={
										item.value.includes('react') || item.value.includes('typescript')
											? 'font-medium'
											: ''
									}
								>
									{item.label}
								</span>
							</CommandItem>
						)}
					</CommandListItems>
				</CommandInterface>
			</CommandProvider>
		</div>
	);
};

export const CustomStyling: Story = {
	render: (args) => <CustomStylingTemplate {...args} />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// The command interface should be open by default in stories
		const searchInput = canvas.getByPlaceholderText('Search for anything...');
		expect(searchInput).toBeInTheDocument();

		// Test that all options are visible with custom styling
		await waitFor(() => {
			const reactOption = canvas.getByText('React Components');
			const typescriptOption = canvas.getByText('TypeScript Tips');
			const meetingOption = canvas.getByText('Schedule Meeting');
			const documentOption = canvas.getByText('Create Document');
			expect(reactOption).toBeInTheDocument();
			expect(typescriptOption).toBeInTheDocument();
			expect(meetingOption).toBeInTheDocument();
			expect(documentOption).toBeInTheDocument();
		});

		// Test search functionality with custom styling
		await userEvent.type(searchInput, 'react');

		await waitFor(() => {
			// Should show React Components option
			const reactOption = canvas.getByText('React Components');
			expect(reactOption).toBeInTheDocument();
			// Other options should be hidden
			const typescriptOption = canvas.queryByText('TypeScript Tips');
			expect(typescriptOption).not.toBeInTheDocument();
		});

		// Test that custom styling is applied (hover effects, etc.)
		const reactOption = canvas.getByText('React Components');
		await userEvent.hover(reactOption);

		// Test selecting an option with custom styling
		await userEvent.click(reactOption);

		// Command should remain open after selection (core Command behavior)
		await waitFor(() => {
			const searchInput = canvas.getByPlaceholderText('Search for anything...');
			expect(searchInput).toBeInTheDocument();
		});

		// Reopen to test more styling
		// The command interface should still be open in stories
		const searchInputForReopen = canvas.getByPlaceholderText('Search for anything...');
		expect(searchInputForReopen).toBeInTheDocument();

		// Test search with TypeScript
		await userEvent.clear(searchInputForReopen);
		await userEvent.type(searchInputForReopen, 'typescript');

		await waitFor(() => {
			// Should show TypeScript Tips option
			const typescriptOption = canvas.getByText('TypeScript Tips');
			expect(typescriptOption).toBeInTheDocument();
		});

		// Test selecting TypeScript option
		const typescriptOption = canvas.getByText('TypeScript Tips');
		await userEvent.click(typescriptOption);

		// Command should remain open after selection (core Command behavior)
		await waitFor(() => {
			const searchInput = canvas.getByPlaceholderText('Search for anything...');
			expect(searchInput).toBeInTheDocument();
		});
	}
};

// Virtualized List Template
const VirtualizedListTemplate = (args: CommandVirtualizedStorybookTypes) => {
	const [open, setOpen] = React.useState(false);

	// Generate large dataset for virtualization demo
	const largeOptions: Option[] = React.useMemo(
		() =>
			Array.from({ length: 1000 }, (_, i) => ({
				id: `option-${i}`,
				label: `Option ${i + 1}`,
				value: `value-${i}`,
				order: i
			})),
		[]
	);

	return (
		<div className='w-[400px]'>
			<CommandProvider open={open} setOpen={setOpen} options={largeOptions}>
				<CommandInterface searchConfig={{ searchPlaceholder: 'Search through 1000 options...' }}>
					<CommandVirtualizedList {...args}>
						{({ item }) => (
							<CommandItem key={item.id} value={item.value} className='flex items-center gap-2'>
								<span>{item.label}</span>
							</CommandItem>
						)}
					</CommandVirtualizedList>
				</CommandInterface>
			</CommandProvider>
		</div>
	);
};

export const VirtualizedList: StoryObj<CommandVirtualizedStorybookTypes> = {
	render: (args) => <VirtualizedListTemplate {...args} />,
	args: {
		estimateSize: 36,
		overscan: 5
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// The command interface should be open by default in stories
		const searchInput = canvas.getByPlaceholderText('Search through 1000 options...');
		expect(searchInput).toBeInTheDocument();

		// Test that virtualized list shows initial options
		await waitFor(() => {
			const option1 = canvas.getByText('Option 1');
			const option2 = canvas.getByText('Option 2');
			expect(option1).toBeInTheDocument();
			expect(option2).toBeInTheDocument();
		});

		// Test search functionality with large dataset
		const searchInputForLarge = canvas.getByPlaceholderText('Search through 1000 options...');
		await userEvent.type(searchInputForLarge, '100');

		await waitFor(() => {
			// Should show options containing "100"
			const option100 = canvas.getByText('Option 100');
			expect(option100).toBeInTheDocument();

			const option1000 = canvas.getByText('Option 1000');
			expect(option1000).toBeInTheDocument();
		});

		// 		// Test virtualization performance with large dataset
		// Clear search and test that all items are accessible
		await userEvent.clear(searchInputForLarge);

		// Test that we can search for items at the end of the list (tests virtualization)
		await userEvent.type(searchInputForLarge, '999');

		await waitFor(() => {
			// Should show Option 999 (near the end of the list)
			const option999 = canvas.getByText('Option 999');
			expect(option999).toBeInTheDocument();
		});

		// Test that we can search for items at the beginning
		await userEvent.clear(searchInputForLarge);
		await userEvent.type(searchInputForLarge, '1');

		await waitFor(() => {
			// Should show Option 1 (at the beginning of the list)
			const option1 = canvas.getByText('Option 1');
			expect(option1).toBeInTheDocument();
		});

		// Test that we can select an item from the virtualized list
		const option1 = canvas.getByText('Option 1');
		await userEvent.click(option1);

		// Command should close after selection (since it's using CommandProvider with closeOnSelect=true)
		await waitFor(() => {
			const closedSearchInput = canvas.queryByPlaceholderText('Search through 1000 options...');
			expect(closedSearchInput).toBeInTheDocument();
		});
	}
};

// Grouped List Template
const GroupedListTemplate = (args: CommandGroupedStorybookTypes) => {
	const [open, setOpen] = React.useState(false);

	// Grouped options for command
	const groupOptions: Option[] = React.useMemo(
		() => [
			// Frontend Frameworks
			{ id: 'react', value: 'react', label: 'React', group: 'Frontend Frameworks' },
			{ id: 'vue', value: 'vue', label: 'Vue.js', group: 'Frontend Frameworks' },
			{ id: 'angular', value: 'angular', label: 'Angular', group: 'Frontend Frameworks' },
			{ id: 'svelte', value: 'svelte', label: 'Svelte', group: 'Frontend Frameworks' },

			// Backend Frameworks
			{ id: 'express', value: 'express', label: 'Express.js', group: 'Backend Frameworks' },
			{ id: 'fastify', value: 'fastify', label: 'Fastify', group: 'Backend Frameworks' },
			{ id: 'nestjs', value: 'nestjs', label: 'NestJS', group: 'Backend Frameworks' },
			{ id: 'django', value: 'django', label: 'Django', group: 'Backend Frameworks' },

			// Databases
			{ id: 'postgresql', value: 'postgresql', label: 'PostgreSQL', group: 'Databases' },
			{ id: 'mysql', value: 'mysql', label: 'MySQL', group: 'Databases' },
			{ id: 'mongodb', value: 'mongodb', label: 'MongoDB', group: 'Databases' },
			{ id: 'redis', value: 'redis', label: 'Redis', group: 'Databases' },

			// Cloud Platforms
			{ id: 'aws', value: 'aws', label: 'Amazon Web Services', group: 'Cloud Platforms' },
			{ id: 'azure', value: 'azure', label: 'Microsoft Azure', group: 'Cloud Platforms' },
			{ id: 'gcp', value: 'gcp', label: 'Google Cloud Platform', group: 'Cloud Platforms' },

			// Ungrouped
			{ id: 'vscode', value: 'vscode', label: 'VS Code' },
			{ id: 'figma', value: 'figma', label: 'Figma' }
		],
		[]
	);

	return (
		<div className='w-[400px]'>
			<CommandProvider open={open} setOpen={setOpen} options={groupOptions}>
				<CommandInterface searchConfig={{ searchPlaceholder: 'Search grouped options...' }}>
					<CommandGroupedList {...args}>
						{({ item }) => (
							<CommandItem key={item.id} value={item.value} className='flex items-center gap-2'>
								<span>{item.label}</span>
							</CommandItem>
						)}
					</CommandGroupedList>
				</CommandInterface>
			</CommandProvider>
		</div>
	);
};

export const GroupedList: StoryObj<CommandGroupedStorybookTypes> = {
	render: (args) => <GroupedListTemplate {...args} />,
	args: {
		groupOrder: ['Frontend Frameworks', 'Backend Frameworks', 'Databases', 'Cloud Platforms'],
		ungroupedPosition: 'bottom'
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// The command interface should be open by default in stories
		const searchInput = canvas.getByPlaceholderText('Search grouped options...');
		expect(searchInput).toBeInTheDocument();

		// Test that groups are visible in correct order
		await waitFor(() => {
			const frontendGroup = canvas.getByText('Frontend Frameworks');
			const backendGroup = canvas.getByText('Backend Frameworks');
			const databasesGroup = canvas.getByText('Databases');
			const cloudGroup = canvas.getByText('Cloud Platforms');
			expect(frontendGroup).toBeInTheDocument();
			expect(backendGroup).toBeInTheDocument();
			expect(databasesGroup).toBeInTheDocument();
			expect(cloudGroup).toBeInTheDocument();
		});

		// Test that items are grouped correctly
		await waitFor(() => {
			const reactOption = canvas.getByText('React');
			const vueOption = canvas.getByText('Vue.js');
			const expressOption = canvas.getByText('Express.js');
			const postgresOption = canvas.getByText('PostgreSQL');
			expect(reactOption).toBeInTheDocument();
			expect(vueOption).toBeInTheDocument();
			expect(expressOption).toBeInTheDocument();
			expect(postgresOption).toBeInTheDocument();
		});

		// Test that ungrouped items appear at bottom
		await waitFor(() => {
			const vscodeOption = canvas.getByText('VS Code');
			const figmaOption = canvas.getByText('Figma');
			expect(vscodeOption).toBeInTheDocument();
			expect(figmaOption).toBeInTheDocument();
		});

		// Test search functionality with grouped items
		const searchInputForGrouped = canvas.getByPlaceholderText('Search grouped options...');
		await userEvent.type(searchInputForGrouped, 'react');

		await waitFor(() => {
			// Should show React option
			const reactOption = canvas.getByText('React');
			expect(reactOption).toBeInTheDocument();
			// Should still show the group header
			const frontendGroup = canvas.getByText('Frontend Frameworks');
			expect(frontendGroup).toBeInTheDocument();
		});

		// Test selecting a grouped item
		const reactOption = canvas.getByText('React');
		await userEvent.click(reactOption);

		// Command should remain open after selection (core Command behavior)
		await waitFor(() => {
			const searchInput = canvas.getByPlaceholderText('Search grouped options...');
			expect(searchInput).toBeInTheDocument();
		});

		// Reopen to test keyboard navigation in grouped list
		// The command interface should still be open in stories
		const searchInputForKeyboard = canvas.getByPlaceholderText('Search grouped options...');
		expect(searchInputForKeyboard).toBeInTheDocument();

		// Test keyboard navigation through groups
		await userEvent.click(searchInputForKeyboard);

		// Navigate through options using arrow keys
		// User starts at first item (React), then moves down to second item (Vue.js)
		await userEvent.keyboard('{ArrowDown}');

		// Test Enter key selection - should select Vue.js after moving down
		await userEvent.keyboard('{Enter}');

		// Command should remain open after selection (core Command behavior)
		await waitFor(() => {
			const searchInput = canvas.getByPlaceholderText('Search grouped options...');
			expect(searchInput).toBeInTheDocument();
		});
	}
};

export const GroupedListCustomOrder: StoryObj<CommandGroupedStorybookTypes> = {
	render: (args) => <GroupedListTemplate {...args} />,
	args: {
		groupOrder: ['Frontend Frameworks', 'Backend Frameworks', 'Databases', 'Cloud Platforms'],
		ungroupedPosition: 'top'
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// The command interface should be open by default in stories
		const searchInput = canvas.getByPlaceholderText('Search grouped options...');
		expect(searchInput).toBeInTheDocument();

		// Test that ungrouped items appear at top
		await waitFor(() => {
			const vscodeOption = canvas.getByText('VS Code');
			const figmaOption = canvas.getByText('Figma');
			expect(vscodeOption).toBeInTheDocument();
			expect(figmaOption).toBeInTheDocument();
		});

		// Test that groups appear after ungrouped items
		await waitFor(() => {
			const frontendGroup = canvas.getByText('Frontend Frameworks');
			const backendGroup = canvas.getByText('Backend Frameworks');
			expect(frontendGroup).toBeInTheDocument();
			expect(backendGroup).toBeInTheDocument();
		});

		// Test search functionality
		const searchInputForCustom = canvas.getByPlaceholderText('Search grouped options...');
		await userEvent.type(searchInputForCustom, 'vscode');

		await waitFor(() => {
			// Should show VS Code option
			const vscodeOption = canvas.getByText('VS Code');
			expect(vscodeOption).toBeInTheDocument();
		});

		// Test selecting ungrouped item
		const vscodeOption = canvas.getByText('VS Code');
		await userEvent.click(vscodeOption);

		// Command should remain open after selection (core Command behavior)
		await waitFor(() => {
			const searchInput = canvas.getByPlaceholderText('Search grouped options...');
			expect(searchInput).toBeInTheDocument();
		});
	}
};

export const GroupedListUngroupedBottom: StoryObj<CommandGroupedStorybookTypes> = {
	render: (args) => <GroupedListTemplate {...args} />,
	args: {
		groupOrder: ['Frontend Frameworks', 'Backend Frameworks', 'Databases', 'Cloud Platforms'],
		ungroupedPosition: 'bottom'
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// The command interface should be open by default in stories
		const searchInput = canvas.getByPlaceholderText('Search grouped options...');
		expect(searchInput).toBeInTheDocument();

		// Test that groups appear first
		await waitFor(() => {
			const frontendGroup = canvas.getByText('Frontend Frameworks');
			const backendGroup = canvas.getByText('Backend Frameworks');
			expect(frontendGroup).toBeInTheDocument();
			expect(backendGroup).toBeInTheDocument();
		});

		// Test that ungrouped items appear at bottom
		await waitFor(() => {
			const vscodeOption = canvas.getByText('VS Code');
			const figmaOption = canvas.getByText('Figma');
			expect(vscodeOption).toBeInTheDocument();
			expect(figmaOption).toBeInTheDocument();
		});

		// Test search functionality with grouped items
		const searchInputForUngrouped = canvas.getByPlaceholderText('Search grouped options...');
		await userEvent.type(searchInputForUngrouped, 'express');

		await waitFor(() => {
			// Should show Express.js option
			const expressOption = canvas.getByText('Express.js');
			expect(expressOption).toBeInTheDocument();
			// Should still show the group header
			const backendGroup = canvas.getByText('Backend Frameworks');
			expect(backendGroup).toBeInTheDocument();
		});

		// Test selecting a grouped item
		const expressOption = canvas.getByText('Express.js');
		await userEvent.click(expressOption);

		// Command should remain open after selection (core Command behavior)
		await waitFor(() => {
			const searchInput = canvas.getByPlaceholderText('Search grouped options...');
			expect(searchInput).toBeInTheDocument();
		});
	}
};

// Grouped Virtualized List Template
const GroupedVirtualizedListTemplate = (args: CommandGroupedVirtualizedStorybookTypes) => {
	const [open, setOpen] = React.useState(false);

	const groups = React.useMemo(() => {
		return ['Frontend Frameworks', 'Backend Frameworks', 'Databases', 'Cloud Platforms'];
	}, []);

	// Generate manageable grouped dataset for virtualization demo
	const largeGroupedOptions: Option[] = React.useMemo(() => {
		const options: Option[] = [];

		groups.forEach((group, groupIndex) => {
			// Generate 20 items per group for a total of 80 items
			for (let i = 0; i < 20; i++) {
				options.push({
					id: `${group.toLowerCase().replace(/\s+/g, '-')}-${i}`,
					value: `${group.toLowerCase().replace(/\s+/g, '-')}-${i}`,
					label: `${group} Item ${i + 1}`,
					group: group,
					order: groupIndex * 20 + i
				});
			}
		});

		// Add some ungrouped items
		for (let i = 0; i < 500; i++) {
			options.push({
				id: `ungrouped-${i}`,
				value: `ungrouped-${i}`,
				label: `Ungrouped Item ${i + 1}`,
				order: groups.length * 20 + i
			});
		}

		return options;
	}, [groups]);

	return (
		<div className='w-[450px]'>
			<CommandProvider open={open} setOpen={setOpen} options={largeGroupedOptions}>
				<CommandInterface
					searchConfig={{ searchPlaceholder: 'Search through 90 grouped options...' }}
				>
					<CommandGroupedVirtualizedList {...args} groupOrder={groups}>
						{({ item }) => (
							<CommandItem key={item.id} value={item.value} className='flex items-center gap-2'>
								<span>{item.label}</span>
							</CommandItem>
						)}
					</CommandGroupedVirtualizedList>
				</CommandInterface>
			</CommandProvider>
		</div>
	);
};

export const GroupedVirtualizedList: StoryObj<CommandGroupedVirtualizedStorybookTypes> = {
	render: (args) => <GroupedVirtualizedListTemplate {...args} />,
	args: {
		estimateSize: 36,
		overscan: 5,
		ungroupedPosition: 'bottom'
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// The command interface should be open by default in stories
		const searchInput = canvas.getByPlaceholderText('Search through 90 grouped options...');
		expect(searchInput).toBeInTheDocument();

		// Test that initial groups are visible in virtualized list (only what's in viewport)
		await waitFor(() => {
			const frontendGroup = canvas.getByText('Frontend Frameworks');
			expect(frontendGroup).toBeInTheDocument();
		});

		// Test that initial grouped items are visible (only what's in viewport)
		await waitFor(() => {
			const frontendItem1 = canvas.getByText('Frontend Frameworks Item 1');
			expect(frontendItem1).toBeInTheDocument();
		});

		// Test search functionality with grouped virtualized list
		const searchInputForGroupedVirtual = canvas.getByPlaceholderText(
			'Search through 90 grouped options...'
		);
		await userEvent.type(searchInputForGroupedVirtual, 'database');

		await waitFor(() => {
			// Should show database items (this tests that virtualization can find items outside viewport)
			const databaseItem1 = canvas.getByText('Databases Item 1');
			expect(databaseItem1).toBeInTheDocument();
		});

		// Test selecting a grouped item from virtualized list
		const databaseItem1 = canvas.getByText('Databases Item 1');
		await userEvent.click(databaseItem1);

		// Test keyboard navigation with current search results (Databases items)
		// First item (Databases Item 1) should already be selected by default
		await waitFor(() => {
			const databaseItem1 = canvas.getByText('Databases Item 1');
			expect(databaseItem1).toBeInTheDocument();
		});

		// Press ArrowDown to move to second item
		await userEvent.keyboard('{ArrowDown}');
		await waitFor(() => {
			const databaseItem2 = canvas.getByText('Databases Item 2');
			expect(databaseItem2).toBeInTheDocument();
		});

		// Test Enter key selection
		await userEvent.keyboard('{Enter}');

		// Command should close after selection (since it's using CommandProvider with closeOnSelect=true)
		await waitFor(() => {
			const closedSearchInput = canvas.queryByPlaceholderText(
				'Search through 90 grouped options...'
			);
			expect(closedSearchInput).toBeInTheDocument();
		});
	}
};

// Empty State Demo Template
const EmptyStateDemoTemplate = () => {
	const [open, setOpen] = React.useState(false);

	// Empty options array to demonstrate empty state
	const emptyOptions: Option[] = [];

	return (
		<div className='space-y-8'>
			<div className='w-[350px]'>
				<h3 className='text-sm font-medium mb-2'>Default Empty State (No Options):</h3>
				<CommandProvider open={open} setOpen={setOpen} options={emptyOptions}>
					<CommandInterface searchConfig={{ searchPlaceholder: 'Search' }}>
						<CommandListItems>
							{({ item }) => (
								<CommandItem {...item}>
									<span>{item.label}</span>
								</CommandItem>
							)}
						</CommandListItems>
					</CommandInterface>
				</CommandProvider>
				<p className='text-sm text-muted-foreground mt-2'>
					Shows &quot;No options currently available&quot; when no search is provided
				</p>
			</div>

			<div className='w-[350px]'>
				<h3 className='text-sm font-medium mb-2'>Custom Empty State Messages:</h3>
				<CommandProvider
					open={open}
					setOpen={setOpen}
					options={emptyOptions}
					emptyState={{
						noOptionsMessage: 'No commands available at the moment',
						noSearchResultsMessage: 'No commands found matching "{searchTerm}"',
						formatSearchTerm: (term) => `"${term}"`
					}}
				>
					<CommandInterface searchConfig={{ searchPlaceholder: 'Search' }}>
						<CommandListItems>
							{({ item }) => (
								<CommandItem {...item}>
									<span>{item.label}</span>
								</CommandItem>
							)}
						</CommandListItems>
					</CommandInterface>
				</CommandProvider>
				<p className='text-sm text-muted-foreground mt-2'>
					Custom messages for both no options and no search results scenarios
				</p>
			</div>
		</div>
	);
};

export const EmptyStateDemo: Story = {
	render: () => <EmptyStateDemoTemplate />
};

// Real-world Usage Scenarios Template
const RealWorldScenariosTemplate = () => {
	const [open, setOpen] = React.useState(false);

	// More realistic options that users might actually search for
	const realisticOptions: Option[] = React.useMemo(
		() => [
			// File operations
			{ id: 'new-file', value: 'new-file', label: 'New File' },
			{ id: 'open-file', value: 'open-file', label: 'Open File' },
			{ id: 'save-file', value: 'save-file', label: 'Save File' },
			{ id: 'save-as', value: 'save-as', label: 'Save As...' },

			// Edit operations
			{ id: 'undo', value: 'undo', label: 'Undo' },
			{ id: 'redo', value: 'redo', label: 'Redo' },
			{ id: 'cut', value: 'cut', label: 'Cut' },
			{ id: 'copy', value: 'copy', label: 'Copy' },
			{ id: 'paste', value: 'paste', label: 'Paste' },

			// View operations
			{ id: 'zoom-in', value: 'zoom-in', label: 'Zoom In' },
			{ id: 'zoom-out', value: 'zoom-out', label: 'Zoom Out' },
			{ id: 'reset-zoom', value: 'reset-zoom', label: 'Reset Zoom' },

			// Tools
			{ id: 'find', value: 'find', label: 'Find' },
			{ id: 'replace', value: 'replace', label: 'Replace' },
			{ id: 'format-document', value: 'format-document', label: 'Format Document' },

			// Settings
			{ id: 'preferences', value: 'preferences', label: 'Preferences' },
			{ id: 'keyboard-shortcuts', value: 'keyboard-shortcuts', label: 'Keyboard Shortcuts' },
			{ id: 'themes', value: 'themes', label: 'Themes' }
		],
		[]
	);

	return (
		<div className='w-[400px]'>
			<CommandProvider open={open} setOpen={setOpen} options={realisticOptions}>
				<CommandInterface searchConfig={{ searchPlaceholder: 'Search commands...' }}>
					<CommandListItems>
						{({ item }) => (
							<CommandItem key={item.id} value={item.value} className='flex items-center gap-2'>
								<span>{item.label}</span>
							</CommandItem>
						)}
					</CommandListItems>
				</CommandInterface>
			</CommandProvider>
		</div>
	);
};

export const RealWorldScenarios: Story = {
	render: () => <RealWorldScenariosTemplate />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Test 1: User searches for common file operations
		const searchInput = canvas.getByPlaceholderText('Search commands...');
		expect(searchInput).toBeInTheDocument();

		await userEvent.type(searchInput, 'file');
		await waitFor(() => {
			expect(canvas.getByText('New File')).toBeInTheDocument();
			expect(canvas.getByText('Open File')).toBeInTheDocument();
			expect(canvas.getByText('Save File')).toBeInTheDocument();
		});

		// Test 2: User searches with partial matches
		await userEvent.clear(searchInput);
		await userEvent.type(searchInput, 'save');
		await waitFor(() => {
			expect(canvas.getByText('Save File')).toBeInTheDocument();
			expect(canvas.getByText('Save As...')).toBeInTheDocument();
		});

		// Test 3: User searches for edit operations
		await userEvent.clear(searchInput);
		await userEvent.type(searchInput, 'edit');
		await waitFor(() => {
			// Should show edit-related commands
			expect(canvas.getByText('Undo')).toBeInTheDocument();
			expect(canvas.getByText('Redo')).toBeInTheDocument();
		});

		// Test 4: User searches for something that doesn't exist
		await userEvent.clear(searchInput);
		await userEvent.type(searchInput, 'nonexistent');
		await waitFor(() => {
			expect(canvas.getByText('No options for "nonexistent"')).toBeInTheDocument();
		});

		// Test 5: User clears search and selects a command
		await userEvent.clear(searchInput);
		await userEvent.type(searchInput, 'preferences');
		await waitFor(() => {
			expect(canvas.getByText('Preferences')).toBeInTheDocument();
		});

		await userEvent.click(canvas.getByText('Preferences'));

		// Command should close after selection
		await waitFor(() => {
			expect(canvas.queryByPlaceholderText('Search commands...')).toBeInTheDocument();
		});
	}
};
