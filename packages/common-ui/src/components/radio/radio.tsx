import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { CircleIcon } from 'lucide-react';
import { cn } from '~/utils/className';
import { Label } from '~/components/label/label';

const RadioLabel = ({
	htmlFor,
	disabled,
	children,
	className
}: React.ComponentProps<typeof Label> & { disabled?: boolean }) => {
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

type RadioProps = React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
	iconClassName?: string;
};

const Radio = ({ className, disabled = false, iconClassName, ...props }: RadioProps) => {
	return (
		<RadioGroupPrimitive.Item
			data-slot='radio'
			className={cn(
				'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			disabled={disabled}
			{...props}
		>
			<RadioGroupPrimitive.Indicator
				data-slot='radio-indicator'
				className='relative flex items-center justify-center'
			>
				<CircleIcon
					className={cn(
						'fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2',
						iconClassName
					)}
				/>
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	);
};

export { Radio, RadioLabel };
