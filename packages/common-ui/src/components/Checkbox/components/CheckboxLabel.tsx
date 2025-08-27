import { cn } from '~/utils/className';
import { Label } from '~/components/Label/Label';

interface ICheckboxLabel extends React.ComponentProps<typeof Label> {
	disabled?: boolean;
}

export const CheckboxLabel = ({ htmlFor, disabled, children, className }: ICheckboxLabel) => {
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
