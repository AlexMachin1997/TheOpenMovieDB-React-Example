// import classNames from 'classnames';
import * as React from 'react';

import RadioGroups from './RadioGroup';
import Settings from '../../../settings';

const ControlledStoryTemplate = (args) => {
	const { defaultValue = '', ...reset } = args;

	const [value, setValue] = React.useState(defaultValue);

	return (
		<RadioGroups
			{...reset}
			value={value}
			onChange={({ value: newValue }) => {
				setValue(newValue);
			}}
		/>
	);
};

const UncontrolledStoryTemplate = (args) => {
	const { name = '', defaultValue = '', ...rest } = args;

	return (
		<form>
			<RadioGroups {...rest} defaultValue={defaultValue} name={name} value={undefined} />
		</form>
	);
};

const DefaultStoryArgs = {
	options: [],
	value: undefined,
	onChange: null,
	displayName: 'name',
	noOptionsAvailableMessage: 'No options currently available.',
	disabled: false,
	showRadioButtonOnTheLeft: true,
	addSpaceBetweenLabelAndRadioButton: false,
	name: 'name',
	defaultValue: ''
};

export const DefaultRadioGroups = {
	render: UncontrolledStoryTemplate,

	args: {
		...DefaultStoryArgs
	}
};

export const CountriesExample = {
	render: UncontrolledStoryTemplate,

	args: {
		...DefaultStoryArgs,
		options: Settings.COUNTRY_OPTIONS,
		displayName: 'label'
	}
};

export const UncontrolledRadioGroup = {
	render: UncontrolledStoryTemplate,

	args: {
		...DefaultStoryArgs,
		defaultValue: '1',
		options: [
			{
				name: 'Radio option 1',
				id: 1,
				value: '1'
			},
			{
				name: 'Radio option 2',
				id: 2,
				value: '2'
			},
			{
				name: 'Radio option 3',
				id: 3,
				value: '3'
			}
		]
	}
};

export const ControlledRadioGroup = {
	render: ControlledStoryTemplate,

	args: {
		...DefaultStoryArgs,
		defaultValue: '2',
		options: [
			{
				name: 'Radio option 1',
				id: 1,
				value: '1'
			},
			{
				name: 'Radio option 2',
				id: 2,
				value: '2'
			},
			{
				name: 'Radio option 3',
				id: 3,
				value: '3'
			}
		]
	}
};

export const CustomDisplayName = {
	render: UncontrolledStoryTemplate,

	args: {
		...DefaultStoryArgs,
		displayName: 'label',
		options: [
			{
				label: 'Radio option 1',
				id: 1,
				value: '1'
			},
			{
				label: 'Radio option 2',
				id: 2,
				value: '2'
			},
			{
				label: 'Radio option 3',
				id: 3,
				value: '3'
			}
		]
	}
};

export const CustomNoOptionsAvailableMessage = {
	render: ControlledStoryTemplate,

	args: {
		...DefaultStoryArgs,
		noOptionsAvailableMessage: 'My custom no options message'
	}
};

export const DisabledGroup = {
	render: UncontrolledStoryTemplate,

	args: {
		...DefaultStoryArgs,
		disabled: true,
		options: [
			{
				name: 'Radio option 1',
				id: 1,
				value: '1'
			},
			{
				name: 'Radio option 2',
				id: 2,
				value: '2'
			},
			{
				name: 'Radio option 3',
				id: 3,
				value: '3'
			}
		]
	}
};

export const ShowRadioButtonOnTheRight = {
	render: UncontrolledStoryTemplate,

	args: {
		...DefaultStoryArgs,
		options: [
			{
				name: 'Radio option 1',
				id: 1,
				value: '1'
			},
			{
				name: 'Radio option 2',
				id: 2,
				value: '2'
			},
			{
				name: 'Radio option 3',
				id: 3,
				value: '3'
			}
		],
		showRadioButtonOnTheLeft: false
	}
};

export const AddSpaceBetweenLabelAndRadioButtonOnTheRight = {
	render: UncontrolledStoryTemplate,

	args: {
		...DefaultStoryArgs,
		options: [
			{
				name: 'Radio option 1',
				id: 1,
				value: '1'
			},
			{
				name: 'Radio option 2',
				id: 2,
				value: '2'
			},
			{
				name: 'Radio option 3',
				id: 3,
				value: '3'
			}
		],
		addSpaceBetweenLabelAndRadioButton: true
	}
};

export const AddSpaceBetweenLabelAndRadioButtonOnTheLeft = {
	render: UncontrolledStoryTemplate,

	args: {
		...DefaultStoryArgs,
		options: [
			{
				name: 'Radio option 1',
				id: 1,
				value: '1'
			},
			{
				name: 'Radio option 2',
				id: 2,
				value: '2'
			},
			{
				name: 'Radio option 3',
				id: 3,
				value: '3'
			}
		],
		addSpaceBetweenLabelAndRadioButton: true,
		showRadioButtonOnTheLeft: false
	}
};

export default { component: RadioGroups, title: 'Design System/Core/RadioGroup' };
