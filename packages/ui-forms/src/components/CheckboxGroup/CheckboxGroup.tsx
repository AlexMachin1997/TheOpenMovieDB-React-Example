import * as React from 'react';
import { cn } from '@repo/tailwind-config';
import { type Option } from '@repo/core';
import { Checkbox, CheckboxLabel } from '~/components/Checkbox/Checkbox';

type CheckboxGroupProps = {
	options?: Option[];
	value: string[];
	onChange: (data: { value: string[]; name: string }) => void;
	noOptionsAvailableMessage?: string;
	disabled?: boolean;
	name: string;
	className?: string;
};

// CheckboxGroup is controlled-only: individual Radix Checkboxes have no group primitive of
// their own, so a parallel internal "uncontrolled" state would just be a second, easily
// desynced source of truth for the same selection. Callers that want uncontrolled behaviour
// should use individual `Checkbox` components with `defaultChecked` instead.
const CheckboxGroup = ({
	options = [],
	value,
	onChange,
	noOptionsAvailableMessage = 'No options currently available.',
	disabled = false,
	name,
	className,
	...props
}: CheckboxGroupProps) => {
	const handleValueChange = React.useCallback(
		(optionValue: string) => {
			const wasPreviouslyChecked = value.includes(optionValue);
			const nextValues = wasPreviouslyChecked
				? value.filter((checkbox) => checkbox !== optionValue)
				: [...value, optionValue];

			onChange({ value: nextValues, name });
		},
		[onChange, value, name]
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
							const isChecked = value.includes(option.value);
							const isOptionDisabled = option.disabled || disabled;

							return (
								<CheckboxGroupItem
									key={option.id}
									value={option.value}
									checked={isChecked}
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
			{/* Checkbox must precede the label in the DOM — Tailwind's `peer-disabled:*` on
			CheckboxLabel only matches a `.peer` that comes BEFORE it as a sibling. */}
			<Checkbox
				className={className}
				disabled={disabled}
				checked={checked}
				defaultChecked={defaultChecked}
				onCheckedChange={onCheckedChange}
				name={name}
				{...props}
			/>

			<CheckboxLabel htmlFor={props.id} disabled={disabled}>
				{label}
			</CheckboxLabel>
		</div>
	);
};

CheckboxGroup.displayName = 'CheckboxGroup';
CheckboxGroupItem.displayName = 'CheckboxGroupItem';

export { CheckboxGroup };
export type { CheckboxGroupProps };
