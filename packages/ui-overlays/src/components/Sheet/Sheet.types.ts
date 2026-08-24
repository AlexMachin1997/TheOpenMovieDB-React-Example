import * as React from 'react';

import type { IOverlayCloseEvent, OverlayRef } from '~/components/Overlay/types/overlay-ref';

/** Properties for the Sheet root component. */
export interface ISheet {
	/** Controlled open state. Supplying this makes the sheet controlled. */
	open?: boolean;

	/** Initial state when uncontrolled. */
	defaultOpen?: boolean;

	/** Called on every open and close. */
	onOpenChange?: (open: boolean) => void;

	children?: React.ReactNode;

	/** Imperative handle: `open()`, `close()`, `toggle()` and `isOpen`. */
	ref?: React.RefObject<OverlayRef | undefined>;
}

/** Properties for SheetTrigger. */
export interface ISheetTrigger extends React.ComponentProps<'button'> {
	className?: string;

	/** Render the child element instead of a `button`, merging props onto it. */
	asChild?: boolean;
}

/** Properties for SheetClose. */
export interface ISheetClose extends React.ComponentProps<'button'> {
	className?: string;

	/** Render the child element instead of a `button`, merging props onto it. */
	asChild?: boolean;
}

/**
 * Properties for SheetPortal.
 * @deprecated A native dialog element renders in the top layer, so there is nothing left to portal.
 */
export interface ISheetPortal {
	children?: React.ReactNode;
}

/**
 * Properties for SheetOverlay.
 * @deprecated The dialog element is its own backdrop.
 */
export interface ISheetOverlay extends React.ComponentProps<'div'> {
	className?: string;
}

/**
 * Properties for SheetContent.
 * @param {boolean} [showCloseButton=true] - Whether to render the close button
 * @param {React.ReactNode} [icon] - Custom icon for the close button
 */
export interface ISheetContent
	// `title`, `open`, `onCancel` and `onClose` are dialog attributes that collide with props this
	// component owns, so they are removed rather than shadowed.
	extends Omit<React.ComponentProps<'dialog'>, 'title' | 'open' | 'onCancel' | 'onClose'> {
	/** The edge the sheet slides in from. Defaults to `'right'`. */
	side?: 'top' | 'right' | 'bottom' | 'left';

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
	 * Called before every close: Escape, the close button, the backdrop. Call
	 * `event.preventDefault()` to refuse it; the sheet stays genuinely open.
	 */
	onRequestClose?: (event: IOverlayCloseEvent) => void;
}

/** Properties for SheetInnerContent. */
export interface ISheetInnerContent extends React.ComponentProps<'div'> {
	className?: string;
}

/** Properties for SheetHeader. */
export interface ISheetHeader extends React.ComponentProps<'div'> {
	className?: string;
}

/** Properties for SheetFooter. */
export interface ISheetFooter extends React.ComponentProps<'div'> {
	className?: string;
}

/** Properties for SheetTitle. */
export interface ISheetTitle extends React.ComponentProps<'h2'> {
	className?: string;
}

/** Properties for SheetDescription. */
export interface ISheetDescription extends React.ComponentProps<'p'> {
	className?: string;
}
