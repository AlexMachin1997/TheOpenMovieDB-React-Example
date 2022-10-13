import * as React from 'react';

import DatePicker from './DatePicker';

const ControlledTemplate = (args) => {
	const { defaultValue = '', ...reset } = args;

	const [value, setValue] = React.useState(defaultValue);

	return (
		<DatePicker
			label='From'
			isRow
			id='from'
			onChange={(event) => setValue(event.target.value)}
			value={value}
			{...reset}
		/>
	);
};

const UncontrolledTemplate = (args) => {
	const { defaultValue = '', ...reset } = args;

	return <DatePicker label='From' isRow id='from' defaultValue={defaultValue} {...reset} />;
};

const MultipleDatePickerTemplate = (args) => {
	const [value, setValue] = React.useState({ from: '', to: '' });

	return (
		<div className='space-y-2'>
			<DatePicker
				{...args}
				label='From'
				isRow
				id='from'
				onChange={(event) =>
					setValue((prevState) => ({
						...prevState,
						[event.target.name]: event.target.value
					}))
				}
				value={value.from}
				name='from'
			/>
			<DatePicker
				{...args}
				label='To'
				isRow
				id='to'
				onChange={(event) =>
					setValue((prevState) => ({
						...prevState,
						[event.target.name]: event.target.value
					}))
				}
				value={value.to}
				name='to'
			/>
		</div>
	);
};

const DefaultStoryArgs = {
	label: 'My awesome label',
	id: 'id',
	isRow: false,
	name: 'name'
};

export const ControlledExample = ControlledTemplate.bind({});
ControlledExample.args = {
	...DefaultStoryArgs
};

export const UncontrolledExample = UncontrolledTemplate.bind({});
UncontrolledExample.args = {
	...DefaultStoryArgs
};

export const DatePickerRowExample = ControlledTemplate.bind({});
DatePickerRowExample.args = {
	...DefaultStoryArgs,
	isRow: true
};

export const DatePickerColumnExample = ControlledTemplate.bind({});
DatePickerColumnExample.args = {
	...DefaultStoryArgs
};

export const MultipleDatePickers = MultipleDatePickerTemplate.bind({});
MultipleDatePickers.args = {};

export default {
	component: DatePicker,
	title: 'Design System/Core/Date Picker'
};
