import { ISliderInput } from '~/components/Sliders/types/slider-input';
import { ISliderTooltipInput } from '~/components/Sliders/types/slider-tooltip-input';

type SingleValue = [number];

type SingleSliderTooltipFormatter = (value: SingleValue) => React.ReactNode;

interface ISingleSliderTooltipInput extends ISliderTooltipInput {
	value: SingleValue;
}

interface ISingleSliderInput extends ISliderInput {
	value: SingleValue;
	onChange: (value: SingleValue) => void;
	formatSliderTooltip: SingleSliderTooltipFormatter;
}

export type {
	SingleSliderTooltipFormatter,
	ISingleSliderTooltipInput,
	ISingleSliderInput,
	SingleValue
};
