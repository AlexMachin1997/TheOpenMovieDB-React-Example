import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@repo/tailwind-config';
import type { ISliderTrack } from '~/components/Slider/Slider.types';

export const SliderTrack = ({ className, ...props }: ISliderTrack) => (
	<SliderPrimitive.Track
		data-slot='slider-track'
		className={cn('bg-gray-200 relative flex-1 rounded-full h-1', className)}
		{...props}
	/>
);
SliderTrack.displayName = 'SliderTrack';
