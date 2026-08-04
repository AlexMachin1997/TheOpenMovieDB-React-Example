import { cn } from '@repo/tailwind-config';
import { Label } from '~/components/Label/Label';
import type { ICheckboxLabel } from '~/components/Checkbox/Checkbox.types';

export const CheckboxLabel = ({ htmlFor, disabled, children, className, ...props }: ICheckboxLabel) => {
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
			{...props}
		>
			{children}
		</Label>
	);
};
