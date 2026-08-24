import * as React from 'react';

import { OverlayRootContext } from '~/components/Overlay/contexts/overlay-root-context';
import { useControllableOpen } from '~/components/Overlay/hooks/useControllableOpen';

import type { ISheet } from '~/components/Sheet/Sheet.types';

export const Sheet = ({ ref, open: openProp, defaultOpen, onOpenChange, children }: ISheet) => {
	const { open, setOpen } = useControllableOpen({ open: openProp, defaultOpen, onOpenChange });

	// The handle goes through `setOpen`, never raw state. Driving internal state directly would make
	// open() and close() no-ops on a controlled Sheet, whose render never reads it.
	React.useImperativeHandle(
		ref,
		() => ({
			open: () => setOpen(true),
			close: () => setOpen(false),
			toggle: () => setOpen(!open),
			isOpen: open
		}),
		[open, setOpen]
	);

	const context = React.useMemo(() => ({ open, setOpen, slot: 'sheet' }), [open, setOpen]);

	return <OverlayRootContext.Provider value={context}>{children}</OverlayRootContext.Provider>;
};

Sheet.displayName = 'Sheet';
