import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

/** Properties for the Dialog root component (Radix Dialog.Root). */
export interface IDialog extends React.ComponentProps<typeof DialogPrimitive.Root> {}

/** Properties for DialogPortal. */
export interface IDialogPortal extends React.ComponentProps<typeof DialogPrimitive.Portal> {}

/** Properties for DialogOverlay. */
export interface IDialogOverlay extends React.ComponentProps<typeof DialogPrimitive.Overlay> {
	className?: string;
}

/** Properties for DialogTrigger. */
export interface IDialogTrigger extends React.ComponentProps<typeof DialogPrimitive.Trigger> {
	className?: string;
}

/** Properties for DialogClose. */
export interface IDialogClose extends React.ComponentProps<typeof DialogPrimitive.Close> {
	className?: string;
}

/**
 * Properties for DialogContent.
 * @param {boolean} [showCloseButton=true] - Whether to render the close button
 * @param {React.ReactNode} [icon] - Custom icon for the close button
 */
export interface IDialogContent extends React.ComponentProps<typeof DialogPrimitive.Content> {
	/** Whether to show the close (X) button. Defaults to `true`. */
	showCloseButton?: boolean;

	/** Custom icon to replace the default X icon. */
	icon?: React.ReactNode;
}

/** Properties for DialogTitle. */
export interface IDialogTitle extends React.ComponentProps<typeof DialogPrimitive.Title> {
	className?: string;
}

/** Properties for DialogDescription. */
export interface IDialogDescription
	extends React.ComponentProps<typeof DialogPrimitive.Description> {
	className?: string;
}

/** Properties for DialogHeader (layout wrapper). */
export interface IDialogHeader extends React.ComponentProps<'div'> {
	className?: string;
}

/** Properties for DialogFooter (layout wrapper). */
export interface IDialogFooter extends React.ComponentProps<'div'> {
	className?: string;
}

/** Properties for DialogContentArea (scrollable content wrapper). */
export interface IDialogContentArea extends React.ComponentProps<'div'> {
	className?: string;
}
