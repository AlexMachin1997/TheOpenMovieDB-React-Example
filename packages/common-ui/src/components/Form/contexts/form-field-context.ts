import { FormFieldContextValue } from '~/components/Form/types/form-field-context-value';
import * as React from 'react';

export const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue
);
