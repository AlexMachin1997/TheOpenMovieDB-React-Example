'use client';

import * as React from 'react';
import * as Slider from '@radix-ui/react-slider';
import { motion, AnimatePresence } from 'motion/react';
import { Label } from '~/components/label/label';
import {
	DualValue,
	SingleValue,
	SliderInputProps,
	SliderTooltipInputProps
} from '~/components/slider-input/types';

/**
 * Calculate the pixel position for a dual-handle slider tooltip
 *
 * This function converts slider values (like [100, 500]) to pixel positions on the track.
 *
 * Example: If slider range is 0-1000 and track width is 300px:
 * - Value [100, 500] becomes 10% and 50% of the track
 * - Pixel positions: 30px and 150px
 * - Midpoint: 90px (between the two handles)
 *
 * @param value - Array of two slider values [minValue, maxValue]
 * @param min - The minimum value of the slider range
 * @param max - The maximum value of the slider range
 * @param rect - The track's bounding rectangle (contains width)
 * @returns Pixel position for the tooltip
 */
const getMidpoint = (value: DualValue, min: number, max: number, rect: DOMRect) => {
	const [firstValue, secondValue] = value;

	// Step 1: Convert slider values to percentages (0-100%)
	// Formula: ((currentValue - minValue) / (maxValue - minValue)) * 100
	// This gives us where each handle is as a percentage of the total range
	const firstPercentage = ((firstValue - min) / (max - min)) * 100;
	const secondPercentage = ((secondValue - min) / (max - min)) * 100;

	// Step 2: Find the midpoint between the two handles
	// Average the two percentages to get the center point
	const midpointPercentage = (firstPercentage + secondPercentage) / 2;

	// Step 3: Convert percentage to pixels
	// Multiply the percentage by the track width to get pixel position
	return (midpointPercentage / 100) * rect.width;
};

/**
 * Calculate the pixel position for a single-handle slider tooltip
 *
 * This function converts a single slider value to a pixel position on the track.
 *
 * Example: If slider range is 0-100 and track width is 200px:
 * - Value [25] becomes 25% of the track
 * - Pixel position: 50px
 *
 * @param value - Array with single slider value [value]
 * @param min - The minimum value of the slider range
 * @param max - The maximum value of the slider range
 * @param rect - The track's bounding rectangle (contains width)
 * @returns Pixel position for the tooltip
 */
const getSingleMidpoint = (value: SingleValue, min: number, max: number, rect: DOMRect) => {
	// Step 1: Convert slider value to percentage (0-100%)
	// Formula: ((currentValue - minValue) / (maxValue - minValue)) * 100
	// This gives us where the handle is as a percentage of the total range
	const percentage = ((value[0] - min) / (max - min)) * 100;

	// Step 2: Convert percentage to pixels
	// Multiply the percentage by the track width to get pixel position
	return (percentage / 100) * rect.width;
};

const SliderInputTooltip = ({
	value,
	trackerRef,
	mode,
	children,
	min,
	max
}: SliderTooltipInputProps) => {
	const tooltipRef = React.useRef<HTMLDivElement>(null);
	const [tooltipWidth, setTooltipWidth] = React.useState(0);

	// Use useLayoutEffect to measure after motion renders
	React.useLayoutEffect(() => {
		if (tooltipRef.current) {
			const width = tooltipRef.current.offsetWidth;
			if (width > 0) {
				setTooltipWidth(width);
			}
		}
	}, [children]);

	const midpoint = React.useMemo(() => {
		if (!trackerRef || !trackerRef.current) return 0;

		const rect = trackerRef.current.getBoundingClientRect();
		if (!rect) return 0;

		if (mode === 'single') {
			return getSingleMidpoint(value, min, max, rect);
		} else {
			return getMidpoint(value, min, max, rect);
		}
	}, [trackerRef, value, mode, min, max]);

	// Simple positioning: between thumbs, or center if no space
	const tooltipPosition = React.useMemo(() => {
		if (!trackerRef || !trackerRef.current) return midpoint;

		const trackWidth = trackerRef.current.getBoundingClientRect().width;
		const half = tooltipWidth / 2;

		// Check if tooltip would overflow left or right
		const wouldOverflowLeft = midpoint < half;
		const wouldOverflowRight = midpoint > trackWidth - half;

		if (wouldOverflowLeft || wouldOverflowRight) {
			// Not enough space on either side - center the tooltip on the track
			return trackWidth / 2;
		} else {
			// Tooltip fits - position between the thumbs
			return midpoint;
		}
	}, [midpoint, trackerRef, tooltipWidth]);

	return (
		<>
			<motion.div
				ref={tooltipRef}
				className='absolute px-2 py-1 rounded-md bg-black text-white text-xs shadow whitespace-nowrap'
				style={{
					left: tooltipPosition,
					top: '-37px'
				}}
				initial={{ opacity: 0, scale: 0.8, y: 10, x: '-50%' }}
				animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
				exit={{ opacity: 0, scale: 0.8, y: 10, x: '-50%' }}
				transition={{
					duration: 0.2,
					ease: 'easeOut',
					scale: { duration: 0.15 }
				}}
			>
				{children}
			</motion.div>

			{/* Animated arrow */}
			<motion.div
				className='absolute w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-black'
				style={{
					left: tooltipPosition,
					transform: 'translateX(-50%)',
					top: '-10px'
				}}
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.8 }}
				transition={{
					duration: 0.2,
					ease: 'easeOut',
					delay: 0.05
				}}
			/>
		</>
	);
};

export const SliderInput = ({
	mode,
	value,
	onChange,
	min = 0,
	max = 100,
	step,
	children,
	disabled = false
}: SliderInputProps) => {
	const [isDragging, setIsDragging] = React.useState(false);
	const trackRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (disabled) return;

			if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
				setIsDragging(true);
				e.preventDefault();
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [disabled]);

	return (
		<div className='flex flex-col gap-4 w-80'>
			<Label htmlFor='slider-input'>Select range</Label>

			<div className='relative w-full'>
				<AnimatePresence>
					{isDragging && mode === 'single' && (
						<SliderInputTooltip
							value={value}
							trackerRef={trackRef}
							mode={'single'}
							min={min}
							max={max}
						>
							{children}
						</SliderInputTooltip>
					)}

					{isDragging && mode === 'dual' && (
						<SliderInputTooltip
							value={value}
							trackerRef={trackRef}
							mode={'dual'}
							min={min}
							max={max}
						>
							{children}
						</SliderInputTooltip>
					)}
				</AnimatePresence>

				<Slider.Root
					className='relative flex items-center w-full h-5'
					value={value}
					min={min}
					max={max}
					step={step}
					disabled={disabled}
					minStepsBetweenThumbs={0}
					onValueChange={(value) => {
						if (mode === 'single') {
							onChange(value as SingleValue);
						} else {
							onChange(value as DualValue);
						}
					}}
					onPointerDown={() => setIsDragging(true)}
					onPointerUp={() => setIsDragging(false)}
				>
					<Slider.Track ref={trackRef} className='bg-gray-200 relative flex-1 rounded-full h-1'>
						<Slider.Range className='absolute bg-blue-500 rounded-full h-full' />
					</Slider.Track>
					{value?.map((_, i) => (
						<Slider.Thumb
							key={i}
							className='block w-4 h-4 bg-white border border-gray-300 rounded-full shadow hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400'
						/>
					)) ?? null}
				</Slider.Root>
			</div>
		</div>
	);
};
