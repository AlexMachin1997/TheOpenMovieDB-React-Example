import * as React from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '~/utils/className';
import { CommandItem } from '~/components/Command/Command';
import { useSelectContext } from '~/components/Selects/hooks/useSelectContext';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';

/**
 * Props for the SelectListItem component
 *
 * @interface SelectListItemProps
 * @extends Omit<React.ComponentPropsWithoutRef<typeof CommandItem>, 'value'>
 */
interface SelectListItemProps
	extends Omit<React.ComponentPropsWithoutRef<typeof CommandItem>, 'value'> {
	/** The value of this select option */
	value: string;
}

/**
 * Individual selectable item within a select dropdown
 *
 * This component represents a single selectable option in a select dropdown.
 * It extends the CommandItem component with select-specific functionality
 * including visual selection indicators and integration with the select context.
 *
 * Features:
 * - Visual checkmark indicator for selected state
 * - Integration with SelectContext for state management
 * - Automatic value toggling on selection
 * - Support for disabled state
 * - Proper accessibility and keyboard navigation
 * - Consistent styling with command palette design
 * - Checkmark always positioned on the left with opacity toggle
 *
 * The component automatically:
 * - Shows a checkmark icon when the item is selected
 * - Handles selection toggling through the select context
 * - Displays the option label from the options map
 * - Supports both single and multi-select modes
 *
 * Visual behavior:
 * - Checkmark on left, always visible with opacity toggle
 * - Text is truncated with ellipsis if too long
 * - Proper spacing and alignment with other items
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <SelectListItem value="react" />
 *
 * // With custom content
 * <SelectListItem value="angular">
 *   <Icon name="angular" />
 *   Angular
 * </SelectListItem>
 * ```
 *
 * @param props - The select list item configuration props
 * @returns The rendered select list item component
 */
export const SelectListItem = ({ value, children, ...props }: SelectListItemProps) => {
	const { toggleValue, selectedValues } = useSelectContext();
	const { optionsMap } = useCommandContext();

	const isSelected = selectedValues.has(value);

	const handleSelectItem = React.useCallback(() => {
		toggleValue(value);
	}, [toggleValue, value]);

	return (
		<CommandItem {...props} value={optionsMap.get(value)} onSelect={handleSelectItem}>
			<CheckIcon className={cn('mr-2 size-4', isSelected ? 'opacity-100' : 'opacity-0')} />
			{children}
			<p>{optionsMap.get(value)}</p>
		</CommandItem>
	);
};
