import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxGroup } from '~/components/checkbox-group/checkbox-group';
import { Checkbox } from '~/components/checkbox/checkbox';
import type { Option } from '~/types/Option';

const meta: Meta<typeof CheckboxGroup> = {
	title: 'Components/Checkbox group',
	component: CheckboxGroup,
	parameters: {
		layout: 'centered'
	}
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

// Custom template that tracks and displays current values
const CheckboxGroupTemplate = ({
	options,
	...props
}: { options: Option[] } & React.ComponentProps<typeof CheckboxGroup>) => {
	const [currentValues, setCurrentValues] = React.useState<string[]>(props.defaultValue || []);

	return (
		<div className='space-y-4'>
			<CheckboxGroup
				{...props}
				options={options}
				value={currentValues}
				onChange={(data) => {
					console.log(`Selection changed: ${data.value.join(', ')}`);
					setCurrentValues(data.value);
				}}
			/>
			<div className='p-3 bg-gray-50 rounded border'>
				<p className='text-sm font-medium text-gray-700'>Current Selection:</p>
				<p className='text-sm text-gray-600'>
					{currentValues.length > 0 ? currentValues.join(', ') : 'None selected'}
				</p>
				<p className='text-xs text-gray-500 mt-1'>
					Selected count: {currentValues.length} / {options.length}
				</p>
			</div>
		</div>
	);
};

const sampleOptions: Option[] = [
	{ id: 'option-1', value: 'option-one', label: 'Option One' },
	{ id: 'option-2', value: 'option-two', label: 'Option Two' },
	{ id: 'option-3', value: 'option-three', label: 'Option Three' }
];

const sampleOptionsWithDisabled: Option[] = [
	{ id: 'option-1', value: 'option-one', label: 'Option One' },
	{ id: 'option-2', value: 'option-two', label: 'Option Two (Disabled)', disabled: true },
	{ id: 'option-3', value: 'option-three', label: 'Option Three' }
];

const sampleOptionsWithOrder: Option[] = [
	{ id: 'option-3', value: 'option-three', label: 'Option Three', order: 3 },
	{ id: 'option-1', value: 'option-one', label: 'Option One', order: 1 },
	{ id: 'option-2', value: 'option-two', label: 'Option Two', order: 2 }
];

export const Default: Story = {
	render: () => (
		<CheckboxGroupTemplate
			options={sampleOptions}
			name='default-group'
			defaultValue={['option-one']}
		/>
	)
};

export const WithDisabledOption: Story = {
	render: () => (
		<CheckboxGroupTemplate
			options={sampleOptionsWithDisabled}
			name='disabled-group'
			defaultValue={['option-one']}
		/>
	)
};

export const WithDisabledGroup: Story = {
	render: () => (
		<CheckboxGroupTemplate
			options={sampleOptions}
			name='disabled-group'
			defaultValue={['option-one']}
			disabled={true}
		/>
	)
};

export const LabelPositionRight: Story = {
	render: () => (
		<CheckboxGroupTemplate
			options={sampleOptions}
			name='right-label-group'
			defaultValue={['option-one']}
		/>
	)
};

export const NoOptionsAvailable: Story = {
	render: () => (
		<CheckboxGroup
			options={[]}
			name='empty-group'
			noOptionsAvailableMessage='No options are currently available for selection.'
		/>
	)
};

export const CustomNoOptionsMessage: Story = {
	render: () => (
		<CheckboxGroup
			options={[]}
			name='custom-message-group'
			noOptionsAvailableMessage='Please check back later for available options.'
		/>
	)
};

const FormExampleComponent = () => {
	const notificationOptions: Option[] = [
		{ id: 'email', value: 'email', label: 'Email notifications' },
		{ id: 'push', value: 'push', label: 'Push notifications' },
		{ id: 'sms', value: 'sms', label: 'SMS notifications' },
		{ id: 'browser', value: 'browser', label: 'Browser notifications' }
	];

	const [preferences, setPreferences] = React.useState<string[]>(['email']);

	return (
		<div className='w-[350px] space-y-6'>
			<div className='space-y-2'>
				<h4 className='text-sm font-medium leading-none'>Notification Preferences</h4>
				<p className='text-sm text-muted-foreground'>
					Choose which types of notifications you want to receive.
				</p>
			</div>
			<CheckboxGroup
				options={notificationOptions}
				name='notifications'
				value={preferences}
				onChange={(data) => {
					console.log(
						`Notification preferences changed to ${data.value.join(', ')} for group ${data.name}`
					);
					setPreferences(data.value);
				}}
			/>
			<div className='p-3 bg-green-50 rounded border border-green-200'>
				<p className='text-sm font-medium text-green-700'>Active Preferences:</p>
				<p className='text-sm text-green-600'>
					{preferences.length > 0 ? preferences.join(', ') : 'None'}
				</p>
			</div>
		</div>
	);
};

export const FormExample: Story = {
	render: () => <FormExampleComponent />
};

export const HorizontalLayout: Story = {
	render: () => (
		<CheckboxGroupTemplate
			options={sampleOptions}
			name='horizontal-group'
			defaultValue={['option-one']}
			className='flex space-x-4'
		/>
	)
};

export const WithOrderedOptions: Story = {
	render: () => (
		<CheckboxGroupTemplate
			options={sampleOptionsWithOrder}
			name='ordered-group'
			defaultValue={['option-one']}
		/>
	)
};

export const MultipleSelections: Story = {
	render: () => (
		<CheckboxGroupTemplate
			options={sampleOptions}
			name='multiple-group'
			defaultValue={['option-one', 'option-three']}
		/>
	)
};

export const AllOptionsSelected: Story = {
	render: () => (
		<CheckboxGroupTemplate
			options={sampleOptions}
			name='all-selected-group'
			defaultValue={['option-one', 'option-two', 'option-three']}
		/>
	)
};

export const NoDefaultSelection: Story = {
	render: () => (
		<CheckboxGroupTemplate options={sampleOptions} name='no-default-group' defaultValue={[]} />
	)
};

export const MixedDisabledAndEnabled: Story = {
	render: () => {
		const mixedOptions: Option[] = [
			{ id: 'option-1', value: 'option-one', label: 'Option One' },
			{ id: 'option-2', value: 'option-two', label: 'Option Two (Disabled)', disabled: true },
			{ id: 'option-3', value: 'option-three', label: 'Option Three' },
			{ id: 'option-4', value: 'option-four', label: 'Option Four (Disabled)', disabled: true },
			{ id: 'option-5', value: 'option-five', label: 'Option Five' }
		];

		return (
			<CheckboxGroupTemplate
				options={mixedOptions}
				name='mixed-group'
				defaultValue={['option-one', 'option-three']}
			/>
		);
	}
};

export const WithCustomStyling: Story = {
	render: () => (
		<CheckboxGroupTemplate
			options={sampleOptions}
			name='custom-styled-group'
			defaultValue={['option-one']}
			className='p-4 border rounded-lg bg-gray-50'
		/>
	)
};

const ControlledVsUncontrolledComponent = () => {
	const [controlledValue, setControlledValue] = React.useState<string[]>(['option-one']);

	return (
		<div className='space-y-8'>
			<div className='space-y-4'>
				<h4 className='text-sm font-medium leading-none'>Controlled Component</h4>
				<p className='text-sm text-muted-foreground'>
					State is managed externally. Changing the value prop updates the selection immediately.
				</p>
				<CheckboxGroup
					options={sampleOptions}
					name='controlled-group'
					value={controlledValue}
					onChange={(data) => {
						console.log(`Controlled selection: ${data.value.join(', ')}`);
						setControlledValue(data.value);
					}}
				/>
				<div className='p-3 bg-blue-50 rounded border border-blue-200'>
					<p className='text-sm font-medium text-blue-700'>Controlled State:</p>
					<p className='text-sm text-blue-600'>{controlledValue.join(', ')}</p>
				</div>
				<div className='flex gap-2'>
					<button
						onClick={() => setControlledValue(['option-one'])}
						className='px-3 py-1 text-sm border rounded hover:bg-gray-50'
					>
						Set to Option One
					</button>
					<button
						onClick={() => setControlledValue(['option-one', 'option-two'])}
						className='px-3 py-1 text-sm border rounded hover:bg-gray-50'
					>
						Set to Option One & Two
					</button>
					<button
						onClick={() => setControlledValue([])}
						className='px-3 py-1 text-sm border rounded hover:bg-gray-50'
					>
						Clear All
					</button>
				</div>
			</div>

			<div className='space-y-4'>
				<h4 className='text-sm font-medium leading-none'>Uncontrolled Component</h4>
				<p className='text-sm text-muted-foreground'>
					Uses defaultValue for initial state. Component manages its own state internally. No
					external tracking.
				</p>
				<CheckboxGroup
					options={sampleOptions}
					name='uncontrolled-group'
					defaultValue={['option-one']}
				/>
				<div className='p-3 bg-green-50 rounded border border-green-200'>
					<p className='text-sm font-medium text-green-700'>Uncontrolled Behavior:</p>
					<p className='text-sm text-green-600'>
						This component manages its own state internally. No external state tracking.
					</p>
					<p className='text-xs text-green-500 mt-1'>
						Note: For true form submission with uncontrolled behavior, use individual Radix UI
						Checkbox components.
					</p>
				</div>
			</div>

			<div className='space-y-4'>
				<h4 className='text-sm font-medium leading-none'>True Uncontrolled with Form Submission</h4>
				<p className='text-sm text-muted-foreground'>
					Using individual Radix UI Checkbox components for native form behavior.
				</p>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						const formData = new FormData(event.target as HTMLFormElement);
						const selectedValues: string[] = [];

						// This works because we're using individual Radix UI Checkbox components
						for (const [key, value] of formData.entries()) {
							if (key.startsWith('individual-') && value === 'on') {
								selectedValues.push(key.replace('individual-', ''));
							}
						}

						console.log('Individual checkboxes form submitted with values:', selectedValues);
						alert(
							'Individual checkboxes form submitted! Selected values: ' +
								(selectedValues.join(', ') || 'None')
						);
					}}
					className='space-y-4'
				>
					<div className='space-y-2'>
						{sampleOptions.map((option) => (
							<div key={option.id} className='flex items-center space-x-2'>
								<Checkbox
									name={`individual-${option.value}`}
									defaultChecked={option.value === 'option-one'}
								/>
								<label className='text-sm font-medium'>{option.label}</label>
							</div>
						))}
					</div>
					<button
						type='submit'
						className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
					>
						Submit Individual Checkboxes
					</button>
				</form>
			</div>

			<div className='p-4 bg-gray-50 rounded border'>
				<h5 className='text-sm font-medium text-gray-700 mb-2'>Key Differences:</h5>
				<ul className='text-sm text-gray-600 space-y-1'>
					<li>
						• <strong>Controlled:</strong> Parent component manages state, value prop controls
						selection
					</li>
					<li>
						• <strong>Uncontrolled:</strong> Component manages its own state, defaultValue sets
						initial state
					</li>
					<li>
						• <strong>Use Controlled when:</strong> You need to programmatically change selections
					</li>
					<li>
						• <strong>Use Uncontrolled when:</strong> Simple form inputs where you only need the
						final value
					</li>
					<li>
						• <strong>Use Individual Checkboxes when:</strong> You need true form submission
						behavior
					</li>
				</ul>
			</div>
		</div>
	);
};

export const ControlledVsUncontrolled: Story = {
	render: () => <ControlledVsUncontrolledComponent />
};
