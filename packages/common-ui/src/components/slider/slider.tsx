import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '~/utils/className';

const SliderRoot = React.forwardRef<
	React.ComponentRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		data-slot='slider-root'
		className={cn('relative flex items-center w-full h-5', className)}
		{...props}
	/>
));
SliderRoot.displayName = 'SliderRoot';

const SliderTrack = React.forwardRef<
	React.ComponentRef<typeof SliderPrimitive.Track>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Track
		ref={ref}
		data-slot='slider-track'
		className={cn('bg-gray-200 relative flex-1 rounded-full h-1', className)}
		{...props}
	/>
));
SliderTrack.displayName = 'SliderTrack';

const SliderRange = React.forwardRef<
	React.ComponentRef<typeof SliderPrimitive.Range>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Range>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Range
		ref={ref}
		data-slot='slider-range'
		className={cn('absolute bg-blue-500 rounded-full h-full', className)}
		{...props}
	/>
));
SliderRange.displayName = 'SliderRange';

const SliderThumb = React.forwardRef<
	React.ComponentRef<typeof SliderPrimitive.Thumb>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Thumb
		ref={ref}
		data-slot='slider-thumb'
		className={cn(
			'block w-4 h-4 bg-white border border-gray-300 rounded-full shadow hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400',
			className
		)}
		{...props}
	/>
));
SliderThumb.displayName = 'SliderThumb';

export { SliderRoot, SliderTrack, SliderRange, SliderThumb };
