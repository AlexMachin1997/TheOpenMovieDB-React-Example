import { ISliderInput } from '~/components/Sliders/types/slider-input';
import { ISliderTooltipInput } from '~/components/Sliders/types/slider-tooltip-input';

type RangeValue = [number, number];

type RangeSliderTooltipFormatter = (value: RangeValue) => React.ReactNode;

interface IRangeSliderTooltipInput extends ISliderTooltipInput {
	value: RangeValue;
}

interface IRangeSliderInput extends ISliderInput {
	value: RangeValue;
	onChange: (value: RangeValue) => void;
	formatSliderTooltip: RangeSliderTooltipFormatter;
}

export type {
	RangeSliderTooltipFormatter,
	IRangeSliderTooltipInput,
	IRangeSliderInput,
	RangeValue
};
