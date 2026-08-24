import * as React from 'react';

import type { IOverlayCloseEvent, OverlayRef } from '~/components/Overlay/types/overlay-ref';

/** Properties for the Dialog root component. */
export interface IDialog {
	/** Controlled open state. Supplying this makes the dialog controlled. */
	open?: boolean;

	/** Initial state when uncontrolled. */
	defaultOpen?: boolean;

	/** Called on every open and close. */
	onOpenChange?: (open: boolean) => void;

	children?: React.ReactNode;

	/** Imperative handle: `open()`, `close()`, `toggle()` and `isOpen`. */
	ref?: React.RefObject<OverlayRef | undefined>;
}

/**
 * Properties for DialogPortal.
 * @deprecated A native `<dialog>` renders in the top layer, so there is nothing left to portal.
 */
export interface IDialogPortal {
	children?: React.ReactNode;
}

/**
 * Properties for DialogOverlay.
 * @deprecated The `<dialog>` element is its own backdrop.
 */
export interface IDialogOverlay extends React.ComponentProps<'div'> {
	className?: string;
}

/** Properties for DialogTrigger. */
export interface IDialogTrigger extends React.ComponentProps<'button'> {
	className?: string;

	/** Render the child element instead of a `button`, merging props onto it. */
	asChild?: boolean;
}

/** Properties for DialogClose. */
export interface IDialogClose extends React.ComponentProps<'button'> {
	className?: string;

	/** Render the child element instead of a `button`, merging props onto it. */
	asChild?: boolean;
}

/**
 * Properties for DialogContent.
 * @param {boolean} [showCloseButton=true] - Whether to render the close button
 * @param {React.ReactNode} [icon] - Custom icon for the close button
 */
export interface IDialogContent
	// `title`, `open`, `onCancel` and `onClose` are `<dialog>` attributes that collide with props
	// this component owns, so they are removed rather than shadowed.
	extends Omit<React.ComponentProps<'dialog'>, 'title' | 'open' | 'onCancel' | 'onClose'> {
	/**
	 * The heading. Supplying it builds the header for you and names the overlay, with no ARIA at
	 * the call site.
	 */
	title?: React.ReactNode;

	/** Supporting text under the heading. Supplying it describes the overlay. */
	description?: React.ReactNode;

	/** The footer's contents. The footer itself is built for you. */
	footer?: React.ReactNode;

	/** Whether to show the close (X) button. Defaults to `true`. */
	showCloseButton?: boolean;

	/** Custom icon to replace the default X icon. */
	icon?: React.ReactNode;

	/**
	 * Called before every close — Escape, the close button, the backdrop. Call
	 * `event.preventDefault()` to refuse it; the dialog stays genuinely open.
	 */
	onRequestClose?: (event: IOverlayCloseEvent) => void;
}

/** Properties for DialogTitle. */
export interface IDialogTitle extends React.ComponentProps<'h2'> {
	className?: string;
}

/** Properties for DialogDescription. */
export interface IDialogDescription extends React.ComponentProps<'p'> {
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
