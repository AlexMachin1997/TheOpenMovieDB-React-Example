import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

type IDialog = React.ComponentProps<typeof DialogPrimitive.Root>;

export const Dialog = ({ ...props }: IDialog) => {
	return <DialogPrimitive.Root data-slot='dialog' {...props} />;
};
