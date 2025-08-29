# Select Components

The Selects package provides a comprehensive set of components for building single and multi-select interfaces with advanced features like virtualization, grouping, and search capabilities.

## Core Components

### Single Select Components

- `SingleSelect` - The main single select container
- `SingleSelectTrigger` - Trigger button for opening the select
- `SingleSelectContent` - Dropdown content container
- `SingleSelectItem` - Individual select items
- `SingleSelectGroup` - Group container for related items
- `SingleSelectSeparator` - Visual separator between groups
- `SingleSelectSearch` - Search input component
- `SingleSelectEmpty` - Empty state component

### Multi Select Components

- `MultiSelect` - The main multi select container
- `MultiSelectTrigger` - Trigger button for opening the select
- `MultiSelectContent` - Dropdown content container
- `MultiSelectItem` - Individual select items
- `MultiSelectGroup` - Group container for related items
- `MultiSelectSeparator` - Visual separator between groups
- `MultiSelectSearch` - Search input component
- `MultiSelectEmpty` - Empty state component
- `MultiSelectBadge` - Badge component for selected items

### Virtualized Components

The Selects package leverages the Command package's virtualization capabilities for handling large datasets efficiently.

#### `SelectListItemsVirtualized`

A virtualized list component for handling large datasets in selects.

```tsx
import { SingleSelect, SingleSelectItem, SelectListItemsVirtualized } from '~/components/Selects';

const options = [
	{ id: '1', label: 'Option 1', value: 'option1' },
	{ id: '2', label: 'Option 2', value: 'option2' }
	// ... many more options
];

<SingleSelect>
	<SingleSelectContent>
		<SelectListItemsVirtualized estimateSize={36} overscan={5}>
			{({ item, style }) => (
				<SingleSelectItem key={item.id} value={item.value} style={style}>
					{item.label}
				</SingleSelectItem>
			)}
		</SelectListItemsVirtualized>
	</SingleSelectContent>
</SingleSelect>;
```

**Props:**

- `estimateSize?: number` - Estimated height of each item (default: 36)
- `overscan?: number` - Number of items to render outside visible area (default: 5)
- `children: (props: { item: T; style: React.CSSProperties }) => React.ReactNode` - Render function
- `className?: string` - Additional CSS classes

#### `SelectGroupedListItems`

A component for displaying grouped options with automatic grouping and sorting.

```tsx
import { SingleSelect, SingleSelectItem, SelectGroupedListItems } from '~/components/Selects';

const groupedOptions = [
	{ id: 'react', label: 'React', value: 'react', group: 'Frontend' },
	{ id: 'vue', label: 'Vue', value: 'vue', group: 'Frontend' },
	{ id: 'express', label: 'Express', value: 'express', group: 'Backend' },
	{ id: 'typescript', label: 'TypeScript', value: 'typescript' } // ungrouped
];

<SingleSelect>
	<SingleSelectContent>
		<SelectGroupedListItems groupOrder={['Frontend', 'Backend']} ungroupedPosition='bottom'>
			{({ item }) => (
				<SingleSelectItem key={item.id} value={item.value}>
					{item.label}
				</SingleSelectItem>
			)}
		</SelectGroupedListItems>
	</SingleSelectContent>
</SingleSelect>;
```

**Props:**

- `groupOrder?: string[]` - Custom order for groups
- `ungroupedPosition?: 'top' | 'bottom'` - Position for ungrouped items (default: 'top')
- `children: (props: { item: T }) => React.ReactNode` - Render function
- `className?: string` - Additional CSS classes

#### `SelectGroupedItemsVirtualized`

A virtualized version of the grouped list for handling large grouped datasets.

```tsx
import {
	SingleSelect,
	SingleSelectItem,
	SelectGroupedItemsVirtualized
} from '~/components/Selects';

<SingleSelect>
	<SingleSelectContent>
		<SelectGroupedItemsVirtualized
			estimateSize={36}
			overscan={5}
			groupOrder={['Frontend', 'Backend', 'Tools']}
			ungroupedPosition='bottom'
		>
			{({ item }) => (
				<SingleSelectItem key={item.id} value={item.value}>
					{item.label}
				</SingleSelectItem>
			)}
		</SelectGroupedItemsVirtualized>
	</SingleSelectContent>
</SingleSelect>;
```

**Props:**

- `estimateSize?: number` - Estimated height of each item (default: 36)
- `overscan?: number` - Number of items to render outside visible area (default: 5)
- `groupOrder?: string[]` - Custom order for groups
- `ungroupedPosition?: 'top' | 'bottom'` - Position for ungrouped items (default: 'top')
- `children: (props: { item: T }) => React.ReactNode` - Render function
- `className?: string` - Additional CSS classes

## Hooks

### `useSelectContext`

A hook for accessing the select context and filtered options.

```tsx
import { useSelectContext } from '~/components/Selects';

const MySelectComponent = () => {
	const { filteredOptions, selectedValues, isOpen } = useSelectContext();

	// Use the context data
	return (
		<div>
			{filteredOptions.map((option) => (
				<div key={option.id}>{option.label}</div>
			))}
		</div>
	);
};
```

**Returns:**

- `filteredOptions: T[]` - Array of filtered options based on search
- `selectedValues: string[]` - Array of selected option values
- `isOpen: boolean` - Whether the select is currently open
- `setIsOpen: (open: boolean) => void` - Function to control open state

### `useGroupedOptions`

A hook for organizing options into groups with configurable ordering.

```tsx
import { useGroupedOptions } from '~/components/Selects';

const { sortedGroups, groups } = useGroupedOptions({
	groupOrder: ['Frontend', 'Backend', 'Tools'],
	ungroupedPosition: 'bottom'
});

// Render grouped options
sortedGroups.forEach((groupName) => {
	const groupOptions = groups.get(groupName) || [];
	return (
		<SelectGroup key={groupName} heading={groupName}>
			{groupOptions.map((option) => (
				<SelectItem key={option.value} value={option.value} />
			))}
		</SelectGroup>
	);
});
```

**Parameters:**

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
<SingleSelect<Option> options={options} />;

// Extending Option with additional properties
interface ExtendedOption extends Option {
	description: string;
	icon: string;
}

<SingleSelect<ExtendedOption> options={extendedOptions} />;
```

## Utilities

### Grouping Utilities

The package includes utilities for advanced grouping operations:

- `getVirtualizedItems<T>()` - Creates a flat array of virtualized items from grouped options
- `getEstimatedItemHeight<T>()` - Estimates the size of a virtualized item based on its type

## Best Practices

### Performance

1. **Use virtualization for large datasets** - When dealing with 100+ items, use virtualized components
2. **Optimize estimateSize** - Set accurate item height estimates for better virtualization performance
3. **Adjust overscan** - Increase overscan for smoother scrolling, decrease for better memory usage

### Grouping

1. **Consistent group names** - Use consistent group names across your application
2. **Logical ordering** - Provide meaningful group order arrays
3. **Handle ungrouped items** - Decide whether ungrouped items should appear at top or bottom

### Accessibility

1. **Proper labels** - Ensure all items have meaningful labels
2. **Keyboard navigation** - The Select components handle keyboard navigation automatically
3. **Screen readers** - Use proper ARIA labels and descriptions

## Examples

### Basic Single Select

```tsx
const MySingleSelect = () => {
	const options = [
		{ id: '1', label: 'Option 1', value: 'option1' },
		{ id: '2', label: 'Option 2', value: 'option2' },
		{ id: '3', label: 'Option 3', value: 'option3' }
	];

	return (
		<SingleSelect>
			<SingleSelectTrigger>
				<SingleSelectValue placeholder='Select an option' />
			</SingleSelectTrigger>
			<SingleSelectContent>
				<SingleSelectSearch placeholder='Search options...' />
				<SingleSelectEmpty>No options found.</SingleSelectEmpty>
				{options.map((option) => (
					<SingleSelectItem key={option.id} value={option.value}>
						{option.label}
					</SingleSelectItem>
				))}
			</SingleSelectContent>
		</SingleSelect>
	);
};
```

### Multi Select with Badges

```tsx
const MyMultiSelect = () => {
	const options = [
		{ id: '1', label: 'React', value: 'react' },
		{ id: '2', label: 'Vue', value: 'vue' },
		{ id: '3', label: 'Angular', value: 'angular' }
	];

	return (
		<MultiSelect>
			<MultiSelectTrigger>
				<MultiSelectValue placeholder='Select frameworks' />
			</MultiSelectTrigger>
			<MultiSelectContent>
				<MultiSelectSearch placeholder='Search frameworks...' />
				<MultiSelectEmpty>No frameworks found.</MultiSelectEmpty>
				{options.map((option) => (
					<MultiSelectItem key={option.id} value={option.value}>
						{option.label}
					</MultiSelectItem>
				))}
			</MultiSelectContent>
		</MultiSelect>
	);
};
```

### Virtualized Select with Large Dataset

```tsx
const MyVirtualizedSelect = () => {
	const options = generateLargeOptions(); // 1000+ items

	return (
		<SingleSelect>
			<SingleSelectTrigger>
				<SingleSelectValue placeholder='Select from 1000+ options' />
			</SingleSelectTrigger>
			<SingleSelectContent>
				<SingleSelectSearch placeholder='Search options...' />
				<SelectListItemsVirtualized estimateSize={36} overscan={5}>
					{({ item, style }) => (
						<SingleSelectItem key={item.id} value={item.value} style={style}>
							<span>{item.label}</span>
							{item.description && (
								<span className='text-muted-foreground'>{item.description}</span>
							)}
						</SingleSelectItem>
					)}
				</SelectListItemsVirtualized>
			</SingleSelectContent>
		</SingleSelect>
	);
};
```

### Grouped Select with Custom Order

```tsx
const MyGroupedSelect = () => {
	const options = [
		{ id: 'react', label: 'React', value: 'react', group: 'Frontend' },
		{ id: 'vue', label: 'Vue', value: 'vue', group: 'Frontend' },
		{ id: 'express', label: 'Express', value: 'express', group: 'Backend' },
		{ id: 'typescript', label: 'TypeScript', value: 'typescript' }
	];

	return (
		<SingleSelect>
			<SingleSelectTrigger>
				<SingleSelectValue placeholder='Select technology' />
			</SingleSelectTrigger>
			<SingleSelectContent>
				<SingleSelectSearch placeholder='Search technologies...' />
				<SelectGroupedListItems groupOrder={['Frontend', 'Backend']} ungroupedPosition='bottom'>
					{({ item }) => (
						<SingleSelectItem key={item.id} value={item.value}>
							<div className='flex items-center gap-2'>
								{item.icon && <Icon name={item.icon} />}
								<span>{item.label}</span>
							</div>
						</SingleSelectItem>
					)}
				</SelectGroupedListItems>
			</SingleSelectContent>
		</SingleSelect>
	);
};
```

### Grouped Virtualized Select

```tsx
const MyGroupedVirtualizedSelect = () => {
	const options = generateGroupedOptions(); // Many grouped items

	return (
		<SingleSelect>
			<SingleSelectTrigger>
				<SingleSelectValue placeholder='Select from grouped options' />
			</SingleSelectTrigger>
			<SingleSelectContent>
				<SingleSelectSearch placeholder='Search options...' />
				<SelectGroupedItemsVirtualized
					estimateSize={40}
					overscan={8}
					groupOrder={['Favorites', 'Recent', 'All']}
					ungroupedPosition='bottom'
				>
					{({ item }) => (
						<SingleSelectItem key={item.id} value={item.value}>
							<div className='flex items-center gap-2'>
								{item.icon && <Icon name={item.icon} />}
								<span>{item.label}</span>
							</div>
						</SingleSelectItem>
					)}
				</SelectGroupedItemsVirtualized>
			</SingleSelectContent>
		</SingleSelect>
	);
};
```

## Integration with Command Package

The Selects package leverages the Command package for advanced features like virtualization and grouping. This provides:

- **Consistent API** - Same patterns across Command and Select components
- **Performance** - Shared virtualization logic for large datasets
- **Flexibility** - Reusable grouping and filtering utilities
- **Type Safety** - Consistent TypeScript support across packages

## Migration from Old Components

If you're migrating from older select components, the new API provides:

- **Better Performance** - Virtualization for large datasets
- **Enhanced Grouping** - Flexible group ordering and positioning
- **Improved Accessibility** - Better keyboard navigation and screen reader support
- **Type Safety** - Full TypeScript support with generic types
