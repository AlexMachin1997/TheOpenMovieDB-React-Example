import * as React from 'react';

import { useControllableOpen } from '~/components/Overlay/hooks/useControllableOpen';
import { PopoverRootContext } from '~/components/Popover/contexts/popover-root-context';
import { toAnchorName } from '~/components/Popover/utils/toAnchorName';

import type { IPopover } from '~/components/Popover/Popover.types';

export const PopoverProvider = ({
	open: openProp,
	defaultOpen,
	onOpenChange,
	children
}: IPopover) => {
	const { open, setOpen } = useControllableOpen({
		open: openProp,
		defaultOpen,
		onOpenChange
	});

	// One id serves both: the content's `id`, and, made CSS-safe, the anchor both parts name. Neither
	// is the caller's to supply, so two popovers cannot collide on either.
	const id = React.useId();

	// State, not a ref: the content re-renders when the trigger arrives, which it needs in order to
	// show itself with the trigger as its source.
	const [triggerNode, setTriggerNode] = React.useState<HTMLElement | null>(null);

	const pressingTrigger = React.useRef(false);

	const setPressingTrigger = React.useCallback((pressing: boolean) => {
		pressingTrigger.current = pressing;
	}, []);

	const isPressingTrigger = React.useCallback(() => pressingTrigger.current, []);

	const context = React.useMemo(
		() => ({
			open,
			setOpen,
			contentId: id,
			anchorName: toAnchorName(id),
			triggerNode,
			setTriggerNode,
			setPressingTrigger,
			isPressingTrigger
		}),
		[open, setOpen, id, triggerNode, setPressingTrigger, isPressingTrigger]
	);

	return <PopoverRootContext.Provider value={context}>{children}</PopoverRootContext.Provider>;
};

PopoverProvider.displayName = 'Popover';
