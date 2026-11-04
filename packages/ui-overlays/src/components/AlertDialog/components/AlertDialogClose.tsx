import { DialogClose } from '~/components/Dialog/components/DialogClose';

import type { IAlertDialogClose } from '~/components/AlertDialog/AlertDialog.types';

/**
 * Dismisses the alert dialog, through `onRequestClose` so a caller can still refuse the close.
 *
 * The cancelling action does not need wrapping — `AlertDialogContent` does that itself, which is
 * requirement 5. This is for the confirming action once its work is done, or for a dismissing
 * control inside the body.
 */
export const AlertDialogClose = (props: IAlertDialogClose) => {
	return <DialogClose data-slot='alert-dialog-close' {...props} />;
};

AlertDialogClose.displayName = 'AlertDialogClose';
