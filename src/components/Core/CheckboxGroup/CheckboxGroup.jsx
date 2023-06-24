import * as React from 'react';
import PropTypes from 'prop-types';

export const CheckboxGroupContext = React.createContext({});

const CheckboxGroup = ({ value, onChange, disabled, children, name, defaultValue }) => {
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

CheckboxGroup.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	value: PropTypes.array,
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
	children: PropTypes.node.isRequired,
	name: PropTypes.string.isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	defaultValue: PropTypes.array
};

CheckboxGroup.defaultProps = {
	value: undefined,
	onChange: null,
	disabled: false,
	defaultValue: []
};

export default CheckboxGroup;
