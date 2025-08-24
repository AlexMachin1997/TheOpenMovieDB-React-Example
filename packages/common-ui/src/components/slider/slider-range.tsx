import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '~/utils/className';

type SliderRangeProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Range> & {
	className?: string;
};

export const SliderRange = ({ className, ...props }: SliderRangeProps) => (
	<SliderPrimitive.Range
		data-slot='slider-range'
		className={cn('absolute bg-blue-500 rounded-full h-full', className)}
		{...props}
	/>
);

SliderRange.displayName = 'SliderRange';
