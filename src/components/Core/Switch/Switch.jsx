import * as React from 'react';
import PropTypes from 'prop-types';

import { Switch } from '@headlessui/react';
import classNames from 'classnames';

const CustomSwitch = ({ onChange, value, defaultValue, name, disabled, label }) => (
	<Switch.Group>
		<div className='flex items-center'>
			<Switch
				// Used when using the "uncontrolled" component ie using your own form management solution with state ()
				checked={value}
				onChange={(newValue) => {
					if (onChange) {
						onChange({ value: newValue });
					}
				}}
				// Used when using the "controlled" component ie using the native html form formData object
				name={name}
				defaultChecked={defaultValue}
				// Other general properties made available to the component
				disabled={disabled}
				as={React.Fragment}
			>
				{({ checked }) => (
					<button
						style={{ margin: '0 1rem 0 0' }}
						className={classNames(
							'relative inline-flex h-6 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
							{
								'bg-secondary/60': checked === true,
								'bg-gray-200': checked === false,
								'cursor-not-allowed': disabled === true
							}
						)}
						type='button'
					>
						<span
							className={classNames(
								'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
								{
									'translate-x-6': checked === true,
									'translate-x-1': checked === false,
									'cursor-not-allowed': disabled === true
								}
							)}
						/>
					</button>
				)}
			</Switch>
			<Switch.Label
				className={classNames({
					'cursor-pointer': disabled === false,
					'cursor-not-allowed': disabled === true
				})}
			>
				{label}
			</Switch.Label>
		</div>
	</Switch.Group>
);

CustomSwitch.propTypes = {
	// These are our controlled properties, these values are used to control the value manually via some state
	value: PropTypes.bool,
	onChange: PropTypes.func,

	// These are our uncontrolled properties, these values are used when there is no state or onChange, instead the component controls it's own state
	defaultValue: PropTypes.bool,

	// General properties to provide additional functionality options, displayName etc
	name: PropTypes.string,
	disabled: PropTypes.bool,
	label: PropTypes.string
};

CustomSwitch.defaultProps = {
	// These are our controlled properties, these values are used to control the value manually via some state
	value: undefined,
	onChange: null,

	// These are our uncontrolled properties, these values are used when there is no state or onChange, instead the component controls it's own state
	defaultValue: undefined,

	// General properties to provide additional functionality options, displayName etc
	name: 'name',
	disabled: false,
	label: 'Example label'
};

export default CustomSwitch;
