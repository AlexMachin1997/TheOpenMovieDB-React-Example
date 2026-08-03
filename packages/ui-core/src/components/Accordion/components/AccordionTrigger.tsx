import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@repo/tailwind-config';
import { Icon } from '~/components/Icon';
import type { IAccordionTrigger } from '~/components/Accordion/Accordion.types';

export const AccordionTrigger = ({ className, children, icon, ...props }: IAccordionTrigger) => {
	return (
		<AccordionPrimitive.Header className='flex w-full'>
			<AccordionPrimitive.Trigger
				data-slot='accordion-trigger'
				className={cn(
					'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180 w-full',
					className
				)}
				{...props}
			>
				{children}
				{icon ?? (
					<Icon
						name='chevron-down'
						className='text-muted-foreground pointer-events-none translate-y-0.5 transition-transform duration-200'
					/>
				)}
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
};
