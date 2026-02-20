import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { IDialogPortal } from '~/components/Dialog/Dialog.types';

export const DialogPortal = ({ ...props }: IDialogPortal) => {
	return <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />;
};
