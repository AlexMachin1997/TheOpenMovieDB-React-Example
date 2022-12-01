// import classNames from 'classnames';
import * as React from 'react';

import RadioGroups from './RadioGroup';
import CountryFlag from '../../CountryFlag/CountryFlag';
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

export const DefaultRadioGroups = UncontrolledStoryTemplate.bind({});
DefaultRadioGroups.args = {
	...DefaultStoryArgs
};

export const CountriesExample = UncontrolledStoryTemplate.bind({});
CountriesExample.args = {
	...DefaultStoryArgs,
	options: Settings.COUNTRY_OPTIONS,
	displayName: 'label'
};

export const UncontrolledRadioGroup = UncontrolledStoryTemplate.bind({});
UncontrolledRadioGroup.args = {
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
};

export const ControlledRadioGroup = ControlledStoryTemplate.bind({});
ControlledRadioGroup.args = {
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
};

export const CustomDisplayName = UncontrolledStoryTemplate.bind({});
CustomDisplayName.args = {
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
};

export const CustomNoOptionsAvailableMessage = ControlledStoryTemplate.bind({});
CustomNoOptionsAvailableMessage.args = {
	...DefaultStoryArgs,
	noOptionsAvailableMessage: 'My custom no options message'
};

export const DisabledGroup = UncontrolledStoryTemplate.bind({});
DisabledGroup.args = {
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
};

export const ShowRadioButtonOnTheRight = UncontrolledStoryTemplate.bind({});
ShowRadioButtonOnTheRight.args = {
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
};

export const AddSpaceBetweenLabelAndRadioButtonOnTheRight = UncontrolledStoryTemplate.bind({});
AddSpaceBetweenLabelAndRadioButtonOnTheRight.args = {
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
};

export const AddSpaceBetweenLabelAndRadioButtonOnTheLeft = UncontrolledStoryTemplate.bind({});
AddSpaceBetweenLabelAndRadioButtonOnTheLeft.args = {
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
};

// eslint-disable-next-line react/prop-types
const CustomIcon = ({ option }) => (
	// eslint-disable-next-line react/prop-types
	<CountryFlag countryCode={option?.value ?? ''} className='mr-3' />
);

export const CustomIconComponent = ControlledStoryTemplate.bind({});
CustomIconComponent.args = {
	...DefaultStoryArgs,
	options: [Settings.COUNTRY_OPTIONS[0], Settings.COUNTRY_OPTIONS[1], Settings.COUNTRY_OPTIONS[2]],
	displayName: 'label',
	iconComponent: CustomIcon
};

export default { component: RadioGroups, title: 'Design System/Core/RadioGroup' };
