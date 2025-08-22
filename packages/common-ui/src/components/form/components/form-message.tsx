import * as React from 'react';
import { useFormField } from '~/components/form/hooks/useFormField';
import { cn } from '~/utils/className';

type FormMessageProps = React.ComponentProps<'p'>;

export const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
	({ className, ...props }, ref) => {
		const { error, formMessageId } = useFormField();
		const body = error ? String(error?.message ?? '') : props.children;

		return (
			<p
				data-slot='form-message'
				id={formMessageId}
				className={cn('text-destructive text-sm', className)}
				ref={ref}
				{...props}
			>
				{body}
			</p>
		);
	}
);
