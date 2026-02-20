import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cn } from '@repo/tailwind-config';

import type { ISheetClose } from '~/components/Sheet/Sheet.types';

export const SheetClose = ({ ...props }: ISheetClose) => {
	return (
		<SheetPrimitive.Close
			data-slot='sheet-close'
			className={cn('cursor-pointer', props.className)}
			tabIndex={0}
			{...props}
		/>
	);
};
