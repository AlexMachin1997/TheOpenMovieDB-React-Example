import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';

type SheetProps = React.ComponentProps<typeof SheetPrimitive.Root>;

export const Sheet = ({ ...props }: SheetProps) => {
	return <SheetPrimitive.Root data-slot='sheet' {...props} />;
};
