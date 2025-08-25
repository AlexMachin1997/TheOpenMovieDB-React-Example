import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '~/utils/className';
import { Option } from '~/types/Option';
import { Radio, RadioLabel } from '~/components/Radio/Radio';

type RadioGroupProps = {
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

const RadioGroup = ({
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
}: RadioGroupProps) => {
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

type RadioGroupItemProps = React.ComponentProps<typeof Radio> & {
	label: string;
};

const RadioGroupItem = ({
	className,
	label,
	disabled = false,
	iconClassName,
	...props
}: RadioGroupItemProps) => {
	return (
		<div
			className={cn('flex items-center space-x-2', {
				'cursor-not-allowed': disabled,
				'cursor-pointer': !disabled
			})}
		>
			<RadioLabel htmlFor={props.id} disabled={disabled}>
				{label}
			</RadioLabel>

			<Radio className={className} disabled={disabled} iconClassName={iconClassName} {...props} />
		</div>
	);
};

RadioGroup.displayName = 'RadioGroup';
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup };
export type { RadioGroupProps };
