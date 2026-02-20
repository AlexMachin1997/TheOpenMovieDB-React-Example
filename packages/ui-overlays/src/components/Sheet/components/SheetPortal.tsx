import * as SheetPrimitive from '@radix-ui/react-dialog';

import type { ISheetPortal } from '~/components/Sheet/Sheet.types';

export const SheetPortal = ({ ...props }: ISheetPortal) => {
	return <SheetPrimitive.Portal data-slot='sheet-portal' {...props} />;
};
