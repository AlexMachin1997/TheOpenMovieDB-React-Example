import { cn } from '@repo/ui-core';
import { Label } from '@repo/ui-core';

interface IRadioLabel extends React.ComponentProps<typeof Label> {
	disabled?: boolean;
}

export const RadioLabel = ({ htmlFor, disabled, children, className }: IRadioLabel) => {
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

RadioLabel.displayName = 'RadioLabel';
