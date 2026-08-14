import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';

import type { ISheet } from '~/components/Sheet/Sheet.types';

export const Sheet = ({
	ref,
	open: openProp,
	onOpenChange: onOpenChangeProp,
	...props
}: ISheet) => {
	const [isOpen, setIsOpen] = React.useState(false);

	const isControlled = openProp !== undefined;
	const open = isControlled ? openProp : isOpen;

	// Uncontrolled has to do both: move the internal state the render actually reads, *and* notify
	// the caller. Branching to one or the other drops whichever the caller did not expect —
	// previously `{...props}` was spread after `onOpenChange`, which reinstated the caller's handler
	// and left `setIsOpen` unreachable, so an uncontrolled Sheet with an `onOpenChange` prop never
	// opened at all.
	const onOpenChange = React.useCallback(
		(next: boolean) => {
			if (!isControlled) {
				setIsOpen(next);
			}

			onOpenChangeProp?.(next);
		},
		[isControlled, onOpenChangeProp]
	);

	// The ref API must go through `onOpenChange` (not raw `setIsOpen`) so it still works when
	// the Sheet is controlled — otherwise open()/close()/toggle() would update dead internal
	// state that the controlled render never reads.
	React.useImperativeHandle(
		ref,
		() => ({
			open: () => onOpenChange(true),
			close: () => onOpenChange(false),
			toggle: () => onOpenChange(!open),
			get isOpen() {
				return open ?? false;
			}
		}),
		[open, onOpenChange]
	);

	// `open` and `onOpenChange` go after the spread deliberately: they are the computed values, and
	// the raw props they derive from must not overwrite them.
	return (
		<SheetPrimitive.Root data-slot='sheet' {...props} open={open} onOpenChange={onOpenChange} />
	);
};

Sheet.displayName = 'Sheet';
