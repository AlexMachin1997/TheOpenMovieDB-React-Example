import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

type IDialogPortal = React.ComponentProps<typeof DialogPrimitive.Portal>;

export const DialogPortal = ({ ...props }: IDialogPortal) => {
	return <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />;
};
