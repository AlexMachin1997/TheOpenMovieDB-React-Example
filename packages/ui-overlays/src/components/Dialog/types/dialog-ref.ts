// The `I` prefix exists so a component's props can be named after the component without colliding
// with its export. This is an imperative handle rather than a prop interface, so the convention it
// encodes does not apply here.
/**
 * @description Imperative handle for external control of the dialog component.
 * @see Dialog
 */
export type { OverlayRef as DialogRef } from '~/components/Overlay/types/overlay-ref';
