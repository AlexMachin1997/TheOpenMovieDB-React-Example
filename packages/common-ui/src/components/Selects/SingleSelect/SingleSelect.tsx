import * as React from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '~/utils/className';
import { CommandItem } from '~/components/Command/Command';
import { useSelectContext } from '~/components/Selects/hooks/useSelectContext';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';
import { SelectItemClear } from '~/components/Selects/components/SelectItemClear';
import {
	SingleSelectValueProps,
	BaseSelectItemProps
} from '~/components/Selects/types/base-select-types';

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
	const { selectedValues, toggleValue } = useSelectContext();
	const { optionsMap } = useCommandContext();

	// For single select, we only care about the first selected value
	const selectedValue = Array.from(selectedValues)[0];

	const handleClear = (value: string) => {
		toggleValue(value);
	};

	if (selectedValues.size === 0 || !selectedValue) {
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
						valueLabel={optionsMap.get(selectedValue)}
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
 * A selectable item in a single-select dropdown list
 *
 * This component renders an individual option in the dropdown list. When selected,
 * it automatically closes the dropdown and updates the selection state. Only one
 * option can be selected at a time in single-select mode.
 *
 * Features:
 * - Visual feedback for selected state with check icon
 * - Automatic dropdown closing on selection
 * - Proper accessibility and keyboard navigation
 * - Integration with SelectProvider context
 * - Consistent styling with other command items
 *
 * The component automatically handles the selection logic and provides visual
 * feedback through the check icon when an option is selected.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <SingleSelectListItem value="react" />
 *
 * // With custom content
 * <SingleSelectListItem value="vue">
 *   <Icon name="vue" />
 *   Vue.js
 * </SingleSelectListItem>
 * ```
 *
 * @param props - The component props
 * @returns The rendered single-select list item component
 */
export const SingleSelectListItem = ({ value, children, ...props }: BaseSelectItemProps) => {
	const { selectedValues, toggleValue } = useSelectContext();
	const { optionsMap } = useCommandContext();

	const handleSelect = React.useCallback(() => {
		toggleValue(value);
	}, [toggleValue, value]);

	return (
		<CommandItem {...props} value={optionsMap.get(value)} onSelect={handleSelect}>
			<CheckIcon
				className={cn('mr-2 size-4', selectedValues.has(value) ? 'opacity-100' : 'opacity-0')}
			/>
			<p>{optionsMap.get(value)}</p>
		</CommandItem>
	);
};
