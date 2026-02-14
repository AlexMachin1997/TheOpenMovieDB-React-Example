/**
 * @description Imperative handle for external control of the sheet component.
 * @see SheetProvider
 */
interface SheetRef {
	open: () => void;
	close: () => void;
	toggle: () => void;
	isOpen: boolean;
}

export type { SheetRef };
