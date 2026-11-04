import type * as React from 'react';

import type {
	IDialog,
	IDialogClose,
	IDialogContent,
	IDialogTrigger
} from '~/components/Dialog/Dialog.types';

/**
 * Properties for the AlertDialog root component.
 *
 * Identical to `Dialog`'s. An alert dialog differs in what its content guarantees, not in how its
 * open state is driven, so the controlled prop, the uncontrolled default and the imperative handle
 * are the same three things under the same names.
 */
export interface IAlertDialog extends IDialog {}

/** Properties for AlertDialogTrigger. The same button as `DialogTrigger`. */
export interface IAlertDialogTrigger extends IDialogTrigger {}

/**
 * Properties for AlertDialogClose.
 *
 * The cancelling action does not need this — `AlertDialogContent` wires it up — so this is for a
 * dismissing control somewhere else in the body.
 */
export interface IAlertDialogClose extends IDialogClose {}

/**
 * Properties for AlertDialogContent.
 *
 * `DialogContent`'s props, minus everything an alert dialog is not allowed to vary, plus the two
 * actions it always has. `role` is gone because it is always `alertdialog`; `showCloseButton` and
 * `icon` are gone because there is no close button to show or re-icon; `footer` is gone because the
 * two action slots replace it.
 */
export interface IAlertDialogContent
	extends Omit<
		IDialogContent,
		'title' | 'description' | 'footer' | 'showCloseButton' | 'icon' | 'role'
	> {
	/**
	 * The question. Required, and it names the overlay — the APG `alertdialog` pattern has no
	 * unnamed case.
	 */
	title: React.ReactNode;

	/**
	 * What happens if the user says yes. Required, because the APG pattern requires an alert dialog
	 * be described, and the message *is* the description.
	 *
	 * A required prop is satisfied by `null` or `''`, which produces an `aria-describedby` pointing
	 * at an empty paragraph. The type cannot catch that; supply real prose.
	 */
	description: React.ReactNode;

	/**
	 * The backing-out action, as a node — usually a `Button`.
	 *
	 * Naming the slot is what buys the two behaviours in requirement 5: this is the action focus
	 * lands on when the dialog opens, so a reflexive Enter backs out rather than destroys, and it
	 * dismisses the dialog without being wrapped in `AlertDialogClose`.
	 */
	cancel: React.ReactNode;

	/**
	 * The destructive action, as a node — usually a `Button`.
	 *
	 * Yours entirely: the component places it and nothing else. It does not dismiss the dialog, so
	 * wrap it in `AlertDialogClose`, or close the overlay from its `onClick`, once the work is done.
	 */
	confirm: React.ReactNode;
}
