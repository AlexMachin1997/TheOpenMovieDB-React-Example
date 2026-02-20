import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@repo/tailwind-config';
import type { IAccordion } from '~/components/Accordion/Accordion.types';

export const Accordion = ({ className, ...props }: IAccordion) => {
	return (
		<AccordionPrimitive.Root
			className={cn('w-full flex flex-col gap-4', className)}
			data-slot='accordion'
			{...props}
		/>
	);
};
