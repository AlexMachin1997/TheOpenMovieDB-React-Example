import * as SheetPrimitive from '@radix-ui/react-dialog';
import type { SheetRef } from '~/components/Sheet/types/sheet-ref';

/** Properties for the Sheet root component. */
export type ISheet = React.ComponentProps<typeof SheetPrimitive.Root> & {
	className?: string;
	ref?: React.RefObject<SheetRef | undefined>;
};

/** Properties for SheetTrigger. */
export interface ISheetTrigger extends React.ComponentProps<typeof SheetPrimitive.Trigger> {
	className?: string;
}

/** Properties for SheetClose. */
export interface ISheetClose extends React.ComponentProps<typeof SheetPrimitive.Close> {
	className?: string;
}

/** Properties for SheetPortal. */
export interface ISheetPortal extends React.ComponentProps<typeof SheetPrimitive.Portal> {
	className?: string;
}

/** Properties for SheetOverlay. */
export interface ISheetOverlay extends React.ComponentProps<typeof SheetPrimitive.Overlay> {
	className?: string;
}

/**
 * Properties for SheetContent.
 * @param {'top'|'right'|'bottom'|'left'} [side='right'] - The slide-in direction
 * @param {boolean} [showCloseButton=true] - Whether to render the close button
 * @param {React.ReactNode} [icon] - Custom icon for the close button
 */
export interface ISheetContent extends React.ComponentProps<typeof SheetPrimitive.Content> {
	/** The edge the sheet slides in from. Defaults to `'right'`. */
	side?: 'top' | 'right' | 'bottom' | 'left';

	/** Whether to show the close (X) button. Defaults to `true`. */
	showCloseButton?: boolean;

	/** Custom icon to replace the default X icon. */
	icon?: React.ReactNode;
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
export interface ISheetTitle extends React.ComponentProps<typeof SheetPrimitive.Title> {
	className?: string;
}

/** Properties for SheetDescription. */
export interface ISheetDescription extends React.ComponentProps<typeof SheetPrimitive.Description> {
	className?: string;
}
