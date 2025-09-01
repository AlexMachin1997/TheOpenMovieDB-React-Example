import { cn } from '~/utils/className';
import { useSelectContext } from '~/components/Selects/hooks/useSelectContext';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';
import { SelectItemClear } from '~/components/Selects/components/SelectItemClear';
import { ISingleSelectValue } from '~/components/Selects/types/select-value';

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
}: ISingleSelectValue) => {
	const { selectedValues, toggleValue } = useSelectContext();
	const { optionsMap } = useCommandContext();

	const selectedValue = Array.from(selectedValues)[0];

	const handleClear = (value: string) => {
		toggleValue(value);
	};

	if (!selectedValue) {
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
