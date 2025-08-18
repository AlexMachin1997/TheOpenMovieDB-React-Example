import * as React from 'react';
import * as Slider from '@radix-ui/react-slider';
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
		<div className='flex flex-col gap-4 w-80'>
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
							<Slider.Root
								className='relative flex items-center w-full h-5'
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
								<Slider.Track className='bg-gray-200 relative flex-1 rounded-full h-1'>
									<Slider.Range className='absolute bg-blue-500 rounded-full h-full' />
								</Slider.Track>

								{props.value?.map((thumbValue, i) => (
									<Tooltip key={i}>
										<TooltipTrigger asChild>
											<Slider.Thumb className='block w-4 h-4 bg-white border border-gray-300 rounded-full shadow hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400' />
										</TooltipTrigger>
										<TooltipContent
											side='top'
											sideOffset={8}
											className='bg-black text-white border-0 text-xs'
										>
											{props.formatThumbTooltip(thumbValue)}
										</TooltipContent>
									</Tooltip>
								)) ?? null}
							</Slider.Root>
						</div>
					</TooltipTrigger>

					<TooltipContent className='bg-black text-white border-0'>
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
