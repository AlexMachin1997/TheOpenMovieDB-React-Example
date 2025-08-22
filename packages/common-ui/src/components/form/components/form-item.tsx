import * as React from 'react';
import { FormItemContext } from '~/components/form/contexts/form-item-context';
import { cn } from '~/utils/className';

type FormItemProps = React.ComponentProps<'div'>;

export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
	({ className, ...props }, ref) => {
		const id = React.useId();

		return (
			<FormItemContext.Provider value={{ id }}>
				<div data-slot='form-item' className={cn('grid gap-2', className)} ref={ref} {...props} />
			</FormItemContext.Provider>
		);
	}
);
