import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Icon } from '@repo/ui-core';
import { cn } from '@repo/tailwind-config';
import { CheckedState } from '@radix-ui/react-checkbox';
import type { ICheckbox } from '~/components/Checkbox/Checkbox.types';

export const Checkbox = ({
	className,
	disabled = false,
	checked,
	defaultChecked,
	onCheckedChange,
	iconClassName,
	...props
}: ICheckbox) => {
	const handleCheckbox = (checked: CheckedState) => {
		if (disabled || !onCheckedChange) return;

		onCheckedChange(checked === 'indeterminate' ? false : checked);
	};

	return (
		<CheckboxPrimitive.Root
			data-slot='checkbox'
			className={cn(
				'peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			checked={checked}
			defaultChecked={defaultChecked}
			onCheckedChange={handleCheckbox}
			disabled={disabled}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot='checkbox-indicator'
				className='flex items-center justify-center text-current transition-none'
			>
				<Icon name='check' size='sm' className={iconClassName} />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
};
