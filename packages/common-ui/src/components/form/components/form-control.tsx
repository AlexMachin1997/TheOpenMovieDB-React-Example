import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { useFormField } from '~/components/form/hooks/useFormField';

type FormControlProps = React.ComponentProps<typeof Slot>;

export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
	({ ...props }, ref) => {
		const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

		return (
			<Slot
				data-slot='form-control'
				id={formItemId}
				aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
				aria-invalid={!!error}
				ref={ref}
				{...props}
			/>
		);
	}
);
