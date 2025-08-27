import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '~/utils/className';

type SliderThumbProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb> & {
	className?: string;
};

export const SliderThumb = ({ className, ...props }: SliderThumbProps) => (
	<SliderPrimitive.Thumb
		data-slot='slider-thumb'
		className={cn(
			'block w-4 h-4 bg-white border border-gray-300 rounded-full shadow hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400',
			className
		)}
		{...props}
	/>
);

SliderThumb.displayName = 'SliderThumb';
