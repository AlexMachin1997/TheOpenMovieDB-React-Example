import * as React from 'react';
import { useFormField } from '~/components/Form/hooks/useFormField';
import { cn } from '~/utils/className';

type FormMessageProps = React.ComponentProps<'p'>;

export const FormMessage = ({ className, ...props }: FormMessageProps) => {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message ?? '') : props.children;

	return (
		<p
			data-slot='form-message'
			id={formMessageId}
			className={cn('text-destructive text-sm', className)}
			{...props}
		>
			{body}
		</p>
	);
};
