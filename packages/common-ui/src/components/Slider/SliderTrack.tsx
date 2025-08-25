import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '~/utils/className';

type SliderTrackProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track> & {
	className?: string;
};

export const SliderTrack = ({ className, ...props }: SliderTrackProps) => (
	<SliderPrimitive.Track
		data-slot='slider-track'
		className={cn('bg-gray-200 relative flex-1 rounded-full h-1', className)}
		{...props}
	/>
);
SliderTrack.displayName = 'SliderTrack';
