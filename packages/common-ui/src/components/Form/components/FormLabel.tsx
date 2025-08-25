import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { useFormField } from '~/components/Form/hooks/useFormField';
import { Label } from '~/components/Label/Label';
import { cn } from '~/utils/className';

type FormLabelProps = React.ComponentProps<typeof LabelPrimitive.Root>;

export const FormLabel = ({ className, ...props }: FormLabelProps) => {
	const { error, formItemId } = useFormField();

	return (
		<Label
			data-slot='form-label'
			data-error={!!error}
			className={cn('data-[error=true]:text-destructive', className)}
			htmlFor={formItemId}
			{...props}
		/>
	);
};
