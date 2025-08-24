import { Label } from '~/components/label/label';
import { RangeValue, SliderInputProps } from '~/components/sliders/range-slider/range-slider-types';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '~/components/tooltip/tooltip';
import { useIsDragging } from '~/components/sliders/hooks/useIsDragging';
import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from '~/components/slider';
import { cn } from '~/utils/className';

export const RangeSlider = ({
	className,
	rootClassName,
	trackClassName,
	rangeClassName,
	thumbClassName,
	thumbTooltipClassName,
	thumbTooltipArrowClassName,
	sliderTooltipClassName,
	sliderTooltipArrowClassName,
	formatThumbTooltip,
	formatSliderTooltip,
	id,
	label,
	name,
	value,
	min = 0,
	max = 100,
	step = 1,
	disabled = false,
	onChange
}: SliderInputProps) => {
	const { isDragging, handleDragStart, handleDragLeave, handleDragEnd } = useIsDragging();

	return (
		<div className={cn('flex flex-col gap-4', className)}>
			<Label htmlFor={id}>{label}</Label>

			<input type='hidden' name={`${name}-min`} value={value[0]} readOnly aria-hidden='true' />

			<input type='hidden' name={`${name}-max`} value={value[1]} readOnly aria-hidden='true' />

			<TooltipProvider>
				<Tooltip open={isDragging}>
					<TooltipTrigger asChild>
						<div className='relative'>
							<SliderRoot
								className={rootClassName}
								value={value}
								onPointerDown={handleDragStart}
								onPointerUp={handleDragEnd}
								onPointerLeave={handleDragLeave}
								min={min}
								max={max}
								aria-label={label}
								step={step}
								disabled={disabled}
								minStepsBetweenThumbs={0}
								onValueChange={(value) => {
									const rangeValue: RangeValue = [value?.at(0) ?? 0, value?.at(1) ?? 0];
									onChange(rangeValue);
								}}
							>
								<SliderTrack className={trackClassName}>
									<SliderRange className={rangeClassName} />
								</SliderTrack>

								{value?.map((thumbValue, i) => (
									<Tooltip key={i}>
										<TooltipTrigger asChild>
											<SliderThumb
												className={thumbClassName}
												aria-label={`${label} slider thumb ${i === 0 ? 'minimum' : 'maximum'}`}
												aria-valuetext={formatThumbTooltip(thumbValue)}
											/>
										</TooltipTrigger>
										<TooltipContent
											side='top'
											sideOffset={8}
											className={cn('bg-black text-white border-0 text-xs', thumbTooltipClassName)}
											arrowClassName={cn('bg-black fill-black', thumbTooltipArrowClassName)}
										>
											{formatThumbTooltip(thumbValue)}
										</TooltipContent>
									</Tooltip>
								)) ?? null}
							</SliderRoot>
						</div>
					</TooltipTrigger>

					<TooltipContent
						data-slot='slider-tooltip'
						className={cn('bg-black text-white border-0', sliderTooltipClassName)}
						arrowClassName={cn('bg-black fill-black', sliderTooltipArrowClassName)}
					>
						{formatSliderTooltip(value)}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
};
