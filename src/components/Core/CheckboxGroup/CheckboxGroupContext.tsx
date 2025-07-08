import * as React from 'react';

type Context = {
	value?: string[];
	defaultValue?: string[];
	onChange?:
		| null
		| ((
				value: string[],
				event: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>,
				id: string
		  ) => void);
	disabled?: boolean;
	name: string;
	// This property is used within the Context and is not a component property.
	// eslint-disable-next-line react/no-unused-prop-types
	isControlled?: boolean;
};

interface ContextProviderProps extends Context {
	children: React.ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CheckboxGroupContext = React.createContext<Context | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useCheckboxGroup = () => {
	const context = React.useContext(CheckboxGroupContext);

	if (!context) throw Error('useCheckbox requires a CheckboxGroupContext');

	return context;
};

const CheckboxGroup = ({
	value,
	onChange,
	disabled,
	children,
	name,
	defaultValue
}: ContextProviderProps) => {
	// When passing values to the Provider they must be memoized or they will change on every render
	const CheckboxGroupProperties = React.useMemo(
		() => ({
			// Controlled component props
			value,
			onChange,

			// Uncontrolled component props
			defaultValue,

			// Arbitrary component props
			disabled,
			name,

			// Used to decide if the component should be in "controlled mode" or not
			// NOTE: In controlled mode we provide state otherwise the html input handles itself
			isControlled: value !== undefined
		}),
		[value, disabled, onChange, name, defaultValue]
	);

	return (
		<CheckboxGroupContext.Provider value={CheckboxGroupProperties}>
			{children}
		</CheckboxGroupContext.Provider>
	);
};

export default CheckboxGroup;
