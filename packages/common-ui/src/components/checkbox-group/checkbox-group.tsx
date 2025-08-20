import * as React from 'react';
import { cn } from '~/utils/className';
import { Option } from '~/types/Option';
import { Checkbox, CheckboxLabel } from '~/components/checkbox/checkbox';

type CheckboxGroupProps = {
	options?: Option[];
	value?: string[];
	defaultValue?: string[];
	onChange?: ((data: { value: string[]; name: string }) => void) | null;
	noOptionsAvailableMessage?: string;
	disabled?: boolean;
	name: string;
	className?: string;
};

const CheckboxGroup = ({
	options = [],
	value = undefined,
	onChange = null,
	noOptionsAvailableMessage = 'No options currently available.',
	disabled = false,
	name,
	className,
	defaultValue = [],
	...props
}: CheckboxGroupProps) => {
	const isControlled = React.useMemo(() => value !== undefined, [value]);

	const handleValueChange = React.useCallback(
		(optionValue: string) => {
			if (onChange && isControlled) {
				const wasPreviouslyChecked = value?.includes(optionValue);

				const existingCheckboxes = [...(value || [])];

				const index = existingCheckboxes.findIndex((checkbox) => checkbox === optionValue);

				if (wasPreviouslyChecked === false) {
					existingCheckboxes.push(optionValue);
				} else if (wasPreviouslyChecked === true && index !== -1) {
					existingCheckboxes.splice(index, 1);
				}

				onChange({ value: existingCheckboxes, name });
			}
		},
		[onChange, value, isControlled, name]
	);

	return (
		<div className='w-full' {...props}>
			<div className='mx-auto w-full'>
				{(options?.length ?? 0) === 0 && (
					<p className='cursor-default select-none py-2 text-gray-700'>
						{noOptionsAvailableMessage}
					</p>
				)}

				{(options?.length ?? 0) > 0 && (
					<div className={cn('grid gap-3', className)}>
						{options.map((option) => {
							const currentValues = value || defaultValue;
							const isChecked = currentValues.includes(option.value);
							const isOptionDisabled = option.disabled || disabled;

							return (
								<CheckboxGroupItem
									key={option.id}
									value={option.value}
									checked={isControlled ? isChecked : undefined}
									defaultChecked={!isControlled ? isChecked : undefined}
									onCheckedChange={() => handleValueChange(option.value)}
									disabled={isOptionDisabled}
									label={option.label}
									id={option.id}
									name={`${name}-${option.value}`}
								/>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

type CheckboxGroupItemProps = React.ComponentProps<typeof Checkbox> & {
	label: string;
};

const CheckboxGroupItem = ({
	className,
	label,
	disabled = false,
	checked,
	defaultChecked,
	onCheckedChange,
	name,
	...props
}: CheckboxGroupItemProps) => {
	return (
		<div
			className={cn('flex items-center space-x-2', {
				'cursor-not-allowed': disabled,
				'cursor-pointer': !disabled
			})}
		>
			<CheckboxLabel htmlFor={props.id} disabled={disabled}>
				{label}
			</CheckboxLabel>

			<Checkbox
				className={className}
				disabled={disabled}
				checked={checked}
				defaultChecked={defaultChecked}
				onCheckedChange={onCheckedChange}
				name={name}
				{...props}
			/>
		</div>
	);
};

CheckboxGroup.displayName = 'CheckboxGroup';
CheckboxGroupItem.displayName = 'CheckboxGroupItem';

export { CheckboxGroup };
export type { CheckboxGroupProps };
