import { SliderInputPropsBase, SliderTooltipInputProps } from '../types';

type RangeValue = [number, number];

type RangeSliderTooltipFormatter = (value: RangeValue) => React.ReactNode;

interface RangeSliderTooltipInputProps extends SliderTooltipInputProps {
	value: RangeValue;
}

interface SliderInputProps extends SliderInputPropsBase {
	value: RangeValue;
	onChange: (value: RangeValue) => void;
	formatSliderTooltip: RangeSliderTooltipFormatter;
}

export type {
	RangeSliderTooltipFormatter,
	RangeSliderTooltipInputProps,
	SliderInputProps,
	RangeValue
};
