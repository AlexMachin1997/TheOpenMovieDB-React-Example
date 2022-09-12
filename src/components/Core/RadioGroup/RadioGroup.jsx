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
	defaultValue
}) => (
	<div className='w-full'>
		<div className='mx-auto w-full'>
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
				by='id' // When pre-populating the radio value compare by the id property (Basically the key for each option)
			>
				<div className='space-y-2'>
					{(options?.length ?? 0) === 0 && (
						<p className='relative cursor-default select-none py-2 text-gray-700'>
							{noOptionsAvailableMessage}
						</p>
					)}

					{(options?.length ?? 0) > 0 &&
						options.map((option) => (
							<RadioGroup.Option
								key={option.id}
								value={option}
								className={({ active, checked }) =>
									classNames(
										' relative flex cursor-pointer rounded-lg border border-solid border-gray-300 px-5 py-4 shadow-md focus:outline-none',
										{
											'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300':
												active === true,
											'bg-sky-900 bg-opacity-75 text-white': checked === true,
											'bg-white': checked === false,
											'cursor-not-allowed': disabled === true
										}
									)
								}
							>
								{({ checked }) => (
									<div
										className={classNames('flex w-full items-center', {
											'justify-between': addSpaceBetweenLabelAndRadioButton === true
										})}
									>
										{showRadioButtonOnTheLeft === true && (
											<div className='mr-2 shrink-0 text-white'>
												<Icon
													className={classNames({
														'fa-regular fa-circle-dot': checked === true,
														'fa-regular fa-circle text-gray-300': checked === false
													})}
												/>
											</div>
										)}

										<div className='flex items-center'>
											<div className='text-sm'>
												<RadioGroup.Label
													as='p'
													className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}
												>
													{option[displayName]}
												</RadioGroup.Label>
											</div>
										</div>

										{showRadioButtonOnTheLeft === false && (
											<div className='ml-2 shrink-0 text-white'>
												<Icon
													className={classNames({
														'fa-regular fa-circle-dot': checked === true,
														'fa-regular fa-circle text-gray-300': checked === false
													})}
												/>
											</div>
										)}
									</div>
								)}
							</RadioGroup.Option>
						))}
				</div>
			</RadioGroup>
		</div>
	</div>
);

CustomRadioGroup.propTypes = {
	options: PropTypes.array,
	value: PropTypes.any,
	onChange: PropTypes.func,
	displayName: PropTypes.string,
	noOptionsAvailableMessage: PropTypes.string,
	disabled: PropTypes.bool,
	showRadioButtonOnTheLeft: PropTypes.bool,
	addSpaceBetweenLabelAndRadioButton: PropTypes.bool,
	name: PropTypes.string,
	defaultValue: PropTypes.any
};

CustomRadioGroup.defaultProps = {
	options: [],
	value: [],
	onChange: null,
	displayName: 'name',
	noOptionsAvailableMessage: 'No options currently available.',
	disabled: false,
	showRadioButtonOnTheLeft: true,
	addSpaceBetweenLabelAndRadioButton: false,
	name: 'name',
	defaultValue: {}
};

export default CustomRadioGroup;
