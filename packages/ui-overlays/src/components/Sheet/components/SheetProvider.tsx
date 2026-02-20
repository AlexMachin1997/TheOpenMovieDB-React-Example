import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';

import type { ISheet } from '~/components/Sheet/Sheet.types';

export const Sheet = ({ ref, ...props }: ISheet) => {
	const [isOpen, setIsOpen] = React.useState(false);

	React.useImperativeHandle(
		ref,
		() => ({
			open: () => setIsOpen(true),
			close: () => setIsOpen(false),
			toggle: () => setIsOpen((prev) => !prev),
			get isOpen() {
				return isOpen;
			}
		}),
		[isOpen]
	);

	const isControlled = props.open !== undefined;
	const open = isControlled ? props.open : isOpen;
	const onOpenChange = isControlled ? props.onOpenChange : setIsOpen;

	return (
		<SheetPrimitive.Root data-slot='sheet' open={open} onOpenChange={onOpenChange} {...props} />
	);
};

Sheet.displayName = 'Sheet';
