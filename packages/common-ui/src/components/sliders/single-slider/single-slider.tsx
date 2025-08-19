import { Label } from '~/components/label/label';
import { SingleSliderInputProps } from '~/components/sliders/single-slider/single-slider-types';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '~/components/tooltip/tooltip';
import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from '~/components/slider/slider';
import { cn } from '~/utils/className';
import { SingleValue } from '~/components/sliders/single-slider/single-slider-types';
import { useIsDragging } from '../hooks/useIsDragging';

export const SliderInput = ({
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
}: SingleSliderInputProps) => {
	const { isDragging, handleDragStart, handleDragLeave, handleDragEnd } = useIsDragging();

	return (
		<div className={cn('flex flex-col gap-4', className)}>
			<Label htmlFor={id}>{label}</Label>

			<input type='hidden' name={name} value={value[0]} readOnly aria-hidden='true' />

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
								step={step}
								disabled={disabled}
								minStepsBetweenThumbs={0}
								onValueChange={(value) => {
									const singleValue: SingleValue = [value?.at(0) ?? 0];
									onChange(singleValue);
								}}
							>
								<SliderTrack className={trackClassName}>
									<SliderRange className={rangeClassName} />
								</SliderTrack>

								{value.map((thumbValue, i) => (
									<Tooltip key={i}>
										<TooltipTrigger asChild>
											<SliderThumb className={thumbClassName} />
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
								))}
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
