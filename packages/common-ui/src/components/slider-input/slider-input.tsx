import * as React from 'react';
import { useRanger, Ranger } from '@tanstack/react-ranger';
import { cn } from '~/utils/className';
import {
	SliderInputProps,
	SingleSliderInputProps,
	DualSliderInputProps,
	SliderValue,
	SliderMode
} from '~/components/slider-input/types';

const SliderInput = React.forwardRef<HTMLDivElement, SliderInputProps>(
	(
		{
			mode,
			min = 0,
			max = 100,
			step = 1,
			defaultValue,
			value,
			onChange,
			formatLabel = (val, index) => {
				if (mode === 'dual') {
					return index === 0 ? `Min: ${val}` : `Max: ${val}`;
				}
				return `Value: ${val}`;
			},
			disabled = false,
			className,
			name,
			id,
			...props
		},
		ref
	) => {
		const rangerRef = React.useRef<HTMLDivElement>(null);

		// Determine current values for TanStack Ranger
		const rangerValues = React.useMemo((): ReadonlyArray<number> => {
			if (value !== undefined) {
				return Array.isArray(value) ? value : [value];
			}
			if (defaultValue !== undefined) {
				return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
			}
			return mode === 'dual' ? [min, max] : [min];
		}, [value, defaultValue, mode, min, max]);

		// Only call onChange when values change from user interaction
		const handleRangerChange = React.useCallback(
			(instance: Ranger<HTMLDivElement>) => {
				if (!disabled && onChange) {
					const values = instance.sortedValues;

					if (mode === 'single') {
						const val = values[0] ?? min;
						const sliderValue: SliderValue = {
							value: val,
							label: formatLabel(val)
						};
						onChange(sliderValue);
					} else {
						const value0 = values[0] ?? min;
						const value1 = values[1] ?? values[0] ?? max;
						const sliderValues: [SliderValue, SliderValue] = [
							{
								value: value0,
								label: formatLabel(value0, 0)
							},
							{
								value: value1,
								label: formatLabel(value1, 1)
							}
						];
						onChange(sliderValues);
					}
				}
			},
			[disabled, onChange, mode, formatLabel, min, max]
		);

		// TanStack Ranger instance - single source of truth for values
		const rangerInstance = useRanger<HTMLDivElement>({
			getRangerElement: () => rangerRef.current,
			values: rangerValues,
			min,
			max,
			stepSize: step,
			onChange: handleRangerChange
		});

		// Get current values from ranger instance, fallback to our computed values if empty
		const currentValues = React.useMemo(() => {
			return rangerInstance.sortedValues.length > 0 ? rangerInstance.sortedValues : rangerValues;
		}, [rangerInstance.sortedValues, rangerValues]);

		return (
			<div ref={ref} className={cn('w-full max-w-md space-y-4', className)} id={id} {...props}>
				{/* Slider Track */}
				<div className='relative'>
					<div
						ref={rangerRef}
						className={cn(
							'relative h-2 bg-secondary rounded-full',
							disabled && 'opacity-50',
							!disabled && 'cursor-pointer'
						)}
						style={{
							userSelect: 'none'
						}}
					>
						{/* Active range for dual mode */}
						{mode === 'dual' && currentValues.length === 2 && (
							<div
								className='absolute h-full bg-primary rounded-full'
								style={{
									left: `${rangerInstance.getPercentageForValue(currentValues[0] ?? min)}%`,
									width: `${
										rangerInstance.getPercentageForValue(currentValues[1] ?? max) -
										rangerInstance.getPercentageForValue(currentValues[0] ?? min)
									}%`
								}}
							/>
						)}

						{/* Active range for single mode */}
						{mode === 'single' && (
							<div
								className='absolute h-full bg-primary rounded-full'
								style={{
									left: '0%',
									width: `${rangerInstance.getPercentageForValue(currentValues[0] ?? min)}%`
								}}
							/>
						)}

						{/* Handles */}
						{rangerInstance
							.handles()
							.map(({ value, onKeyDownHandler, onMouseDownHandler, onTouchStart, isActive }, i) => (
								<button
									key={i}
									onKeyDown={onKeyDownHandler}
									onMouseDown={onMouseDownHandler}
									onTouchStart={onTouchStart}
									role='slider'
									aria-valuemin={rangerInstance.options.min}
									aria-valuemax={rangerInstance.options.max}
									aria-valuenow={value}
									aria-label={formatLabel(value, i)}
									disabled={disabled}
									tabIndex={disabled ? -1 : 0}
									className={cn(
										'absolute w-5 h-5 bg-primary border-2 border-background rounded-full shadow-md',
										'transform -translate-x-1/2 -translate-y-1/2 top-1/2',
										'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
										'hover:scale-110 transition-transform duration-150',
										'touch-none select-none',
										disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
										isActive && 'scale-110 z-10'
									)}
									style={{
										left: `${rangerInstance.getPercentageForValue(value)}%`,
										zIndex: isActive ? 1 : 0
									}}
								>
									<span className='sr-only'>{formatLabel(value, i)}</span>
								</button>
							))}
					</div>
				</div>

				{/* Value Labels */}
				<div
					className={cn(
						'flex justify-between items-center text-sm',
						mode === 'single' && 'justify-center'
					)}
				>
					{Array.from(currentValues).map((val, index) => (
						<div key={index} className='text-center'>
							<span className='font-medium text-foreground'>{formatLabel(val, index)}</span>
						</div>
					))}
				</div>

				{/* Hidden inputs for form compatibility */}
				{name && (
					<>
						{Array.from(currentValues).map((val, index) => (
							<input
								key={index}
								type='hidden'
								name={mode === 'dual' ? `${name}_${index === 0 ? 'min' : 'max'}` : name}
								value={val}
							/>
						))}
					</>
				)}
			</div>
		);
	}
);

SliderInput.displayName = 'SliderInput';

export { SliderInput };
export type {
	SliderInputProps,
	SingleSliderInputProps,
	DualSliderInputProps,
	SliderValue,
	SliderMode
};
