import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';

import { cn } from '~/utils/className';

type Option = {
	label: string;
	id: string;
	value: string;
	order?: number;
	disabled?: boolean;
};

type CheckboxGroupProps = {
	options?: Option[];
	value?: string[];
	defaultValue?: string[];
	onChange?: ((data: { value: string[]; name: string }) => void) | null;
	noOptionsAvailableMessage?: string;
	disabled?: boolean;
	labelPosition?: 'left' | 'right';
	name: string;
	className?: string;
} & Omit<React.ComponentProps<'div'>, 'onChange' | 'value' | 'defaultValue'>;

const CheckboxGroup = ({
	options = [],
	value = undefined,
	onChange = null,
	noOptionsAvailableMessage = 'No options currently available.',
	disabled = false,
	labelPosition = 'left',
	name,
	className,
	defaultValue = [],
	...props
}: CheckboxGroupProps) => {
	// Determine if this is controlled or uncontrolled
	const isControlled = value !== undefined;

	const handleValueChange = React.useCallback(
		(optionValue: string, checked: boolean) => {
			if (onChange) {
				const currentValues = value || defaultValue;
				const newValue = checked
					? [...currentValues, optionValue]
					: currentValues.filter((v) => v !== optionValue);

				onChange({ value: newValue, name });
			}
		},
		[onChange, name, value, defaultValue]
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
								<CheckboxGroupOption
									key={option.id}
									value={option.value}
									// For controlled mode: use checked and onCheckedChange
									// For uncontrolled mode: use defaultChecked and no onCheckedChange
									checked={isControlled ? isChecked : undefined}
									defaultChecked={!isControlled ? isChecked : undefined}
									onCheckedChange={
										isControlled ? (checked) => handleValueChange(option.value, checked) : undefined
									}
									disabled={isOptionDisabled}
									labelPosition={labelPosition}
									label={option.label}
									id={option.id}
									// Each checkbox needs a unique name for form submission
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

type CheckboxGroupOptionProps = {
	label?: string;
	labelPosition?: 'left' | 'right';
	className?: string;
	disabled?: boolean;
	checked?: boolean;
	defaultChecked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	name?: string;
} & Omit<
	React.ComponentProps<typeof CheckboxPrimitive.Root>,
	'checked' | 'defaultChecked' | 'onCheckedChange'
>;

const CheckboxGroupOption = ({
	className,
	label,
	labelPosition = 'left',
	disabled = false,
	checked,
	defaultChecked,
	onCheckedChange,
	name,
	...props
}: CheckboxGroupOptionProps) => {
	return (
		<div
			className={cn('flex items-center space-x-2', {
				'cursor-not-allowed': disabled,
				'cursor-pointer': !disabled
			})}
		>
			{labelPosition === 'left' && (
				<Checkbox
					className={className}
					disabled={disabled}
					checked={checked}
					defaultChecked={defaultChecked}
					onCheckedChange={onCheckedChange}
					name={name}
					{...props}
				/>
			)}
			{label && (
				<CheckboxLabel
					htmlFor={props.id}
					disabled={disabled}
					className={cn({
						'flex-1': labelPosition === 'right'
					})}
				>
					{label}
				</CheckboxLabel>
			)}
			{labelPosition === 'right' && (
				<Checkbox
					className={className}
					disabled={disabled}
					checked={checked}
					defaultChecked={defaultChecked}
					onCheckedChange={onCheckedChange}
					name={name}
					{...props}
				/>
			)}
		</div>
	);
};

type CheckboxProps = {
	className?: string;
	disabled?: boolean;
	checked?: boolean;
	defaultChecked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
} & Omit<
	React.ComponentProps<typeof CheckboxPrimitive.Root>,
	'checked' | 'defaultChecked' | 'onCheckedChange'
>;

const Checkbox = ({
	className,
	disabled = false,
	checked,
	defaultChecked,
	onCheckedChange,
	...props
}: CheckboxProps) => {
	return (
		<CheckboxPrimitive.Root
			data-slot='checkbox'
			className={cn(
				'peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			checked={checked}
			defaultChecked={defaultChecked}
			onCheckedChange={onCheckedChange}
			disabled={disabled}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot='checkbox-indicator'
				className='flex items-center justify-center text-current transition-none'
			>
				<CheckIcon className='size-3.5' />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
};

type CheckboxLabelProps = {
	htmlFor?: string;
	disabled?: boolean;
	children: React.ReactNode;
	className?: string;
};

const CheckboxLabel = ({ htmlFor, disabled = false, children, className }: CheckboxLabelProps) => {
	return (
		<label
			htmlFor={htmlFor}
			className={cn(
				'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
				{
					'cursor-not-allowed': disabled,
					'cursor-pointer': !disabled
				},
				className
			)}
		>
			{children}
		</label>
	);
};

CheckboxGroup.displayName = 'CheckboxGroup';
CheckboxGroupOption.displayName = 'CheckboxGroupOption';
Checkbox.displayName = 'Checkbox';
CheckboxLabel.displayName = 'CheckboxLabel';

export { CheckboxGroup, Checkbox };
export type { CheckboxGroupProps, Option };
