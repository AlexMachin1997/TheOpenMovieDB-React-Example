/**
 * @description
 * Formatter for thumb tooltips (applies to individual thumbs).
 *
 * @example
 * ```ts
 * const format: ThumbTooltipFormatter = (value) => `${value}%`;
 * ```
 */
type ThumbTooltipFormatter = (value: number) => string;

interface SliderInputPropsBase {
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	className?: string;
	name: string;
	id: string;
	label: string;
	formatThumbTooltip: ThumbTooltipFormatter;
	rootClassName?: string;
	trackClassName?: string;
	rangeClassName?: string;
	thumbClassName?: string;
	thumbTooltipClassName?: string;
	thumbTooltipArrowClassName?: string;
	sliderTooltipClassName?: string;
	sliderTooltipArrowClassName?: string;
}

interface SliderTooltipInputProps {
	trackerRef: React.RefObject<HTMLDivElement | null>;
	min: number;
	max: number;
}

export type { SliderInputPropsBase, SliderTooltipInputProps };
