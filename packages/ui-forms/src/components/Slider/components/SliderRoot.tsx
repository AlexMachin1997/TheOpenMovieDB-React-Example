import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@repo/tailwind-config';
import type { ISliderRoot } from '~/components/Slider/Slider.types';

export const SliderRoot = ({ className, ...props }: ISliderRoot) => (
	<SliderPrimitive.Root
		data-slot='slider-root'
		className={cn('relative flex items-center w-full h-5', className)}
		{...props}
	/>
);
SliderRoot.displayName = 'SliderRoot';
