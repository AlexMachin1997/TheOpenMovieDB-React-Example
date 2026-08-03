import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';

import type { ISheet } from '~/components/Sheet/Sheet.types';

export const Sheet = ({ ref, ...props }: ISheet) => {
	const [isOpen, setIsOpen] = React.useState(false);

	const isControlled = props.open !== undefined;
	const open = isControlled ? props.open : isOpen;
	const onOpenChange = isControlled ? props.onOpenChange : setIsOpen;

	// The ref API must go through `onOpenChange` (not raw `setIsOpen`) so it still works when
	// the Sheet is controlled — otherwise open()/close()/toggle() would update dead internal
	// state that the controlled render never reads.
	React.useImperativeHandle(
		ref,
		() => ({
			open: () => onOpenChange?.(true),
			close: () => onOpenChange?.(false),
			toggle: () => onOpenChange?.(!open),
			get isOpen() {
				return open ?? false;
			}
		}),
		[open, onOpenChange]
	);

	return (
		<SheetPrimitive.Root data-slot='sheet' open={open} onOpenChange={onOpenChange} {...props} />
	);
};

Sheet.displayName = 'Sheet';
