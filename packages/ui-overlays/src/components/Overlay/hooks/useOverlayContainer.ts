import { use } from 'react';
import { OverlayContainerContext } from '~/components/Overlay/contexts/overlay-container-context';

/**
 * The element an anchored overlay should portal into, or `undefined` when there is no modal above
 * it — which is the shape Radix's `Portal` wants, since `undefined` means `document.body`.
 */
export const useOverlayContainer = () => use(OverlayContainerContext) ?? undefined;
