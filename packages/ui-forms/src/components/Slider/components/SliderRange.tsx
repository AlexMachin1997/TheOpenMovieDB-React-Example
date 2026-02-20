import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@repo/tailwind-config';
import type { ISliderRange } from '~/components/Slider/Slider.types';

export const SliderRange = ({ className, ...props }: ISliderRange) => (
	<SliderPrimitive.Range
		data-slot='slider-range'
		className={cn('absolute bg-blue-500 rounded-full h-full', className)}
		{...props}
	/>
);

SliderRange.displayName = 'SliderRange';
