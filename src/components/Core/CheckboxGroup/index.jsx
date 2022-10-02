import * as React from 'react';
import PropTypes from 'prop-types';

import CheckboxGroup from './CheckboxGroup';
import CheckboxGroupOption from './CheckboxGroupOption';

const CustomCheckboxGroup = ({
	options,
	value,
	onChange,
	displayName,
	noOptionsAvailableMessage,
	disabled,
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

			<div className='space-y-2'>
				{(options?.length ?? 0) > 0 && (
					<CheckboxGroup
						value={value}
						onChange={(newValue, event, id) => {
							if (onChange) {
								onChange({ value: newValue, event, elementClicked: id });
							}
						}}
						disabled={disabled}
						name={name}
						defaultValue={defaultValue}
					>
						{options.map((option) => (
							<CheckboxGroupOption
								key={option.id}
								label={option[displayName]}
								disabled={option?.disabled ?? false}
								id={option.id}
								value={option.value}
							/>
						))}
					</CheckboxGroup>
				)}
			</div>
		</div>
	</div>
);

CustomCheckboxGroup.propTypes = {
	options: PropTypes.array,
	value: PropTypes.any,
	onChange: PropTypes.func,
	displayName: PropTypes.string,
	noOptionsAvailableMessage: PropTypes.string,
	disabled: PropTypes.bool,
	name: PropTypes.string.isRequired,
	defaultValue: PropTypes.array
};

CustomCheckboxGroup.defaultProps = {
	options: [],
	value: undefined,
	onChange: null,
	displayName: 'label',
	noOptionsAvailableMessage: 'No options currently available.',
	disabled: false,
	defaultValue: []
};

export default CustomCheckboxGroup;
