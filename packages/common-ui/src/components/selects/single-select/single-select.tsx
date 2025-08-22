import * as React from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '~/utils/className';
import { CommandItem } from '~/components/command/command';
import { useSelectContext } from '~/components/selects/core/hooks/useSelectContext';
import { SelectItemClear } from '~/components/selects/core/components/select-item-clear';

/**
 * Props for the SingleSelectValue component
 *
 * @interface SingleSelectValueProps
 */
interface SingleSelectValueProps extends Omit<React.ComponentPropsWithoutRef<'ul'>, 'children'> {
	/** Placeholder text shown when no option is selected */
	placeholder?: string;
	/** Whether to show a clear button for removing the selected value */
	showClearButton?: boolean;
}

/**
 * Displays the selected value in a single-select interface
 *
 * This component shows the currently selected option with an optional clear button.
 * When no option is selected, it displays placeholder text. The component automatically
 * closes the dropdown when a selection is made.
 *
 * Features:
 * - Displays selected value or placeholder text
 * - Optional clear button for deselecting
 * - Integrates with SelectProvider context
 * - Supports custom styling and accessibility
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <SingleSelectValue placeholder="Choose a framework..." />
 *
 * // Without clear button
 * <SingleSelectValue
 *   placeholder="Select an option..."
 *   showClearButton={false}
 * />
 * ```
 *
 * @param props - The component props
 * @returns The rendered single-select value display component
 */
export const SingleSelectValue = ({
	placeholder = 'Select an option',
	className,
	showClearButton = true,
	...props
}: SingleSelectValueProps) => {
	const { selectedValues, optionsMap, toggleValue } = useSelectContext();

	// For single select, we only care about the first selected value
	const selectedValue = Array.from(selectedValues)[0];

	const handleClear = (value?: string) => {
		if (value) {
			toggleValue(value, 'single');
		}
	};

	if (selectedValues.size === 0) {
		return (
			<ul
				{...props}
				className={cn('min-w-0 overflow-hidden font-normal text-muted-foreground', className)}
			>
				<li>{placeholder}</li>
			</ul>
		);
	}

	return (
		<ul {...props} className={cn('group flex items-center gap-1', className)}>
			<li className='flex items-center gap-1'>
				<p className='min-w-0 overflow-hidden truncate'>{optionsMap.get(selectedValue ?? '')}</p>
				{showClearButton && (
					<SelectItemClear
						value={selectedValue}
						valueLabel={optionsMap.get(selectedValue ?? '')}
						onClear={handleClear}
						variant='badge'
						iconSize='sm'
					/>
				)}
			</li>
		</ul>
	);
};

/**
 * Props for the SingleSelectListItem component
 *
 * @interface SingleSelectListItemProps
 */
interface SingleSelectListItemProps
	extends Omit<React.ComponentPropsWithoutRef<typeof CommandItem>, 'value'> {
	/** The value of this option */
	value: string;
}

/**
 * A selectable item in a single-select dropdown list
 *
 * This component renders an individual option in the dropdown list. When selected,
 * it automatically closes the dropdown and updates the selection state. Only one
 * item can be selected at a time in single-select mode.
 *
 * Features:
 * - Shows checkmark for selected state
 * - Closes dropdown on selection
 * - Integrates with command/search functionality
 * - Supports disabled state
 * - Accessibility compliant
 *
 * @component
 * @example
 * ```tsx
 * <SelectListItems>
 *   {({ item }) => (
 *     <SingleSelectListItem
 *       value={item.value}
 *       disabled={item.disabled}
 *     />
 *   )}
 * </SelectListItems>
 * ```
 *
 * @param props - The component props
 * @returns The rendered select list item component
 */
export const SingleSelectListItem = ({
	value,
	disabled = false,
	...props
}: SingleSelectListItemProps) => {
	const { toggleValue, selectedValues, optionsMap, setOpen } = useSelectContext();

	const handleSelect = () => {
		console.log('handleSelect', value);
		toggleValue(value, 'single');
		setOpen(false);
	};

	return (
		<CommandItem
			{...props}
			value={optionsMap.get(value)}
			onSelect={handleSelect}
			disabled={disabled}
		>
			<CheckIcon
				className={cn('mr-2 size-4', selectedValues.has(value) ? 'opacity-100' : 'opacity-0')}
			/>
			{optionsMap.get(value)}
		</CommandItem>
	);
};
