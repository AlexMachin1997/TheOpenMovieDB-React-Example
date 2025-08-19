import { SliderInputPropsBase, SliderTooltipInputProps } from '../types';

type SingleValue = [number];

type SingleSliderTooltipFormatter = (value: SingleValue) => React.ReactNode;

interface SingleSliderTooltipInputProps extends SliderTooltipInputProps {
	value: SingleValue;
}

interface SingleSliderInputProps extends SliderInputPropsBase {
	value: SingleValue;
	onChange: (value: SingleValue) => void;
	formatSliderTooltip: SingleSliderTooltipFormatter;
}

export type {
	SingleSliderTooltipFormatter,
	SingleSliderTooltipInputProps,
	SingleSliderInputProps,
	SingleValue
};
