import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
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
	CommandGroupedVirtualizedListItems,
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
const BasicCommandTemplate = (args: React.ComponentProps<typeof Command>) => {
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
					{...args}
					searchConfig={{ searchPlaceholder: 'Type a command or search...' }}
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
	render: (args) => <BasicCommandTemplate {...args} />
};

// CommandInterface Template
const CommandInterfaceTemplate = (args: React.ComponentProps<typeof CommandInterface>) => {
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

export const WithInterface: Story = {
	render: (args) => <CommandInterfaceTemplate {...args} />
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
	render: (args) => <CommandContainerTemplate {...args} />
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
				<CommandInterface
					{...args}
					searchConfig={{ searchPlaceholder: 'Type a command or search...' }}
				>
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
	render: (args) => <CommandWithShortcutsTemplate {...args} />
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
					<CommandInterface searchConfig={{ searchPlaceholder: 'Type a command or search...' }}>
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
	render: (args) => <CommandDialogTemplate {...args} />
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
				<CommandInterface
					{...args}
					searchConfig={{ searchPlaceholder: 'Type a command or search...' }}
				>
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
	render: (args) => <DisabledItemsTemplate {...args} />
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
	render: (args) => <CustomStylingTemplate {...args} />
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
	}
};

export const GroupedListCustomOrder: StoryObj<CommandGroupedStorybookTypes> = {
	render: (args) => <GroupedListTemplate {...args} />,
	args: {
		groupOrder: ['Frontend Frameworks', 'Backend Frameworks', 'Databases', 'Cloud Platforms'],
		ungroupedPosition: 'top'
	}
};

export const GroupedListUngroupedBottom: StoryObj<CommandGroupedStorybookTypes> = {
	render: (args) => <GroupedListTemplate {...args} />,
	args: {
		groupOrder: ['Frontend Frameworks', 'Backend Frameworks', 'Databases', 'Cloud Platforms'],
		ungroupedPosition: 'bottom'
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
					<CommandGroupedVirtualizedListItems {...args} groupOrder={groups}>
						{({ item }) => (
							<CommandItem key={item.id} value={item.value} className='flex items-center gap-2'>
								<span>{item.label}</span>
							</CommandItem>
						)}
					</CommandGroupedVirtualizedListItems>
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
					<CommandInterface searchConfig={{ searchPlaceholder: 'Type a command or search...' }}>
						<CommandListItems>
							{({ item }) => (
								<CommandItem key={item.id} value={item.value}>
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
					<CommandInterface searchConfig={{ searchPlaceholder: 'Type a command or search...' }}>
						<CommandListItems>
							{({ item }) => (
								<CommandItem key={item.id} value={item.value}>
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

			<div className='w-[350px]'>
				<h3 className='text-sm font-medium mb-2'>Bold Search Term Formatting:</h3>
				<CommandProvider
					open={open}
					setOpen={setOpen}
					options={emptyOptions}
					emptyState={{
						noSearchResultsMessage: 'No commands found for **{searchTerm}**',
						formatSearchTerm: (term) => `**${term}**`
					}}
				>
					<CommandInterface searchConfig={{ searchPlaceholder: 'Type a command or search...' }}>
						<CommandListItems>
							{({ item }) => (
								<CommandItem key={item.id} value={item.value}>
									<span>{item.label}</span>
								</CommandItem>
							)}
						</CommandListItems>
					</CommandInterface>
				</CommandProvider>
				<p className='text-sm text-muted-foreground mt-2'>
					Search terms are formatted with bold markers
				</p>
			</div>
		</div>
	);
};

export const EmptyStateDemo: Story = {
	render: () => <EmptyStateDemoTemplate />
};
