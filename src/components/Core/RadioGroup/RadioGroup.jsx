import * as React from 'react';
import PropTypes from 'prop-types';

import { RadioGroup } from '@headlessui/react';
import Icon from '../Icon/Icon';

const CustomRadioGroup = ({
	options,
	value,
	onChange,
	serverSideLabel,
	displayName,
	noOptionsAvailableMessage,
	disabled
}) => (
	<div className='w-full'>
		<div className='mx-auto w-full'>
			<RadioGroup
				value={value}
				onChange={(newValue) => {
					if (onChange) {
						onChange({ value: newValue });
					}
				}}
				disabled={disabled}
			>
				<RadioGroup.Label className='sr-only'>{serverSideLabel}</RadioGroup.Label>
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
									`${
										active
											? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
											: ''
									}
                  ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
								}
							>
								{({ checked }) => (
									<div className='flex w-full items-center justify-between'>
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
										{checked && (
											<div className='shrink-0 text-white'>
												<Icon className='fa-solid fa-circle-check' />
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
	serverSideLabel: PropTypes.string,
	displayName: PropTypes.string,
	noOptionsAvailableMessage: PropTypes.string,
	disabled: PropTypes.bool
};

CustomRadioGroup.defaultProps = {
	options: [],
	value: [],
	onChange: null,
	serverSideLabel: 'Server-side label',
	displayName: 'name',
	noOptionsAvailableMessage: 'No options currently available.',
	disabled: false
};

export default CustomRadioGroup;
