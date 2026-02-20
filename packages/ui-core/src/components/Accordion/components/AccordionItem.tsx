import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@repo/tailwind-config';
import type { IAccordionItem } from '~/components/Accordion/Accordion.types';

export const AccordionItem = ({ className, ...props }: IAccordionItem) => {
	return (
		<AccordionPrimitive.Item
			data-slot='accordion-item'
			className={cn('border-b w-full', className)}
			{...props}
		/>
	);
};
