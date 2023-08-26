import { Meta, StoryObj } from '@storybook/react';

import * as React from 'react';

import settings from '../../../settings';

import Listbox from './Listbox';
import { SelectOption } from '../../../types/DropdownElementTypes';

const meta: Meta<typeof Listbox> = {
	component: Listbox,
	title: 'Core/Listbox'
};

export default meta;

type Story = StoryObj<typeof Listbox>;

const ControlledStoryTemplate = (args: Story['args']) => {
	// Store the current dropdown value
	const [value, setValue] = React.useState(() => {
		if (args?.defaultValue === null || args?.defaultValue === undefined) {
			return args?.isMultiSelect === true ? [] : null;
		}

		return args?.defaultValue;
	});

	return (
		<form
			onSubmit={(event) => {
				console.log(event);
			}}
		>
			<label htmlFor={args?.name ?? 'people'}>
				A dropdown label
				<Listbox
					options={args?.options ?? []}
					value={value}
					isMultiSelect={args?.isMultiSelect}
					name={args?.name ?? 'people'}
					defaultValue={undefined}
					disabled={args?.disabled}
					displayLimit={args?.displayLimit}
					noOptionsAvailableMessage={args?.noOptionsAvailableMessage}
					onChange={({ value: newValue }) => {
						// Set the value of the dropdown.
						setValue(newValue);
					}}
				/>
			</label>

			<button type='submit'>Submit</button>
		</form>
	);
};

const UncontrolledStoryTemplate = (args: Story['args']) => (
	<form
		onSubmit={(event) => {
			// Don't submit the form
			event.preventDefault();

			// Get the current form element
			const target = event.target as HTMLFormElement;

			// Get the formData from the html form element (Contains )
			const uncontrolledFormData = Object.fromEntries(new FormData(target));

			console.log(uncontrolledFormData);
		}}
	>
		<label htmlFor={args?.name ?? 'people'}>
			A dropdown label
			<Listbox
				options={args?.options ?? []}
				value={undefined}
				isMultiSelect={args?.isMultiSelect}
				name={args?.name ?? 'people'}
				defaultValue={args?.defaultValue ?? undefined}
				disabled={args?.disabled}
				displayLimit={args?.displayLimit}
				noOptionsAvailableMessage={args?.noOptionsAvailableMessage}
			/>
		</label>

		<button type='submit'>Submit</button>
	</form>
);

const options: SelectOption[] = [
	{ label: 'Durward Reynolds', value: 'Durward Reynolds' },
	{ label: 'Kenton Towne', value: 'Kenton Towne' },
	{ label: 'Therese Wunsch', value: 'Therese Wunsch' },
	{ label: 'Benedict Kessler', value: 'Benedict Kessler' },
	{ label: 'Katelyn Rohan', value: 'Katelyn Rohan' }
];

export const UncontrolledMultipleValues: Story = {
	render: UncontrolledStoryTemplate,
	args: {
		name: 'people',
		options,
		defaultValue: [options[2], options[1]],
		isMultiSelect: true
	}
};

export const UncontrolledSingleValue: Story = {
	render: UncontrolledStoryTemplate,
	args: {
		name: 'people',
		options,
		defaultValue: options[1],
		isMultiSelect: false
	}
};

export const ControlledSingleValue: Story = {
	render: ControlledStoryTemplate,
	args: {
		options,
		isMultiSelect: false,
		defaultValue: options[0]
	}
};

export const ControlledMultipleValues: Story = {
	render: ControlledStoryTemplate,
	args: {
		isMultiSelect: true,
		options,
		defaultValue: [options[0], options[2]]
	}
};

export const CustomNoOptionsAvailableMessage: Story = {
	render: ControlledStoryTemplate,
	args: {
		noOptionsAvailableMessage: 'My custom no options message'
	}
};

export const ControlledDisplayLimit: Story = {
	render: ControlledStoryTemplate,
	args: {
		isMultiSelect: true,
		options: settings.COUNTRY_OPTIONS,
		displayLimit: 5
	}
};

export const UncontrolledDisplayLimit: Story = {
	render: ControlledStoryTemplate,
	args: {
		isMultiSelect: true,
		options: settings.COUNTRY_OPTIONS,
		displayLimit: 5
	}
};

export const ControlledSingleValuePlaceholder: Story = {
	render: ControlledStoryTemplate,
	args: {
		options,
		isMultiSelect: false,
		defaultValue: null,
		placeholder: 'Please select a person'
	}
};

export const ControlledMultipleValuesPlaceholder: Story = {
	render: ControlledStoryTemplate,
	args: {
		options,
		isMultiSelect: true,
		defaultValue: [],
		placeholder: 'Please select a person'
	}
};

export const UncontrolledSingleValuePlaceholder: Story = {
	render: UncontrolledStoryTemplate,
	args: {
		options,
		isMultiSelect: false,
		defaultValue: null,
		placeholder: 'Please select a person'
	}
};

export const UncontrolledMultipleValuesPlaceholder: Story = {
	render: UncontrolledStoryTemplate,
	args: {
		options,
		isMultiSelect: true,
		defaultValue: [],
		placeholder: 'Please select a person'
	}
};
