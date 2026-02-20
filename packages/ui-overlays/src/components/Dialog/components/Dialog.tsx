import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { IDialog } from '~/components/Dialog/Dialog.types';

export const Dialog = ({ ...props }: IDialog) => {
	return <DialogPrimitive.Root data-slot='dialog' {...props} />;
};
