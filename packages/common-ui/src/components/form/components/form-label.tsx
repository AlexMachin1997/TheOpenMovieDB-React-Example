import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { useFormField } from '~/components/form/hooks/useFormField';
import { Label } from '~/components/label/label';
import { cn } from '~/utils/className';

type FormLabelProps = React.ComponentProps<typeof LabelPrimitive.Root>;

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
	({ className, ...props }, ref) => {
		const { error, formItemId } = useFormField();

		return (
			<Label
				data-slot='form-label'
				data-error={!!error}
				className={cn('data-[error=true]:text-destructive', className)}
				htmlFor={formItemId}
				ref={ref}
				{...props}
			/>
		);
	}
);
