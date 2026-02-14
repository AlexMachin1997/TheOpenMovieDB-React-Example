import type * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '~/utils/className';

interface IAccordionItem extends React.ComponentProps<typeof AccordionPrimitive.Item> {
	className?: string;
}

export const AccordionItem = ({ className, ...props }: IAccordionItem) => {
	return (
		<AccordionPrimitive.Item
			data-slot='accordion-item'
			className={cn('border-b w-full', className)}
			{...props}
		/>
	);
};
