import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';

type SheetTriggerProps = React.ComponentProps<typeof SheetPrimitive.Trigger>;

export const SheetTrigger = ({ ...props }: SheetTriggerProps) => {
	return <SheetPrimitive.Trigger data-slot='sheet-trigger' {...props} />;
};
