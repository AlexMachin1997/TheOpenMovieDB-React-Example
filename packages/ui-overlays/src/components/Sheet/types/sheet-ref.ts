/**
 * @description Imperative handle for external control of the sheet component.
 * @see Sheet
 */
// The `I` prefix exists so a component's props can be named after the component without colliding
// with its export. This is an imperative handle rather than a prop interface, so the convention it
// encodes does not apply here.
// eslint-disable-next-line @typescript-eslint/naming-convention -- see above
interface SheetRef {
	open: () => void;
	close: () => void;
	toggle: () => void;
	isOpen: boolean;
}

export type { SheetRef };
