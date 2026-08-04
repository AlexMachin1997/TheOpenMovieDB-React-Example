import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

/**
 * Properties for the SliderRoot component.
 *
 * @example
 * ```tsx
 * <SliderRoot defaultValue={[50]} max={100} step={1}>
 *   <SliderTrack>
 *     <SliderRange />
 *   </SliderTrack>
 *   <SliderThumb />
 * </SliderRoot>
 * ```
 */
export interface ISliderRoot extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
	className?: string;
}

/** Properties for SliderTrack. */
export interface ISliderTrack extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track> {
	className?: string;
}

/** Properties for SliderRange. */
export interface ISliderRange extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Range> {
	className?: string;
}

/** Properties for SliderThumb. */
export interface ISliderThumb extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb> {
	className?: string;
}
