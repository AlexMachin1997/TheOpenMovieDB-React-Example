import * as React from 'react';

import { Switch as HeadlessUISwitch } from '@headlessui/react';
import classNames from 'classnames';

type SwitchProps = {
	onChange?: null | ((data: { value: boolean }) => void);
	value?: boolean;
	defaultValue?: boolean;
	name: string;
	disabled?: boolean;
	label: string;
	showLabelOnTheRight?: boolean;
};

const Switch = ({
	onChange = null,
	value = undefined,
	defaultValue = undefined,
	name,
	disabled = false,
	label,
	showLabelOnTheRight = true
}: SwitchProps) => (
	<HeadlessUISwitch.Group>
		<div className='flex items-center'>
			{showLabelOnTheRight === false && <HeadlessUISwitch.Label>{label}</HeadlessUISwitch.Label>}

			<HeadlessUISwitch
				// Used when wanting to rely on the formData object provided by native html forms (uncontrolled mode)
				defaultChecked={defaultValue}
				// Used when wanting to rely on external state stored outside this component (Controlled mode)
				checked={value}
				// Other general component props
				onChange={(newValue) => {
					if (onChange) {
						onChange({ value: newValue });
					}
				}}
				name={name}
				as={React.Fragment}
			>
				{({ checked: switchInternalValue }) => (
					<button
						className={classNames(
							'relative inline-flex h-[30px] w-[74px] shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75',
							{
								'bg-secondary': switchInternalValue === true && disabled === false,
								'bg-secondary/50': switchInternalValue === false && disabled === false,
								'cursor-not-allowed bg-gray-400': disabled === true,
								'cursor-pointer': disabled === false,
								'mr-3': showLabelOnTheRight === true,
								'ml-3': showLabelOnTheRight === false
							}
						)}
						type='button'
						disabled={disabled}
					>
						<span
							className={classNames(
								'pointer-events-none inline-block h-[25px] w-[40%] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
								{
									'translate-x-10': switchInternalValue === true,
									'translate-x-1': switchInternalValue === false,
									'cursor-not-allowed': disabled === true
								}
							)}
						/>
					</button>
				)}
			</HeadlessUISwitch>

			{showLabelOnTheRight === true && <HeadlessUISwitch.Label>{label}</HeadlessUISwitch.Label>}
		</div>
	</HeadlessUISwitch.Group>
);

export default Switch;
