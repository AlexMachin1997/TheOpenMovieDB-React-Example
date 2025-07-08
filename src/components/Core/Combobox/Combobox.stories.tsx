import { Meta, StoryObj } from '@storybook/react-vite';

import * as React from 'react';

import settings from '../../../settings';

import Combobox from './Combobox';
import { SelectOption } from '../../../types/DropdownElementTypes';

const meta: Meta<typeof Combobox> = {
	component: Combobox,
	title: 'Core/Combobox'
};

export default meta;

type Story = StoryObj<typeof Combobox>;

const ControlledStoryTemplate = (args: Story['args']) => {
	// Store the current dropdown value
	const [value, setValue] = React.useState(() => {
		if (args?.defaultValue === null || args?.defaultValue === undefined) {
			return args?.isMultiSelect === true ? [] : null;
		}

		return args?.defaultValue;
	});

	// Store the current dropdown options in state, this is so we can update them when canAddCustomItems is true
	const [remoteOptions, setRemoteOptions] = React.useState(args?.options ?? []);

	return (
		<form>
			<label htmlFor='name'>
				A dropdown label
				<Combobox
					options={remoteOptions}
					value={value}
					onChange={({ options: newOptions, value: newValue }) => {
						if (args?.canAddCustomItems === true && newOptions !== undefined) {
							setRemoteOptions(newOptions);
						}

						// Set the value of the dropdown.
						setValue(newValue);
					}}
					isMultiSelect={args?.isMultiSelect}
					defaultQuery={args?.defaultQuery}
					canAddCustomItems={args?.canAddCustomItems}
					name={args?.name ?? 'people'}
					defaultValue={args?.defaultValue ?? undefined}
					disabled={args?.disabled ?? false}
					noOptionsForSearchTermMessage={args?.noOptionsForSearchTermMessage ?? undefined}
					noOptionsAvailableMessage={args?.noOptionsAvailableMessage ?? undefined}
					flipIconPosition={args?.flipIconPosition ?? undefined}
					containerClassName={args?.containerClassName ?? undefined}
				/>
			</label>
		</form>
	);
};

const UncontrolledStoryTemplate = (args: Story['args']) => (
	<form>
		<label htmlFor='name'>
			A dropdown label
			<Combobox
				options={args?.options ?? []}
				value={undefined}
				onChange={null}
				isMultiSelect={args?.isMultiSelect}
				defaultQuery={args?.defaultQuery}
				canAddCustomItems={args?.canAddCustomItems}
				name={args?.name ?? 'people'}
				defaultValue={args?.defaultValue ?? undefined}
				disabled={args?.disabled ?? false}
				noOptionsForSearchTermMessage={args?.noOptionsForSearchTermMessage ?? undefined}
				noOptionsAvailableMessage={args?.noOptionsAvailableMessage ?? undefined}
				flipIconPosition={args?.flipIconPosition ?? undefined}
				containerClassName={args?.containerClassName ?? undefined}
			/>
		</label>
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
		defaultValue: [options[3]],
		isMultiSelect: true
	}
};

export const UncontrolledSingleValue: Story = {
	render: UncontrolledStoryTemplate,
	args: {
		name: 'people',
		options,
		defaultValue: options[2],
		isMultiSelect: false
	}
};

export const DefaultQuery: Story = {
	render: UncontrolledStoryTemplate,
	args: {
		options,
		defaultQuery: 'Durward Reynolds'
	}
};

export const ControlledSingleValue: Story = {
	render: ControlledStoryTemplate,
	args: {
		options,
		isMultiSelect: false,
		defaultValue: options[2]
	}
};

export const MultipleValueDropdown: Story = {
	render: ControlledStoryTemplate,
	args: {
		isMultiSelect: true,
		options,
		defaultValue: [options[1], options[0]]
	}
};

export const SingleDropdownWithAddableOptions: Story = {
	render: ControlledStoryTemplate,
	args: {
		options,
		isMultiSelect: false,
		canAddCustomItems: true
	}
};

export const MultipleDropdownWithAddableOptions: Story = {
	render: ControlledStoryTemplate,
	args: {
		options,
		isMultiSelect: true,
		canAddCustomItems: true
	}
};

export const CustomNoOptionsForSearchTermMessage: Story = {
	render: ControlledStoryTemplate,
	args: {
		noOptionsForSearchTermMessage: 'My custom message for no option when there are no options'
	}
};

export const CustomNoOptionsAvailableMessage: Story = {
	render: ControlledStoryTemplate,
	args: {
		noOptionsAvailableMessage: 'My custom no options message'
	}
};

export const MassiveListOfCountries: Story = {
	render: ControlledStoryTemplate,
	args: {
		isMultiSelect: true,
		options: settings.COUNTRY_OPTIONS
	}
};
