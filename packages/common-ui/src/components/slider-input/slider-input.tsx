import * as React from 'react';
import { Label } from '~/components/label/label';
import {
	SliderInputProps,
	SingleValue,
	DualValue,
	SliderTooltipContentProps
} from '~/components/slider-input/types';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '~/components/tooltip/tooltip';
import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from '~/components/slider/slider';
import { cn } from '~/utils/className';

const SliderTooltipContent = ({ mode, value, formatSliderTooltip }: SliderTooltipContentProps) => {
	if (mode === 'single') {
		return formatSliderTooltip(value);
	}

	return formatSliderTooltip(value);
};

export const SliderInput = (props: SliderInputProps) => {
	const [isDragging, setIsDragging] = React.useState(false);

	const handleDragStart = React.useCallback(() => {
		setIsDragging(true);
	}, []);

	const handleDragLeave = React.useCallback(() => {
		setIsDragging(false);
	}, []);

	const handleDragEnd = React.useCallback(() => {
		setIsDragging(false);
	}, []);

	return (
		<div className={cn('flex flex-col gap-4', props.className)}>
			<Label htmlFor={props.id}>{props.label}</Label>

			{props.mode === 'single' ? (
				<input type='hidden' name={props.name} value={props.value[0]} readOnly aria-hidden='true' />
			) : (
				<>
					<input
						type='hidden'
						name={`${props.name}-min`}
						value={props.value[0]}
						readOnly
						aria-hidden='true'
					/>
					<input
						type='hidden'
						name={`${props.name}-max`}
						value={props.value[1]}
						readOnly
						aria-hidden='true'
					/>
				</>
			)}

			<TooltipProvider>
				<Tooltip open={isDragging}>
					<TooltipTrigger asChild>
						<div className='relative'>
							<SliderRoot
								className={props.rootClassName}
								value={props.value}
								onPointerDown={handleDragStart}
								onPointerUp={handleDragEnd}
								onPointerLeave={handleDragLeave}
								min={props.min ?? 0}
								max={props.max ?? 100}
								step={props.step ?? 1}
								disabled={props.disabled}
								minStepsBetweenThumbs={0}
								onValueChange={(value) => {
									if (props.mode === 'single') {
										props.onChange(value as SingleValue);
									} else {
										props.onChange(value as DualValue);
									}
								}}
							>
								<SliderTrack className={props.trackClassName}>
									<SliderRange className={props.rangeClassName} />
								</SliderTrack>

								{props.value?.map((thumbValue, i) => (
									<Tooltip key={i}>
										<TooltipTrigger asChild>
											<SliderThumb className={props.thumbClassName} />
										</TooltipTrigger>
										<TooltipContent
											side='top'
											sideOffset={8}
											className={cn(
												'bg-black text-white border-0 text-xs',
												props.thumbTooltipClassName
											)}
											arrowClassName={cn('bg-black fill-black', props.thumbTooltipArrowClassName)}
										>
											{props.formatThumbTooltip(thumbValue)}
										</TooltipContent>
									</Tooltip>
								)) ?? null}
							</SliderRoot>
						</div>
					</TooltipTrigger>

					<TooltipContent
						data-slot='slider-tooltip'
						className={cn('bg-black text-white border-0', props.sliderTooltipClassName)}
						arrowClassName={cn('bg-black fill-black', props.sliderTooltipArrowClassName)}
					>
						{props.mode === 'single' ? (
							<SliderTooltipContent
								mode='single'
								value={props.value}
								formatSliderTooltip={props.formatSliderTooltip}
							/>
						) : (
							<SliderTooltipContent
								mode='dual'
								value={props.value}
								formatSliderTooltip={props.formatSliderTooltip}
							/>
						)}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
};
