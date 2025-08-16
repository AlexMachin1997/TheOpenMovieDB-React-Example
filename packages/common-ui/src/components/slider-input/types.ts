type SliderValue = {
	value: number;
	label: string;
};

type SliderMode = 'single' | 'dual';

type BaseSliderInputProps = {
	min?: number;
	max?: number;
	step?: number;
	formatLabel?: (value: number, index?: number) => string;
	disabled?: boolean;
	className?: string;
	name?: string;
	id?: string;
};

type SingleSliderInputProps = BaseSliderInputProps & {
	mode: 'single';
	defaultValue?: number;
	value?: number;
	onChange?: (value: SliderValue) => void;
};

type DualSliderInputProps = BaseSliderInputProps & {
	mode: 'dual';
	defaultValue?: [number, number];
	value?: [number, number];
	onChange?: (values: [SliderValue, SliderValue]) => void;
};

type SliderInputProps = SingleSliderInputProps | DualSliderInputProps;

export type {
	SliderInputProps,
	SingleSliderInputProps,
	DualSliderInputProps,
	SliderValue,
	SliderMode
};
