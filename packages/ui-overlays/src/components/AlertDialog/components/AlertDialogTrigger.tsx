import { DialogTrigger } from '~/components/Dialog/components/DialogTrigger';

import type { IAlertDialogTrigger } from '~/components/AlertDialog/AlertDialog.types';

/**
 * Opens the alert dialog. The same button `DialogTrigger` renders, under its own `data-slot`.
 *
 * `aria-haspopup='dialog'` is right here even though the surface is an `alertdialog`: `dialog` is
 * the only popup value ARIA defines for either.
 */
export const AlertDialogTrigger = (props: IAlertDialogTrigger) => {
	return <DialogTrigger data-slot='alert-dialog-trigger' {...props} />;
};

AlertDialogTrigger.displayName = 'AlertDialogTrigger';
