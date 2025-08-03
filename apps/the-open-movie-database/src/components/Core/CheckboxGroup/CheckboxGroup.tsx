import CheckboxGroupContextProvider from '~/components/Core/CheckboxGroup/CheckboxGroupContext';
import CheckboxGroupOption from '~/components/Core/CheckboxGroup/CheckboxGroupOption';
import { CheckboxOption } from '~/types/DropdownElementTypes';

type CheckboxGroupProps = {
	options: CheckboxOption[];
	value?: string[];
	defaultValue?: string[];
	onChange?:
		| null
		| ((data: {
				value: string[];
				event: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>;
				elementClicked: string;
		  }) => void);
	noOptionsAvailableMessage?: string;
	disabled?: boolean;
	name: string;
};

const CheckboxGroup = ({
	options = [],
	value = undefined,
	onChange = null,
	noOptionsAvailableMessage = 'No options currently available.',
	disabled = false,
	name,
	defaultValue = undefined
}: CheckboxGroupProps) => (
	<div className='w-full'>
		<div className='mx-auto w-full'>
			{(options?.length ?? 0) === 0 && (
				<p className='cursor-default select-none py-2 text-gray-700'>{noOptionsAvailableMessage}</p>
			)}

			<div className='space-y-2'>
				{(options?.length ?? 0) > 0 && (
					<CheckboxGroupContextProvider
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
								label={option.label}
								disabled={option?.disabled ?? false}
								id={option.id}
								value={option.value}
							/>
						))}
					</CheckboxGroupContextProvider>
				)}
			</div>
		</div>
	</div>
);

export default CheckboxGroup;
