import * as React from 'react';
import { cn } from '@repo/tailwind-config';
import { Checkbox, CheckboxLabel } from '~/components/Checkbox';
import { useRovingTabIndex } from '~/hooks/useRovingTabIndex';
import type {
	ICheckboxGroup,
	ICheckboxGroupItem
} from '~/components/CheckboxGroup/CheckboxGroup.types';

// CheckboxGroup is controlled-only: individual Radix Checkboxes have no group primitive of
// their own, so a parallel internal "uncontrolled" state would just be a second, easily
// desynced source of truth for the same selection. Callers that want uncontrolled behaviour
// should use individual `Checkbox` components with `defaultChecked` instead.
//
// That same missing primitive is why keyboard navigation is hand-rolled here via
// `useRovingTabIndex`. RadioGroup needs no equivalent — RadioGroupPrimitive.Root is already a
// roving-focus widget. The two must feel identical to a keyboard user, so the hook reproduces
// Radix's behaviour exactly; see docs/04-ui-forms-primitive-migration/plan.md, D1.
const CheckboxGroup = ({
	options = [],
	value,
	onChange,
	noOptionsAvailableMessage = 'No options currently available.',
	disabled = false,
	name,
	className,
	id,
	'aria-labelledby': ariaLabelledBy,
	'aria-describedby': ariaDescribedBy,
	'aria-invalid': ariaInvalid,
	'aria-required': ariaRequired
}: ICheckboxGroup) => {
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

	const isItemDisabled = React.useCallback(
		(index: number) => (options[index]?.disabled ?? false) || disabled,
		[options, disabled]
	);

	// Drives only which item owns the tab stop before anything is focused, so tabbing into a
	// part-selected group lands on the first selection rather than always on option one.
	const isItemChecked = React.useCallback(
		(index: number) => value.includes(options[index]?.value ?? ''),
		[options, value]
	);

	const { getItemProps } = useRovingTabIndex({
		itemCount: options.length,
		isItemDisabled,
		isItemChecked,
		disabled
	});

	return (
		<div className='w-full'>
			{/*
			 * `role='group'` and the ARIA attributes live on this container, and it is rendered
			 * whether or not there are options. Radix ships no checkbox-group primitive, so unlike
			 * RadioGroup there is no element here that carries a grouping role of its own.
			 *
			 * It must not move inside the `options.length > 0` branch below: a `Field` wrapping an
			 * empty group would then point `aria-labelledby` at an id nothing carries, which is the
			 * precise defect this deliverable exists to stamp out.
			 */}
			<div
				role='group'
				id={id}
				aria-labelledby={ariaLabelledBy}
				aria-describedby={ariaDescribedBy}
				aria-invalid={ariaInvalid}
				aria-required={ariaRequired}
				className='mx-auto w-full'
			>
				{(options?.length ?? 0) === 0 && (
					<p className='cursor-default select-none py-2 text-gray-700'>
						{noOptionsAvailableMessage}
					</p>
				)}

				{(options?.length ?? 0) > 0 && (
					<div className={cn('grid gap-3', className)}>
						{options.map((option, index) => {
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
									{...getItemProps(index)}
								/>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
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
}: ICheckboxGroupItem) => {
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
