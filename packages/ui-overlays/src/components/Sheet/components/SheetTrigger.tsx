import * as SheetPrimitive from '@radix-ui/react-dialog';

import type { ISheetTrigger } from '~/components/Sheet/Sheet.types';

export const SheetTrigger = ({ ...props }: ISheetTrigger) => {
	return <SheetPrimitive.Trigger data-slot='sheet-trigger' {...props} />;
};
