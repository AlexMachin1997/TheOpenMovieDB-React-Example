import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

/** Properties for the Accordion root component. */
export type IAccordion = React.ComponentProps<typeof AccordionPrimitive.Root> & {
	className?: string;
};

/** Properties for AccordionItem. */
export interface IAccordionItem extends React.ComponentProps<typeof AccordionPrimitive.Item> {
	className?: string;
}

/**
 * Properties for AccordionTrigger.
 * @param {React.ReactNode} [icon] - Custom icon to replace the default chevron
 */
export interface IAccordionTrigger extends React.ComponentProps<typeof AccordionPrimitive.Trigger> {
	/** Custom icon to replace the default chevron indicator. */
	icon?: React.ReactNode;
}

/**
 * Properties for AccordionContent.
 * @param {string} [contentClassName] - Class name applied to the inner content wrapper
 */
export interface IAccordionContent extends React.ComponentProps<typeof AccordionPrimitive.Content> {
	/** Class name applied to the inner content `<div>` wrapper. */
	contentClassName?: string;
}
