import type * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '~/utils/className';

type IAccordion = React.ComponentProps<typeof AccordionPrimitive.Root>;

export const Accordion = ({ className, ...props }: IAccordion) => {
	return (
		<AccordionPrimitive.Root
			className={cn('w-full flex flex-col gap-4', className)}
			data-slot='accordion'
			{...props}
		/>
	);
};
