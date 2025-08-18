// type.ts

/**
 * @description
 * Mode of the slider.
 *
 * - `'single'` → One thumb, single value.
 * - `'dual'`   → Two thumbs, range between values.
 */
type SliderMode = 'single' | 'dual';

/**
 * @description
 * Common base props shared across all sliders.
 */
type BaseSliderInputProps = {
	/** @description Minimum slider value (default: 0). */
	min?: number;
	/** @description Maximum slider value (default: 100). */
	max?: number;
	/** @description Step size between values (default: 1). */
	step?: number;
	/** @description Whether the slider is disabled. */
	disabled?: boolean;
	/** @description Custom CSS class for styling. */
	className?: string;
	/** @description Unique name of the slider input. */
	name: string;
	/** @description Unique HTML id attribute for the slider input. */
	id: string;
	/** @description Label displayed for the slider. */
	label: string;
};

/**
 * @description Value type for a single slider.
 * @example
 * ```ts
 * const value: SingleValue = [50];
 * ```
 */
type SingleValue = [number];

/**
 * @description Value type for a dual/range slider.
 * @example
 * ```ts
 * const value: DualValue = [20, 80];
 * ```
 */
type DualValue = [number, number];

/**
 * @description Utility type that maps slider mode to its correct value type.
 * - `'single'` → `[number]`
 * - `'dual'`   → `[number, number]`
 */
type SliderValue<M extends SliderMode> = M extends 'single' ? SingleValue : DualValue;

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

/**
 * @description
 * Formatter for slider tooltips (applies to the overall value).
 *
 * @example
 * ```ts
 * const format: SliderTooltipFormatter<'dual'> = ([min, max]) => `${min} - ${max}`;
 * ```
 */
type SliderTooltipFormatter<M extends SliderMode> = (value: SliderValue<M>) => React.ReactNode;

/**
 * @description
 * Generic props for a slider component (single or dual).
 * The `mode` determines the correct value and formatter types.
 *
 * @property mode - Slider mode: `'single'` or `'dual'`.
 * @property value - Current slider value(s).
 * @property onChange - Callback triggered when the slider value changes.
 * @property formatThumbTooltip - Formatter for individual thumb tooltips.
 * @property formatSliderTooltip - Formatter for overall slider tooltip.
 *
 * @example
 * ```tsx
 * const props: SliderInputPropsBase<'single'> = {
 *   mode: 'single',
 *   value: [30],
 *   onChange: (val) => console.log(val),
 *   formatThumbTooltip: (v) => `${v}%`,
 *   formatSliderTooltip: (v) => <span>{v[0]}%</span>,
 *   name: 'volume',
 *   id: 'volume-slider',
 *   label: 'Volume',
 * };
 * ```
 */
interface SliderInputPropsBase<M extends SliderMode> extends BaseSliderInputProps {
	mode: M;
	value: SliderValue<M>;
	onChange: (value: SliderValue<M>) => void;
	formatThumbTooltip: ThumbTooltipFormatter;
	formatSliderTooltip: SliderTooltipFormatter<M>;
}

/**
 * @description Union type of all supported slider input props.
 */
type SliderInputProps = SliderInputPropsBase<'single'> | SliderInputPropsBase<'dual'>;

/**
 * @description Base props for sliders that render tooltips above the track.
 */
type BaseSliderTooltipInputProps = {
	/** @description Ref to the slider track element. Used for tooltip positioning. */
	trackerRef: React.RefObject<HTMLDivElement | null>;
	/** @description Minimum slider value (same as `min` in slider props). */
	min: number;
	/** @description Maximum slider value (same as `max` in slider props). */
	max: number;
};

/**
 * @description
 * Generic tooltip slider input props.
 *
 * @property mode - Slider mode: `'single'` or `'dual'`.
 * @property value - Current slider value(s).
 * @property children - React nodes to render inside the tooltip.
 *
 * @example
 * ```tsx
 * const tooltipProps: SliderTooltipInputPropsBase<'dual'> = {
 *   mode: 'dual',
 *   value: [10, 90],
 *   min: 0,
 *   max: 100,
 *   trackerRef: someRef,
 *   children: <span>Custom tooltip</span>,
 * };
 * ```
 */
interface SliderTooltipInputPropsBase<M extends SliderMode> extends BaseSliderTooltipInputProps {
	mode: M;
	value: SliderValue<M>;
	children: React.ReactNode;
}

/**
 * @description Union type of all tooltip slider props.
 */
type SliderTooltipInputProps =
	| SliderTooltipInputPropsBase<'single'>
	| SliderTooltipInputPropsBase<'dual'>;

/**
 * @description
 * Generic props for tooltip content components.
 *
 * @property mode - Slider mode: `'single'` or `'dual'`.
 * @property value - Current slider value(s).
 * @property formatSliderTooltip - Formatter for tooltip display.
 *
 * @example
 * ```tsx
 * const contentProps: SliderTooltipContentPropsBase<'single'> = {
 *   mode: 'single',
 *   value: [40],
 *   formatSliderTooltip: (v) => <span>{v[0]}%</span>,
 * };
 * ```
 */
interface SliderTooltipContentPropsBase<M extends SliderMode> {
	mode: M;
	value: SliderValue<M>;
	formatSliderTooltip: SliderTooltipFormatter<M>;
}

/**
 * @description Union type of tooltip content props (single or dual).
 */
type SliderTooltipContentProps =
	| SliderTooltipContentPropsBase<'single'>
	| SliderTooltipContentPropsBase<'dual'>;

export type {
	SliderValue,
	SingleValue,
	DualValue,
	SliderInputProps,
	SliderTooltipInputProps,
	SliderTooltipContentProps
};
