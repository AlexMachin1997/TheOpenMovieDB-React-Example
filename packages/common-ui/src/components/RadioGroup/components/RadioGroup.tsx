import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '~/utils/className';
import { Option } from '~/types/Option';
import { RadioGroupItem } from '~/components/RadioGroup/components/RadioGroupItem';

type IRadioGroup = {
	options?: Option[];
	value?: string;
	defaultValue?: string;
	onChange?: ((data: { value: string; name: string }) => void) | null;
	noOptionsAvailableMessage?: string;
	disabled?: boolean;
	name: string;
	className?: string;
	iconClassName?: string;
};

export const RadioGroup = ({
	options = [],
	value = undefined,
	onChange = null,
	noOptionsAvailableMessage = 'No options currently available.',
	disabled = false,
	name,
	className,
	defaultValue,
	iconClassName,
	...props
}: IRadioGroup) => {
	const handleValueChange = React.useCallback(
		(newValue: string) => {
			if (onChange) {
				onChange({ value: newValue, name });
			}
		},
		[onChange, name]
	);

	return (
		<div className='w-full'>
			<div className='mx-auto w-full'>
				{(options?.length ?? 0) === 0 && (
					<p className='cursor-default select-none py-2 text-gray-700'>
						{noOptionsAvailableMessage}
					</p>
				)}

				{(options?.length ?? 0) > 0 && (
					<RadioGroupPrimitive.Root
						data-slot='radio-group'
						className={cn('grid gap-3', className)}
						value={value}
						onValueChange={handleValueChange}
						name={name}
						defaultValue={defaultValue}
						disabled={disabled}
						{...props}
					>
						{options.map((option) => (
							<RadioGroupItem
								key={option.id}
								value={option.value}
								disabled={option.disabled || disabled}
								label={option.label}
								id={option.id}
								iconClassName={iconClassName}
							/>
						))}
					</RadioGroupPrimitive.Root>
				)}
			</div>
		</div>
	);
};

RadioGroup.displayName = 'RadioGroup';
