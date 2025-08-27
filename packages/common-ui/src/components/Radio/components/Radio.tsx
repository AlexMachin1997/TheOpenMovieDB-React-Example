import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { CircleIcon } from 'lucide-react';
import { cn } from '~/utils/className';

type IRadio = React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
	iconClassName?: string;
};

export const Radio = ({ className, disabled = false, iconClassName, ...props }: IRadio) => {
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

Radio.displayName = 'Radio';
