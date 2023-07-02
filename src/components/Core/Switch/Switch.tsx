import * as React from 'react';

import { Switch } from '@headlessui/react';
import classNames from 'classnames';

type Props = {
	onChange?: null | ((data: { value: boolean }) => void);
	value?: boolean;
	defaultValue?: boolean;
	name: string;
	disabled?: boolean;
	label: string;
	showLabelOnTheRight?: boolean;
};

const CustomSwitch = ({
	onChange = null,
	value = undefined,
	defaultValue = undefined,
	name,
	disabled = false,
	label,
	showLabelOnTheRight = true
}: Props) => (
	<Switch.Group>
		<div className='flex items-center'>
			{showLabelOnTheRight === false && <Switch.Label>{label}</Switch.Label>}

			<Switch
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
				{({ checked }) => (
					<button
						className={classNames(
							'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
							{
								'bg-secondary/60': checked === true,
								'bg-gray-200': checked === false,
								'cursor-not-allowed': disabled === true,
								'mr-3': showLabelOnTheRight === true,
								'ml-3': showLabelOnTheRight === false
							}
						)}
						type='button'
						disabled={disabled}
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

			{showLabelOnTheRight === true && <Switch.Label>{label}</Switch.Label>}
		</div>
	</Switch.Group>
);

export default CustomSwitch;
