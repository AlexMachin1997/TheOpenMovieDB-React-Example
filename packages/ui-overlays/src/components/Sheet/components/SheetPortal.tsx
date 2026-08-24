import type { ISheetPortal } from '~/components/Sheet/Sheet.types';

/**
 * @deprecated There is nothing left to portal. A native dialog element opened with showModal()
 * renders in the top layer, above every other element regardless of where it sits in the tree. Kept
 * as a pass-through so existing call sites keep working.
 */
export const SheetPortal = ({ children }: ISheetPortal) => {
	return <>{children}</>;
};

SheetPortal.displayName = 'SheetPortal';
