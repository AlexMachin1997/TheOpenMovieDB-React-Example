import * as React from 'react';
import { useFormField } from '~/components/form/hooks/useFormField';
import { cn } from '~/utils/className';

type FormDescriptionProps = React.ComponentProps<'p'>;

export const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
	({ className, ...props }, ref) => {
		const { formDescriptionId } = useFormField();

		return (
			<p
				data-slot='form-description'
				id={formDescriptionId}
				ref={ref}
				className={cn('text-muted-foreground text-sm', className)}
				{...props}
			/>
		);
	}
);
