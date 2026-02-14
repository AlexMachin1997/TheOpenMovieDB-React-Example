import { cn } from '@repo/ui-core';
import { useSelectContext } from '~/components/Selects/hooks/useSelectContext';
import { useCommandContext } from '@repo/ui-command';
import { SelectItemClear } from '~/components/Selects/components/SelectItemClear';
import { ISingleSelectValue } from '~/components/Selects/types/select-value';

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
