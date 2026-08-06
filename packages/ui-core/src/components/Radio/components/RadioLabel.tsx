import { cn } from '@repo/tailwind-config';
import { Label } from '~/components/Label/Label';
import type { IRadioLabel } from '~/components/Radio/Radio.types';

export const RadioLabel = ({ htmlFor, disabled, children, className, ...props }: IRadioLabel) => {
	return (
		<Label
			htmlFor={htmlFor}
			// A per-item option label sits beside its radio, not above a whole field, so it keeps
			// the medium weight `Label` used before `emphasis` existed.
			emphasis={false}
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

RadioLabel.displayName = 'RadioLabel';
