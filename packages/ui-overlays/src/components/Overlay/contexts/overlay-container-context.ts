import * as React from 'react';

/**
 * Internal. The `<dialog>` node an anchored overlay should portal into, or `null` outside a modal.
 *
 * A modal `<dialog>` renders in the top layer and makes everything outside it inert, so a `Popover`,
 * `DropdownMenu` or `HoverCard` portaled to `document.body` while one is open is painted behind it
 * *and* unreachable by mouse or keyboard. Portalling into the dialog puts the content inside both
 * boundaries.
 *
 * It holds the dialog element rather than the panel deliberately: the panel is where a caller's
 * `overflow-hidden` lands, so an anchored surface parented to it would be clipped.
 */
export const OverlayContainerContext = React.createContext<HTMLElement | null>(null);
