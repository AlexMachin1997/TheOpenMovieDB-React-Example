import { use } from 'react';
import { OverlayContentContext } from '~/components/Overlay/contexts/overlay-content-context';

/**
 * Read the surface a part is rendered inside, or `null` when there is none.
 *
 * Nullable on purpose, unlike `useOverlayRootContext`. A title or close part rendered outside a
 * content component is unusual but not broken, and it must still render rather than crash the tree.
 */
export const useOverlayContentContext = () => use(OverlayContentContext);
