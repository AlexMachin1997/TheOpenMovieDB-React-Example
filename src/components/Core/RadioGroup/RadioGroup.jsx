import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { RadioGroup } from '@headlessui/react';
import Icon from '../Icon/Icon';

const CustomRadioGroup = ({
	options,
	value,
	onChange,
	displayName,
	noOptionsAvailableMessage,
	disabled,
	showRadioButtonOnTheLeft,
	addSpaceBetweenLabelAndRadioButton,
	name,
	defaultValue,
	getRadioLabelClassName,
	getRadioOptionClassName,
	getIconColour
}) => (
	<div className='w-full'>
		<div className='mx-auto w-full'>
			{(options?.length ?? 0) === 0 && (
				<p className='relative cursor-default select-none py-2 text-gray-700'>
					{noOptionsAvailableMessage}
				</p>
			)}

			{(options?.length ?? 0) > 0 && (
				<RadioGroup
					// Used when using the "uncontrolled" component ie using your own form management solution with state ()
					value={value}
					onChange={(newValue) => {
						if (onChange) {
							onChange({ value: newValue });
						}
					}}
					// Used when using the "controlled" component ie using the native html form formData object
					name={name}
					defaultValue={defaultValue}
					// Other general properties made available to the component
					disabled={disabled}
				>
					<div className='space-y-2'>
						{options.map((option) => (
							<RadioGroup.Option
								key={option.id}
								value={option.value}
								className={({ checked, active }) => {
									// If the getRadioOptionClassName function is passed used the value returned from that otherwise use the default
									if (getRadioOptionClassName) {
										return getRadioOptionClassName({
											isChecked: checked,
											isActive: active,
											isDisabled: disabled
										});
									}

									// If the getRadioOptionClassName wasn't passed just use the default classNames for the option
									return classNames(
										' relative flex cursor-pointer rounded-lg border border-solid border-gray-300 px-5 py-4 shadow-md focus:outline-none',
										{
											'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300':
												active === true,
											'bg-sky-900/75 text-white': checked === true,
											'bg-white': checked === false,
											'cursor-not-allowed': disabled === true
										}
									);
								}}
								disabled={option.disabled}
							>
								{({ checked }) => {
									// Generate the icon className
									const iconClassName = classNames('fa-regular', {
										'fa-circle-dot': checked === true,
										'fa-circle': checked === false
									});

									// Generate the default icon container, usually specifies the colour of icon
									let iconColour = classNames({
										'text-white': checked === true,
										'text-gray-300': checked === false
									});

									// If the getIconColour callback is provided then override the default className of the icons container
									if (getIconColour) {
										iconColour = getIconColour({ isChecked: checked });
									}

									return (
										<div
											className={classNames('flex w-full items-center', {
												'justify-between': addSpaceBetweenLabelAndRadioButton === true
											})}
										>
											{showRadioButtonOnTheLeft === true && (
												<span className={iconColour}>
													<Icon className={classNames(iconClassName, 'mr-2')} />
												</span>
											)}

											<div className='flex items-center'>
												<div className='text-sm'>
													<RadioGroup.Label
														as='p'
														className={() => {
															// If the getRadioLabelClassName function is passed used the value returned from that otherwise use the default
															if (getRadioLabelClassName) {
																return getRadioLabelClassName({ isChecked: checked });
															}

															// If the getRadioLabelClassName wasn't passed just use the default classNames for the option label
															return classNames('font-medium', {
																'text-white': checked === true,
																'text-gray-900': checked === false
															});
														}}
													>
														{option[displayName]}
													</RadioGroup.Label>
												</div>
											</div>

											{showRadioButtonOnTheLeft === false && (
												<span className={iconColour}>
													<Icon className={classNames(iconClassName, 'ml-2')} />
												</span>
											)}
										</div>
									);
								}}
							</RadioGroup.Option>
						))}
					</div>
				</RadioGroup>
			)}
		</div>
	</div>
);

CustomRadioGroup.propTypes = {
	// These are our controlled properties, these values are used to control the value manually via some state
	value: PropTypes.string,
	onChange: PropTypes.func,

	// These are our uncontrolled properties, these values are used when there is no state or onChange, instead the component controls it's own state
	defaultValue: PropTypes.string,

	// General properties to provide additional functionality options, displayName etc
	name: PropTypes.string,
	options: PropTypes.array,
	displayName: PropTypes.string,
	noOptionsAvailableMessage: PropTypes.string,
	disabled: PropTypes.bool,
	showRadioButtonOnTheLeft: PropTypes.bool,
	addSpaceBetweenLabelAndRadioButton: PropTypes.bool,
	getRadioLabelClassName: PropTypes.func,
	getRadioOptionClassName: PropTypes.func,
	getIconColour: PropTypes.func
};

CustomRadioGroup.defaultProps = {
	// These are our controlled properties, these values are used to control the value manually via some state
	value: undefined,
	onChange: null,

	// These are our uncontrolled properties, these values are used when there is no state or onChange, instead the component controls it's own state
	defaultValue: undefined,

	// General properties to provide additional functionality options, displayName etc
	name: 'name',
	options: [],
	displayName: 'name',
	noOptionsAvailableMessage: 'No options currently available.',
	disabled: false,
	showRadioButtonOnTheLeft: true,
	addSpaceBetweenLabelAndRadioButton: false,
	getRadioLabelClassName: null,
	getRadioOptionClassName: null,
	getIconColour: null
};

export default CustomRadioGroup;
