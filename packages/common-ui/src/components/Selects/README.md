# Select Components

The Selects package provides a comprehensive set of components for building single and multi-select interfaces with advanced features like virtualization, grouping, and search capabilities.

## ⚠️ Accessibility & HTML Compliance

**IMPORTANT**: The Select components are designed with full accessibility compliance and HTML validity in mind:

- **No Nested Buttons**: The `SelectTrigger` uses a `button` with `role="combobox"`, while `SelectItemClear` uses `asChild` with a `div` to avoid nested button issues
- **ARIA Compliance**: All components follow ARIA Authoring Practices Guide for select components
- **Keyboard Navigation**: Full keyboard support with proper focus management
- **Screen Reader Support**: Proper ARIA attributes and semantic HTML structure

## Core Components

### Single Select Components

- `SingleSelect` - The main single select container
- `SingleSelectTrigger` - Trigger button for opening the select (uses `button` with `role="combobox"`)
- `SingleSelectContent` - Dropdown content container
- `SingleSelectItem` - Individual select items
- `SingleSelectGroup` - Group container for related items
- `SingleSelectSeparator` - Visual separator between groups
- `SingleSelectSearch` - Search input component
- `SingleSelectEmpty` - Empty state component
- `SingleSelectValue` - Displays selected value with optional clear button

### Multi Select Components

- `MultiSelect` - The main multi select container
- `MultiSelectTrigger` - Trigger button for opening the select (uses `button` with `role="combobox"`)
- `MultiSelectContent` - Dropdown content container
- `MultiSelectItem` - Individual select items
- `MultiSelectGroup` - Group container for related items
- `MultiSelectSeparator` - Visual separator between groups
- `MultiSelectSearch` - Search input component
- `MultiSelectEmpty` - Empty state component
- `MultiSelectBadge` - Badge component for selected items
- `MultiSelectValue` - Displays selected values with optional clear buttons

### Shared Components

#### `SelectItemClear`

A reusable clear button component that provides consistent clear/remove functionality across both single-select and multi-select contexts. This component automatically handles the nested button issue by using `asChild` with a `div` when used inside other buttons.

```tsx
import { SelectItemClear } from '~/components/Selects';

// In a single-select context (inside SelectTrigger)
<SelectItemClear
  value="react"
  valueLabel="React"
  onClear={handleClear}
  variant="badge"
  iconSize="sm"
/>

// In a multi-select context (inside badges)
<SelectItemClear
  value="vue"
  valueLabel="Vue.js"
  onClear={handleRemove}
  variant="badge"
  iconSize="sm"
/>
```

**Props:**

- `value: string` - The value to clear
- `valueLabel?: string` - Label for the value (used in aria-label)
- `onClear: (value: string) => void` - Callback function called when the clear button is clicked
- `variant?: 'badge' | 'input'` - Variant styling for different use cases
- `className?: string` - Additional CSS classes
- `iconSize?: 'sm' | 'md'` - Icon size override
- `ariaLabel?: string` - Custom aria label
- `onRefChange?: (el: HTMLButtonElement | null) => void` - Ref callback for focus management

**Features:**

- **Automatic Nested Button Prevention**: Uses `asChild` with `div` to avoid HTML validation errors
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Event Prevention**: Stops event propagation to prevent conflicts with parent elements
- **Flexible Styling**: Different variants for badge and input contexts
- **Focus Management**: Ref callback support for multi-select focus handling

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
4. **HTML compliance** - Components automatically handle nested button issues
5. **Focus management** - Proper focus handling for clear buttons in multi-select contexts

## Examples

### Basic Single Select with Clear Button

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
				<SingleSelectValue placeholder='Select an option' showClearButton={true} />
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

### Multi Select with Badges and Clear Buttons

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

### Empty State Customization

The Selects components provide intelligent empty state handling that automatically detects whether there's an active search term and displays appropriate messages. Empty state configuration is centralized through the `SelectProvider`.

#### Basic Empty State

```tsx
<SelectProvider options={options}>
	<SelectTrigger>
		<SingleSelectValue placeholder='Select an option...' />
	</SelectTrigger>
	<SelectInterface>
		<SelectListItems>{({ item }) => <SingleSelectListItem value={item.value} />}</SelectListItems>
	</SelectInterface>
</SelectProvider>
```

**Default behavior:**

- When no search term: Shows "No options currently available"
- When search term exists: Shows "No options for '{search term}'"

#### Custom Empty State Messages

```tsx
<SelectProvider
	options={options}
	emptyState={{
		noOptionsMessage: 'No items available at the moment',
		noSearchResultsMessage: 'No items found matching "{searchTerm}"',
		formatSearchTerm: (term) => `"${term}"`
	}}
>
	<SelectTrigger>
		<SingleSelectValue placeholder='Select an option...' />
	</SelectTrigger>
	<SelectList
		search={{
			placeholder: 'Search items...'
		}}
	>
		<SelectListItems>{({ item }) => <SingleSelectListItem value={item.value} />}</SelectListItems>
	</SelectList>
</SelectProvider>
```

**Empty state configuration options:**

- `noOptionsMessage?: string` - Message when no options are available (no search)
- `noSearchResultsMessage?: string` - Message when search returns no results
- `formatSearchTerm?: (searchTerm: string) => string` - Function to customize search term display

#### Advanced Search Term Formatting

```tsx
<SelectProvider
	options={options}
	emptyState={{
		noSearchResultsMessage: 'No results found for **{searchTerm}**',
		formatSearchTerm: (term) => `**${term}**`
	}}
>
	<SelectTrigger>
		<SingleSelectValue placeholder='Select an option...' />
	</SelectTrigger>
	<SelectList
		search={{
			placeholder: 'Search items...'
		}}
	>
		<SelectListItems>{({ item }) => <SingleSelectListItem value={item.value} />}</SelectListItems>
	</SelectList>
</SelectProvider>
```

#### Empty State with Virtualized Lists

```tsx
<SelectProvider
	options={options}
	emptyState={{
		noOptionsMessage: 'No items available',
		noSearchResultsMessage: 'No items match "{searchTerm}"',
		formatSearchTerm: (term) => `"${term}"`
	}}
>
	<SelectTrigger>
		<SingleSelectValue placeholder='Select an option...' />
	</SelectTrigger>
	<SelectList>
		<SelectListItemsVirtualized estimateSize={36} overscan={5}>
			{({ item, style }) => <SingleSelectListItem key={item.id} value={item.value} style={style} />}
		</SelectListItemsVirtualized>
	</SelectList>
</SelectProvider>
```

#### Empty State with Grouped Lists

```tsx
<SelectProvider
	options={groupedOptions}
	emptyState={{
		noOptionsMessage: 'No grouped items available',
		noSearchResultsMessage: 'No grouped items match "{searchTerm}"',
		formatSearchTerm: (term) => `"${term}"`
	}}
>
	<SelectTrigger>
		<SingleSelectValue placeholder='Select an option...' />
	</SelectTrigger>
	<SelectList>
		<SelectGroupedListItems groupOrder={['Frontend', 'Backend']} ungroupedPosition='bottom'>
			{({ item }) => <SingleSelectListItem value={item.value} />}
		</SelectGroupedListItems>
	</SelectList>
</SelectProvider>
```

#### Empty State with Multi-Select

```tsx
<SelectProvider
	options={options}
	mode='multi'
	emptyState={{
		noOptionsMessage: 'No options available for selection',
		noSearchResultsMessage: 'No options match "{searchTerm}"',
		formatSearchTerm: (term) => `"${term}"`
	}}
>
	<SelectTrigger>
		<MultiSelectValue placeholder='Select options...' />
	</SelectTrigger>
	<SelectList
		search={{
			placeholder: 'Search options...'
		}}
	>
		<SelectListItems>{({ item }) => <MultiSelectListItem value={item.value} />}</SelectListItems>
	</SelectList>
</SelectProvider>
```

**Key Features:**

- **Centralized configuration** through SelectProvider
- **Automatic detection** of search state
- **Contextual messages** based on whether user is searching
- **Customizable formatting** of search terms in messages
- **Consistent behavior** across all Select components
- **No manual implementation** required at each layer
- **Works with all select variants** (single, multi, virtualized, grouped)
- **Automatic rendering** when no options are available

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
- **HTML Compliance** - No nested button issues, proper ARIA attributes
