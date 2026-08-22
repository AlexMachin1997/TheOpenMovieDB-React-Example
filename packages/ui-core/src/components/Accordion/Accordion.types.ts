import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

/** Properties for the Accordion root component in single-open mode. */
export interface IAccordionSingle
	extends AccordionPrimitive.AccordionSingleProps,
		React.RefAttributes<HTMLDivElement> {
	className?: string;
}

/** Properties for the Accordion root component in multiple-open mode. */
export interface IAccordionMultiple
	extends AccordionPrimitive.AccordionMultipleProps,
		React.RefAttributes<HTMLDivElement> {
	className?: string;
}

/**
 * Properties for the Accordion root component.
 *
 * A union, so this name is a `type` where the rest are interfaces: an interface cannot extend a
 * union (TS2312). Each member is an interface, which is as close as the language allows. The
 * discrimination is load-bearing — `collapsible` exists only in single mode.
 */
export type IAccordion = IAccordionSingle | IAccordionMultiple;

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
