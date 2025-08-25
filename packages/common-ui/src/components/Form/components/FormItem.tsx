import * as React from 'react';
import { FormItemContext } from '~/components/Form/contexts/form-item-context';
import { cn } from '~/utils/className';

type FormItemProps = React.ComponentProps<'div'>;

export const FormItem = ({ className, ...props }: FormItemProps) => {
	const id = React.useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<div data-slot='form-item' className={cn('grid gap-2', className)} {...props} />
		</FormItemContext.Provider>
	);
};
