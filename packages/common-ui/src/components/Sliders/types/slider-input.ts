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

interface ISliderInput {
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

export type { ISliderInput };
