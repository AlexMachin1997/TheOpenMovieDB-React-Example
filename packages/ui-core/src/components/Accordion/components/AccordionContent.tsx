import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@repo/tailwind-config';
import type { IAccordionContent } from '~/components/Accordion/Accordion.types';

export const AccordionContent = ({
	className,
	children,
	contentClassName,
	...props
}: IAccordionContent) => {
	return (
		<AccordionPrimitive.Content
			data-slot='accordion-content'
			className={cn(
				'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm w-full',
				className
			)}
			{...props}
		>
			<div className={cn('pt-0 pb-4 w-full', contentClassName)}>{children}</div>
		</AccordionPrimitive.Content>
	);
};
