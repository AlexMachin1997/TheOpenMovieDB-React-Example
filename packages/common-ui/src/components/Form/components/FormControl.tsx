import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { useFormField } from '~/components/Form/hooks/useFormField';

type FormControlProps = React.ComponentProps<typeof Slot>;

export const FormControl = ({ ...props }: FormControlProps) => {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

	return (
		<Slot
			data-slot='form-control'
			id={formItemId}
			aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
			aria-invalid={!!error}
			{...props}
		/>
	);
};
