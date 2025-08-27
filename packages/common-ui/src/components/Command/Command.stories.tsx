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
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandShortcut,
	CommandSeparator
} from '~/components/Command/components';

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
const BasicCommandTemplate = (args: React.ComponentProps<typeof Command>) => (
	<div className='w-[350px]'>
		<Command {...args}>
			<CommandInput placeholder='Type a command or search...' />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading='Suggestions'>
					<CommandItem>
						<CalendarIcon className='size-4' />
						Calendar
					</CommandItem>
					<CommandItem>
						<SearchIcon className='size-4' />
						Search Emoji
					</CommandItem>
					<CommandItem>
						<FileTextIcon className='size-4' />
						Calculator
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading='Settings'>
					<CommandItem>
						<UserIcon className='size-4' />
						Profile
					</CommandItem>
					<CommandItem>
						<SettingsIcon className='size-4' />
						Settings
					</CommandItem>
					<CommandItem>
						<HomeIcon className='size-4' />
						Dashboard
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	</div>
);

export const Basic: Story = {
	render: (args) => <BasicCommandTemplate {...args} />
};

// Command with Shortcuts Template
const CommandWithShortcutsTemplate = (args: React.ComponentProps<typeof Command>) => (
	<div className='w-[350px]'>
		<Command {...args}>
			<CommandInput placeholder='Type a command or search...' />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading='Quick Actions'>
					<CommandItem>
						<CalendarIcon className='size-4' />
						Calendar
						<CommandShortcut>⌘C</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<SearchIcon className='size-4' />
						Search Emoji
						<CommandShortcut>⌘E</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<FileTextIcon className='size-4' />
						Calculator
						<CommandShortcut>⌘K</CommandShortcut>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading='Navigation'>
					<CommandItem>
						<HomeIcon className='size-4' />
						Go to Home
						<CommandShortcut>⌘H</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<UserIcon className='size-4' />
						View Profile
						<CommandShortcut>⌘P</CommandShortcut>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	</div>
);

export const WithShortcuts: Story = {
	render: (args) => <CommandWithShortcutsTemplate {...args} />
};

// Command Dialog Template
const CommandDialogTemplate = (args: React.ComponentProps<typeof CommandDialog>) => {
	const [open, setOpen] = React.useState(false);

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
			<CommandDialog open={open} onOpenChange={setOpen} {...args}>
				<CommandInput placeholder='Type a command or search...' />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading='Suggestions'>
						<CommandItem>
							<CalendarIcon className='size-4' />
							Calendar
						</CommandItem>
						<CommandItem>
							<SearchIcon className='size-4' />
							Search Emoji
						</CommandItem>
						<CommandItem>
							<FileTextIcon className='size-4' />
							Calculator
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading='Settings'>
						<CommandItem>
							<UserIcon className='size-4' />
							Profile
						</CommandItem>
						<CommandItem>
							<SettingsIcon className='size-4' />
							Settings
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
};

export const Dialog: Story = {
	render: (args) => <CommandDialogTemplate {...args} />
};

// Searchable Command Template
const SearchableCommandTemplate = (args: React.ComponentProps<typeof Command>) => {
	const [searchValue, setSearchValue] = React.useState('');

	const items: { icon: React.ElementType; label: string; value: string }[] = [
		{ icon: CalendarIcon, label: 'Calendar', value: 'calendar' },
		{ icon: SearchIcon, label: 'Search Emoji', value: 'search' },
		{ icon: FileTextIcon, label: 'Calculator', value: 'calculator' },
		{ icon: UserIcon, label: 'Profile', value: 'profile' },
		{ icon: SettingsIcon, label: 'Settings', value: 'settings' },
		{ icon: HomeIcon, label: 'Dashboard', value: 'dashboard' }
	];

	const filteredItems = items.filter((item) =>
		item.label.toLowerCase().includes(searchValue.toLowerCase())
	);

	return (
		<div className='w-[350px]'>
			<Command {...args}>
				<CommandInput
					placeholder='Search commands...'
					value={searchValue}
					onValueChange={setSearchValue}
				/>
				<CommandList>
					<CommandEmpty>No results found for &quot;{searchValue}&quot;.</CommandEmpty>
					<CommandGroup heading='Available Commands'>
						{filteredItems.map((item) => (
							<CommandItem key={item.value} value={item.value}>
								<item.icon className='size-4' />
								{item.label}
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</Command>
		</div>
	);
};

export const Searchable: Story = {
	render: (args) => <SearchableCommandTemplate {...args} />
};

const DisabledItemsTemplate = (args: React.ComponentProps<typeof Command>) => (
	<div className='w-[350px]'>
		<Command {...args}>
			<CommandInput placeholder='Type a command or search...' />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading='Available Actions'>
					<CommandItem>
						<CalendarIcon className='size-4' />
						Calendar
					</CommandItem>
					<CommandItem>
						<SearchIcon className='size-4' />
						Search Emoji
					</CommandItem>
					<CommandItem disabled>
						<FileTextIcon className='size-4' />
						Calculator (Coming Soon)
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading='Settings'>
					<CommandItem>
						<UserIcon className='size-4' />
						Profile
					</CommandItem>
					<CommandItem disabled>
						<SettingsIcon className='size-4' />
						Advanced Settings (Disabled)
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	</div>
);

export const WithDisabledItems: Story = {
	render: (args) => <DisabledItemsTemplate {...args} />
};

// Custom Styling Template
const CustomStylingTemplate = (args: React.ComponentProps<typeof Command>) => (
	<div className='w-[400px]'>
		<Command className='border border-border rounded-lg shadow-lg' {...args}>
			<CommandInput placeholder='Search for anything...' />
			<CommandList className='max-h-[300px]'>
				<CommandEmpty className='py-8 text-center text-muted-foreground'>
					No results found. Try a different search term.
				</CommandEmpty>
				<CommandGroup heading='Recent Searches'>
					<CommandItem className='hover:bg-primary/10'>
						<SearchIcon className='size-4 text-primary' />
						<span className='font-medium'>React Components</span>
					</CommandItem>
					<CommandItem className='hover:bg-primary/10'>
						<SearchIcon className='size-4 text-primary' />
						<span className='font-medium'>TypeScript Tips</span>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading='Quick Actions'>
					<CommandItem>
						<CalendarIcon className='size-4' />
						Schedule Meeting
					</CommandItem>
					<CommandItem>
						<FileTextIcon className='size-4' />
						Create Document
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	</div>
);

export const CustomStyling: Story = {
	render: (args) => <CustomStylingTemplate {...args} />
};
