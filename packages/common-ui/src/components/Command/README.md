# Command Components

The Command package provides a comprehensive set of components for building command palettes, search interfaces, and virtualized lists with grouping capabilities.

## ⚠️ Critical Configuration

**IMPORTANT**: The `Command` component automatically sets `shouldFilter={false}` to disable cmdk's built-in filtering. This is **required** for proper integration with:

- `CommandProvider`'s custom filtering logic
- Virtualization components (`CommandVirtualizedList`, `CommandGroupedVirtualizedList`)
- Grouped list components (`CommandGroupedList`)

Without this configuration, virtualization and grouped lists may fail to render with DOM errors like "Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'".

If you're experiencing rendering issues with virtualized or grouped components, ensure you're using the `Command` component from this package rather than the raw cmdk `Command` primitive.

## Core Components

### Basic Command Components

- `Command` - The main command container (⚠️ **Required**: Sets shouldFilter={false} for proper virtualization support)
- `CommandList` - Scrollable list container
- `CommandItem` - Individual command items
- `CommandGroup` - Group container for related items
- `CommandSeparator` - Visual separator between groups
- `CommandSearch` - Search input component
- `CommandEmpty` - Empty state component
- `CommandShortcut` - Keyboard shortcut display

### CommandWrapper (Centralized)

A centralized wrapper component that provides unified functionality for wrapping Command components with search and empty state functionality. This component is used internally by both `CommandContainer` and `SelectList` to avoid code duplication.

```tsx
import { CommandWrapper, CommandListItems, CommandItem } from '~/components/Command';

// Basic usage
<CommandWrapper enabledSearch={true} searchPlaceholder="Search...">
	<CommandListItems>
		{({ item }) => (
			<CommandItem key={item.id} value={item.value}>
				{item.label}
			</CommandItem>
		)}
	</CommandListItems>
</CommandWrapper>

// With manual wrapper (e.g., for selects)
<PopoverContent className="min-w-[var(--radix-popover-trigger-width)] p-0">
	<CommandWrapper enabledSearch={true} searchPlaceholder="Search...">
		<CommandListItems>
			{({ item }) => (
				<CommandItem key={item.id} value={item.value}>
					{item.label}
				</CommandItem>
			)}
		</CommandListItems>
	</CommandWrapper>
</PopoverContent>
```

**Props:**

- `enabledSearch?: boolean` - Whether search functionality is enabled (default: true)
- `searchPlaceholder?: string` - Placeholder text for the search input (default: "Type a command or search...")
- `emptyState?: IEmptyStateConfig` - Configuration for empty state messages
- `children?: React.ReactNode` - Child components to render within the command list
- All props from `Command` component

**Features:**

- Configurable search functionality (enabled/disabled)
- Automatic empty state handling
- Consistent styling and behavior
- Proper accessibility and keyboard navigation
- Integration with CommandProvider context
- Simple and focused API

### CommandContainer

A convenience component that combines `Command`, `CommandInput`, `CommandList`, and `CommandEmpty` into a single container. This component is designed for command usage where search is always enabled. **Uses `CommandWrapper` internally.**

```tsx
import { CommandContainer, CommandListItems, CommandItem } from '~/components/Command';

<CommandProvider open={open} setOpen={setOpen} options={options}>
	<CommandContainer searchPlaceholder='Type a command or search...'>
		<CommandListItems>
			{({ item }) => (
				<CommandItem key={item.id} value={item.value}>
					{item.label}
				</CommandItem>
			)}
		</CommandListItems>
	</CommandContainer>
</CommandProvider>;
```

**Props:**

- `searchPlaceholder?: string` - Placeholder text for the search input (default: "Type a command or search...")
- `emptyState?: IEmptyStateConfig` - Configuration for empty state messages
- `children?: React.ReactNode` - Child components to render within the command list
- All props from `Command` component

**Features:**

- Always enabled search functionality (no option to disable)
- Automatic empty state handling
- Consistent styling and behavior
- Proper accessibility and keyboard navigation
- Integration with CommandProvider context

### Virtualized Components

#### `CommandVirtualizedList`

A virtualized list component for handling large datasets efficiently.

```tsx
import { Command, CommandItem, CommandVirtualizedList } from '~/components/Command';

const options = [
	{ id: '1', label: 'Option 1', value: 'option1' },
	{ id: '2', label: 'Option 2', value: 'option2' }
	// ... many more options
];

<Command>
	<CommandVirtualizedList options={options} estimateSize={36} overscan={5}>
		{({ item, style }) => (
			<CommandItem key={item.id} value={item.value} style={style}>
				{item.label}
			</CommandItem>
		)}
	</CommandVirtualizedList>
</Command>;
```

**Props:**

- `options: T[]` - Array of options to display
- `estimateSize?: number` - Estimated height of each item (default: 36)
- `overscan?: number` - Number of items to render outside visible area (default: 5)
- `children: (props: { item: T; style: React.CSSProperties }) => React.ReactNode` - Render function
- `className?: string` - Additional CSS classes

#### `CommandGroupedList`

A component for displaying grouped options with automatic grouping and sorting.

```tsx
import { Command, CommandItem, CommandGroupedList } from '~/components/Command';

const groupedOptions = [
	{ id: 'react', label: 'React', value: 'react', group: 'Frontend' },
	{ id: 'vue', label: 'Vue', value: 'vue', group: 'Frontend' },
	{ id: 'express', label: 'Express', value: 'express', group: 'Backend' },
	{ id: 'typescript', label: 'TypeScript', value: 'typescript' } // ungrouped
];

<Command>
	<CommandGroupedList
		options={groupedOptions}
		groupOrder={['Frontend', 'Backend']}
		ungroupedPosition='bottom'
	>
		{({ item }) => (
			<CommandItem key={item.id} value={item.value}>
				{item.label}
			</CommandItem>
		)}
	</CommandGroupedList>
</Command>;
```

**Props:**

- `options: T[]` - Array of options to group and display
- `groupOrder?: string[]` - Custom order for groups
- `ungroupedPosition?: 'top' | 'bottom'` - Position for ungrouped items (default: 'top')
- `children: (props: { item: T }) => React.ReactNode` - Render function
- `className?: string` - Additional CSS classes

#### `CommandGroupedVirtualizedList`

A virtualized version of the grouped list for handling large grouped datasets.

```tsx
import { Command, CommandItem, CommandGroupedVirtualizedList } from '~/components/Command';

<Command>
	<CommandGroupedVirtualizedList
		options={largeGroupedOptions}
		estimateSize={36}
		overscan={5}
		groupOrder={['Frontend', 'Backend', 'Tools']}
		ungroupedPosition='bottom'
	>
		{({ item }) => (
			<CommandItem key={item.id} value={item.value}>
				{item.label}
			</CommandItem>
		)}
	</CommandGroupedVirtualizedList>
</Command>;
```

**Props:**

- `options: T[]` - Array of options to group and virtualize
- `estimateSize?: number` - Estimated height of each item (default: 36)
- `overscan?: number` - Number of items to render outside visible area (default: 5)
- `groupOrder?: string[]` - Custom order for groups
- `ungroupedPosition?: 'top' | 'bottom'` - Position for ungrouped items (default: 'top')
- `children: (props: { item: T }) => React.ReactNode` - Render function
- `className?: string` - Additional CSS classes

## Hooks

### `useCommandGroupedOptions`

A hook for organizing options into groups with configurable ordering.

```tsx
import { useCommandGroupedOptions } from '~/components/Command';

const { sortedGroups, groups } = useCommandGroupedOptions(options, {
	groupOrder: ['Frontend', 'Backend', 'Tools'],
	ungroupedPosition: 'bottom'
});

// Render grouped options
sortedGroups.forEach((groupName) => {
	const groupOptions = groups.get(groupName) || [];
	return (
		<CommandGroup key={groupName} heading={groupName}>
			{groupOptions.map((option) => (
				<CommandItem key={option.value} value={option.value} />
			))}
		</CommandGroup>
	);
});
```

**Parameters:**

- `options: T[]` - Array of options to group
- `config?: GroupedOptionsConfig` - Configuration object
  - `groupOrder?: string[]` - Custom order for groups
  - `ungroupedPosition?: 'top' | 'bottom'` - Position for ungrouped items

**Returns:**

- `sortedGroups: (string | undefined)[]` - Array of group names in desired order
- `groups: Map<string | undefined, T[]>` - Map of group names to option arrays

## TypeScript Support

All components support generic types that extend the base `Option` type:

```tsx
// Using default Option type
<CommandVirtualizedList<Option> options={options} />;

// Extending Option with additional properties
interface ExtendedOption extends Option {
	description: string;
	icon: string;
}

<CommandVirtualizedList<ExtendedOption> options={extendedOptions} />;
```

## Utilities

### Grouping Utilities

The package includes utilities for advanced grouping operations:

- `getVirtualizedItems<T>()` - Creates a flat array of virtualized items from grouped options
- `getEstimatedItemHeight<T>()` - Estimates the size of a virtualized item based on its type

## Best Practices

### Performance

1. **Use virtualization for large datasets** - When dealing with 100+ items, use `CommandVirtualizedList` or `CommandGroupedVirtualizedList`
2. **Optimize estimateSize** - Set accurate item height estimates for better virtualization performance
3. **Adjust overscan** - Increase overscan for smoother scrolling, decrease for better memory usage

### Grouping

1. **Consistent group names** - Use consistent group names across your application
2. **Logical ordering** - Provide meaningful group order arrays
3. **Handle ungrouped items** - Decide whether ungrouped items should appear at top or bottom

### Accessibility

1. **Proper labels** - Ensure all items have meaningful labels
2. **Keyboard navigation** - The Command components handle keyboard navigation automatically
3. **Screen readers** - Use proper ARIA labels and descriptions

## Examples

### Basic Virtualized List

```tsx
const MyVirtualizedCommand = () => {
	const options = generateLargeOptions(); // 1000+ items

	return (
		<Command>
			<CommandVirtualizedList options={options}>
				{({ item, style }) => (
					<CommandItem key={item.id} value={item.value} style={style}>
						<span>{item.label}</span>
						{item.description && <span className='text-muted-foreground'>{item.description}</span>}
					</CommandItem>
				)}
			</CommandVirtualizedList>
		</Command>
	);
};
```

### Grouped Virtualized List with Custom Order

```tsx
const MyGroupedVirtualizedCommand = () => {
	const options = generateGroupedOptions(); // Many grouped items

	return (
		<Command>
			<CommandGroupedVirtualizedList
				options={options}
				groupOrder={['Favorites', 'Recent', 'All']}
				ungroupedPosition='bottom'
				estimateSize={40}
				overscan={8}
			>
				{({ item }) => (
					<CommandItem key={item.id} value={item.value}>
						<div className='flex items-center gap-2'>
							{item.icon && <Icon name={item.icon} />}
							<span>{item.label}</span>
						</div>
					</CommandItem>
				)}
			</CommandGroupedVirtualizedList>
		</Command>
	);
};
```

### Custom Grouping Logic

```tsx
const MyCustomGroupedCommand = () => {
	const options = generateOptions();

	const { sortedGroups, groups } = useCommandGroupedOptions(options, {
		groupOrder: ['Priority', 'Normal', 'Low'],
		ungroupedPosition: 'top'
	});

	return (
		<Command>
			<CommandList>
				{sortedGroups.map((groupName, index) => {
					const groupOptions = groups.get(groupName) || [];

					if (groupOptions.length === 0) return null;

					return (
						<React.Fragment key={groupName || 'ungrouped'}>
							{index > 0 && <CommandSeparator />}
							{groupName && <CommandGroup heading={groupName} />}
							{groupOptions.map((option) => (
								<CommandItem key={option.id} value={option.value}>
									{option.label}
								</CommandItem>
							))}
						</React.Fragment>
					);
				})}
			</CommandList>
		</Command>
	);
};
```

### Empty State Customization

The Command components provide intelligent empty state handling that automatically detects whether there's an active search term and displays appropriate messages. Empty state configuration is centralized through the `CommandProvider`.

#### Basic Empty State

```tsx
<CommandProvider options={options}>
	<Command>
		<CommandListItems>
			{({ item }) => (
				<CommandItem key={item.id} value={item.value}>
					{item.label}
				</CommandItem>
			)}
		</CommandListItems>
	</Command>
</CommandProvider>
```

**Default behavior:**

- When no search term: Shows "No options currently available"
- When search term exists: Shows "No options for '{search term}'"

#### Custom Empty State Messages

```tsx
<CommandProvider
	options={options}
	emptyState={{
		noOptionsMessage: 'No commands available at the moment',
		noSearchResultsMessage: 'No commands found matching "{searchTerm}"',
		formatSearchTerm: (term) => `"${term}"`
	}}
>
	<Command>
		<CommandListItems>
			{({ item }) => (
				<CommandItem key={item.id} value={item.value}>
					{item.label}
				</CommandItem>
			)}
		</CommandListItems>
	</Command>
</CommandProvider>
```

**Empty state configuration options:**

- `noOptionsMessage?: string` - Message when no options are available (no search)
- `noSearchResultsMessage?: string` - Message when search returns no results
- `formatSearchTerm?: (searchTerm: string) => string` - Function to customize search term display

#### Advanced Search Term Formatting

```tsx
<CommandProvider
	options={options}
	emptyState={{
		noSearchResultsMessage: 'No results found for **{searchTerm}**',
		formatSearchTerm: (term) => `**${term}**`
	}}
>
	<Command>
		<CommandListItems>
			{({ item }) => (
				<CommandItem key={item.id} value={item.value}>
					{item.label}
				</CommandItem>
			)}
		</CommandListItems>
	</Command>
</CommandProvider>
```

#### Empty State with Virtualized Lists

```tsx
<CommandProvider
	options={options}
	emptyState={{
		noOptionsMessage: 'No items available',
		noSearchResultsMessage: 'No items match "{searchTerm}"',
		formatSearchTerm: (term) => `"${term}"`
	}}
>
	<Command>
		<CommandVirtualizedList options={options}>
			{({ item, style }) => (
				<CommandItem key={item.id} value={item.value} style={style}>
					{item.label}
				</CommandItem>
			)}
		</CommandVirtualizedList>
	</Command>
</CommandProvider>
```

#### Empty State with Grouped Lists

```tsx
<CommandProvider
	options={groupedOptions}
	emptyState={{
		noOptionsMessage: 'No grouped items available',
		noSearchResultsMessage: 'No grouped items match "{searchTerm}"',
		formatSearchTerm: (term) => `"${term}"`
	}}
>
	<Command>
		<CommandGroupedList options={groupedOptions}>
			{({ item }) => (
				<CommandItem key={item.id} value={item.value}>
					{item.label}
				</CommandItem>
			)}
		</CommandGroupedList>
	</Command>
</CommandProvider>
```

**Key Features:**

- **Centralized configuration** through CommandProvider
- **Automatic detection** of search state
- **Contextual messages** based on whether user is searching
- **Customizable formatting** of search terms in messages
- **Consistent behavior** across all Command components
- **No manual implementation** required at each layer
- **Automatic rendering** when no options are available
