import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@repo/tailwind-config';
import { Radio } from '~/components/Radio/components/Radio';
import { RadioLabel } from '~/components/Radio/components/RadioLabel';
import type { IRadioGroup, IRadioGroupItem } from '~/components/RadioGroup/RadioGroup.types';

// RadioGroup is controlled-only, mirroring CheckboxGroup. Radix's RadioGroupPrimitive.Root does
// support an uncontrolled `defaultValue`, so this is a deliberate narrowing rather than a
// limitation: consistency between the two group components wins over exploring an uncontrolled
// mode for one of them alone. Callers that want uncontrolled behaviour can compose
// `RadioGroupPrimitive.Root` with `Radio` themselves.
//
// Keyboard navigation is not implemented here. RadioGroupPrimitive.Root is a roving-tabindex
// widget already — arrows, Home/End, PageUp/PageDown, wraparound and disabled-skipping all come
// from `@radix-ui/react-roving-focus` underneath it. CheckboxGroup has to reproduce that by hand
// (`useRovingTabIndex`) only because Radix ships no checkbox-group primitive.
const RadioGroup = ({
	options = [],
	value,
	onChange,
	noOptionsAvailableMessage = 'No options currently available.',
	disabled = false,
	name,
	className,
	...props
}: IRadioGroup) => {
	const handleValueChange = React.useCallback(
		(optionValue: string) => {
			onChange({ value: optionValue, name });
		},
		[onChange, name]
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
					<RadioGroupPrimitive.Root
						data-slot='radio-group'
						className={cn('grid gap-3', className)}
						value={value}
						onValueChange={handleValueChange}
						disabled={disabled}
						name={name}
					>
						{options.map((option) => (
							<RadioGroupItem
								key={option.id}
								value={option.value}
								disabled={option.disabled || disabled}
								label={option.label}
								id={option.id}
							/>
						))}
					</RadioGroupPrimitive.Root>
				)}
			</div>
		</div>
	);
};

const RadioGroupItem = ({ className, label, disabled = false, id, ...props }: IRadioGroupItem) => {
	return (
		<div
			className={cn('flex items-center space-x-2', {
				'cursor-not-allowed': disabled,
				'cursor-pointer': !disabled
			})}
		>
			{/* Radio must precede the label in the DOM — Tailwind's `peer-disabled:*` on RadioLabel
			only matches a `.peer` that comes BEFORE it as a sibling. */}
			<Radio className={className} disabled={disabled} id={id} {...props} />

			<RadioLabel htmlFor={id} disabled={disabled}>
				{label}
			</RadioLabel>
		</div>
	);
};

RadioGroup.displayName = 'RadioGroup';
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup };
