import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { CircleIcon } from 'lucide-react';
import { cn } from '~/utils/className';
import { Label } from '~/components/label/label';

type Option = {
	label: string;
	id: string;
	value: string;
	order?: number;
	disabled?: boolean;
};

type RadioGroupProps = {
	options?: Option[];
	value?: string;
	defaultValue?: string;
	onChange?: ((data: { value: string; name: string }) => void) | null;
	noOptionsAvailableMessage?: string;
	disabled?: boolean;
	labelPosition?: 'left' | 'right';
	name: string;
	className?: string;
} & Omit<
	React.ComponentProps<typeof RadioGroupPrimitive.Root>,
	'onValueChange' | 'value' | 'defaultValue' | 'onChange'
>;

const RadioGroup = ({
	options = [],
	value = undefined,
	onChange = null,
	noOptionsAvailableMessage = 'No options currently available.',
	disabled = false,
	labelPosition = 'left',
	name,
	className,
	defaultValue,
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
							<RadioGroupOption
								key={option.id}
								value={option.value}
								disabled={option.disabled || disabled}
								labelPosition={labelPosition}
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

type RadioGroupOptionProps = {
	label?: string;
	labelPosition?: 'left' | 'right';
	className?: string;
	disabled?: boolean;
} & React.ComponentProps<typeof RadioGroupPrimitive.Item>;

const RadioGroupOption = ({
	className,
	label,
	labelPosition = 'left',
	disabled = false,
	...props
}: RadioGroupOptionProps) => {
	return (
		<div
			className={cn('flex items-center space-x-2', {
				'cursor-not-allowed': disabled,
				'cursor-pointer': !disabled
			})}
		>
			{labelPosition === 'left' && (
				<RadioButton className={className} disabled={disabled} {...props} />
			)}

			{label && (
				<RadioLabel
					htmlFor={props.id}
					disabled={disabled}
					className={cn({
						'flex-1': labelPosition === 'right'
					})}
				>
					{label}
				</RadioLabel>
			)}

			{labelPosition === 'right' && (
				<RadioButton className={className} disabled={disabled} {...props} />
			)}
		</div>
	);
};

type RadioButtonProps = {
	className?: string;
	disabled?: boolean;
} & React.ComponentProps<typeof RadioGroupPrimitive.Item>;

const RadioButton = ({ className, disabled = false, ...props }: RadioButtonProps) => {
	return (
		<RadioGroupPrimitive.Item
			data-slot='radio-group-item'
			className={cn(
				'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			disabled={disabled}
			{...props}
		>
			<RadioGroupPrimitive.Indicator
				data-slot='radio-group-indicator'
				className='relative flex items-center justify-center'
			>
				<CircleIcon className='fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2' />
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	);
};

type RadioLabelProps = {
	htmlFor?: string;
	disabled?: boolean;
	children: React.ReactNode;
	className?: string;
};

const RadioLabel = ({ htmlFor, disabled = false, children, className }: RadioLabelProps) => {
	return (
		<Label
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
		</Label>
	);
};

type RadioGroupItemProps = {
	label?: string;
	labelPosition?: 'left' | 'right';
	className?: string;
} & React.ComponentProps<typeof RadioGroupPrimitive.Item>;

const RadioGroupItem = ({
	className,
	label,
	labelPosition = 'left',
	disabled = false,
	...props
}: RadioGroupItemProps) => {
	return (
		<RadioGroupOption
			className={className}
			label={label}
			labelPosition={labelPosition}
			disabled={disabled}
			{...props}
		/>
	);
};

RadioGroup.displayName = 'RadioGroup';
RadioGroupOption.displayName = 'RadioGroupOption';
RadioButton.displayName = 'RadioButton';
RadioLabel.displayName = 'RadioLabel';
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup };
export type { RadioGroupProps, Option };
