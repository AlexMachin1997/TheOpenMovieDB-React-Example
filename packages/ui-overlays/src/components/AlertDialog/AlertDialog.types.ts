import type * as React from 'react';

import type {
	IDialog,
	IDialogClose,
	IDialogContent,
	IDialogTrigger
} from '~/components/Dialog/Dialog.types';

/** Properties for the AlertDialog root component. Identical to `Dialog`'s. */
export interface IAlertDialog extends IDialog {}

/** Properties for AlertDialogTrigger. */
export interface IAlertDialogTrigger extends IDialogTrigger {}

/** Properties for AlertDialogClose. */
export interface IAlertDialogClose extends IDialogClose {}

/**
 * Properties for AlertDialogContent.
 *
 * Everything removed below is either guaranteed by this component or owned by the shared surface.
 * `className`, `id`, `style`, `data-*`, the `aria-*` trio and `onRequestClose` stay the caller's.
 */
export interface IAlertDialogContent
	extends Omit<
		IDialogContent,
		'title' | 'description' | 'footer' | 'showCloseButton' | 'icon' | 'role'
	> {
	/** The question. Names the overlay. */
	title: React.ReactNode;

	/** What happens if the user says yes. Describes the overlay. */
	description: React.ReactNode;

	/** The backing-out action. Takes initial focus and dismisses without an `AlertDialogClose`. */
	cancel: React.ReactNode;

	/** The destructive action. Placed, and nothing more — it does not dismiss. */
	confirm: React.ReactNode;
}
