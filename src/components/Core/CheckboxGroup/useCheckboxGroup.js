import * as React from 'react';

import { CheckboxGroupContext } from './CheckboxGroup';

const useRadioGroup = () => {
	const context = React.useContext(CheckboxGroupContext);

	if (!context) throw Error('useRadioGroup requires a CheckboxGroupContext');

	return context;
};

export default useRadioGroup;
