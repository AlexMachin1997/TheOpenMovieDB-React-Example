import * as React from 'react';

import Input from './Input';

const ControlledTemplate = (args) => {
	const { defaultValue = '', ...reset } = args;

	const [value, setValue] = React.useState(defaultValue);

	return <Input onChange={(event) => setValue(event.target.value)} value={value} {...reset} />;
};

export const TextInput = ControlledTemplate.bind({});
TextInput.args = {
	label: 'From',
	id: 'From',
	name: 'From',
	defaultValue: 'AlexMachin'
};

export const NumberInput = ControlledTemplate.bind({});
NumberInput.args = {
	type: 'number',
	min: 0,
	max: 100,
	step: 5,
	inputMode: 'numeric',
	name: 'number',
	defaultValue: 150,
	label: 'User Score',
	id: 'number'
};

export const DatePicker = ControlledTemplate.bind({});
DatePicker.args = {
	type: 'date',
	label: 'Date range',
	id: 'date',
	containerClassName: 'flex items-center',
	labelClassName: 'w-[100px] text-black',
	name: 'date',
	defaultValue: '2022-10-20' // Must only be the date in this specific format, it can't include the time as well otherwise the defaultValue won't be used by the input
};

export default {
	component: TextInput,
	title: 'Design System/Core/Input'
};
