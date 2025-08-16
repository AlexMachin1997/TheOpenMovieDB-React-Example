import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '~/utils/className';

interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
	indeterminate?: boolean;
	value?: number;
	indicatorClassName?: string;
	showValue?: boolean;
}

const Progress = ({
	className = 'bg-primary/20',
	value = 0,
	indeterminate = false,
	indicatorClassName = 'bg-primary',
	showValue = false,
	...props
}: ProgressProps) => {
	return (
		<div className='relative'>
			<ProgressPrimitive.Root
				data-slot='progress'
				className={cn('relative h-2 w-full overflow-hidden rounded-full', className)}
				{...props}
			>
				<ProgressPrimitive.Indicator
					data-slot='progress-indicator'
					className={cn(
						'h-full transition-all',
						indeterminate ? 'w-full animate-slide' : 'flex-1',
						indicatorClassName
					)}
					style={indeterminate ? {} : { transform: `translateX(-${100 - value}%)` }}
				/>
			</ProgressPrimitive.Root>
			{showValue && (
				<div className='absolute inset-0 flex items-center justify-center text-xs font-medium text-white mix-blend-difference'>
					{`${value}%`}
				</div>
			)}
		</div>
	);
};

export { Progress };
