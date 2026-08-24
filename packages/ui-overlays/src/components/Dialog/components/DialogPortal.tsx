import type { IDialogPortal } from '~/components/Dialog/Dialog.types';

/**
 * @deprecated There is nothing left to portal. A native `<dialog>` opened with `showModal()` renders
 * in the top layer, above every other element regardless of where it sits in the tree. Kept as a
 * pass-through so existing call sites keep working.
 */
export const DialogPortal = ({ children }: IDialogPortal) => {
	return <>{children}</>;
};

DialogPortal.displayName = 'DialogPortal';
