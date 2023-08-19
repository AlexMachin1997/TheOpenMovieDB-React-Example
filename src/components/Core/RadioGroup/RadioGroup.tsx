import * as React from 'react';
import classNames from 'classnames';

import { RadioGroup } from '@headlessui/react';

import Icon from '../Icon/Icon';

type Option = {
	label: string;
	id: string;
	value: string;
	order?: number;
	disabled?: boolean;
};

type Props = {
	options: Option[];
	value?: string;
	defaultValue?: string;
	onChange?: null | ((data: { value: string; name: string }) => void);
	noOptionsAvailableMessage?: string;
	disabled?: boolean;
	labelPosition?: 'left' | 'right';
	name: string;
};

const CustomRadioGroup = React.memo<Props>(
	({
		options = [],
		value = undefined,
		onChange = null,
		noOptionsAvailableMessage = 'No options currently available.',
		disabled = false,
		labelPosition = 'left',
		name,
		defaultValue
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
								onChange({ value: newValue, name });
							}
						}}
						// Used when using the "controlled" component ie using the native html form formData object
						name={name}
						defaultValue={defaultValue}
						// Other general properties made available to the component
						disabled={disabled}
					>
						<div className='space-y-1'>
							{options.map((option) => (
								<RadioGroup.Option
									key={option.id}
									value={option.value}
									className={({ active }) =>
										classNames('relative flex rounded-lg bg-white p-2 focus:outline-none', {
											'ring-1 ring-black ring-opacity-60 ring-offset-2 ring-offset-black':
												active === true,
											'cursor-not-allowed': disabled === true || option.disabled === true,
											'cursor-pointer': disabled === false && option.disabled === false
										})
									}
									disabled={option.disabled}
								>
									{({ checked = false }) => (
										<div
											className={classNames('flex w-full items-center', {
												'cursor-not-allowed': option.disabled === true
											})}
										>
											{labelPosition === 'left' && (
												<Icon
													className={classNames('fa-solid fa-lg mr-2 align-[-0.15rem]', {
														'fa-circle text-gray-300': checked === false,
														'fa-circle-dot text-secondary': checked === true,
														'cursor-not-allowed': option.disabled === true || disabled === true
													})}
												/>
											)}

											<div className='flex items-center'>
												<div className='text-sm'>
													<RadioGroup.Label
														as='p'
														className={classNames('font-medium text-black', {
															'cursor-not-allowed': disabled === true
														})}
													>
														{option.label}
													</RadioGroup.Label>
												</div>
											</div>

											{labelPosition === 'right' && (
												<Icon
													className={classNames('fa-solid fa-lg ml-2 align-[-0.15rem]', {
														'fa-circle text-gray-300': checked === false,
														'fa-circle-dot text-secondary': checked === true,
														'cursor-not-allowed': option.disabled === true || disabled === true
													})}
												/>
											)}
										</div>
									)}
								</RadioGroup.Option>
							))}
						</div>
					</RadioGroup>
				)}
			</div>
		</div>
	)
);

export default CustomRadioGroup;
