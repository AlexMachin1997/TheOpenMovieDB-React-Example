type SliderMode = 'single' | 'dual';

type BaseSliderInputProps = {
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	className?: string;
	name?: string;
	id?: string;
	children: React.ReactNode;
};

type SingleValue = [number];
type DualValue = [number, number];

interface SingleSliderInputProps extends BaseSliderInputProps {
	mode: 'single';
	value: SingleValue;
	onChange: (value: SingleValue) => void;
}

interface DualSliderInputProps extends BaseSliderInputProps {
	mode: 'dual';
	value: DualValue;
	onChange: (values: DualValue) => void;
}

type SliderInputProps = SingleSliderInputProps | DualSliderInputProps;

type BaseSliderTooltipInputProps = {
	trackerRef: React.RefObject<HTMLDivElement | null>;
	min: number;
	max: number;
};

interface SingleTooltipSliderInputProps extends BaseSliderTooltipInputProps {
	mode: 'single';
	value: SingleValue;
	children: React.ReactNode;
}

interface DualTooltipSliderInputProps extends BaseSliderTooltipInputProps {
	mode: 'dual';
	value: DualValue;
	children: React.ReactNode;
}

type SliderTooltipInputProps = SingleTooltipSliderInputProps | DualTooltipSliderInputProps;

export type {
	SliderInputProps,
	SingleSliderInputProps,
	DualSliderInputProps,
	SingleValue,
	DualValue,
	SliderMode,
	SliderTooltipInputProps
};
