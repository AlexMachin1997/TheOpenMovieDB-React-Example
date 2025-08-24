import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';

type SheetProps = React.ComponentProps<typeof SheetPrimitive.Root> & {
	ref?: React.RefObject<SheetRef | undefined>;
};

export interface SheetRef {
	open: () => void;
	close: () => void;
	toggle: () => void;
	isOpen: boolean;
}

export const Sheet = ({ ref, ...props }: SheetProps) => {
	const [isOpen, setIsOpen] = React.useState(false);

	// Create imperative handle for external control
	React.useImperativeHandle(
		ref,
		() => ({
			open: () => setIsOpen(true),
			close: () => setIsOpen(false),
			toggle: () => setIsOpen((prev) => !prev),
			get isOpen() {
				return isOpen;
			}
		}),
		[isOpen]
	);

	// Handle controlled vs uncontrolled state
	const isControlled = props.open !== undefined;
	const open = isControlled ? props.open : isOpen;
	const onOpenChange = isControlled ? props.onOpenChange : setIsOpen;

	return (
		<SheetPrimitive.Root data-slot='sheet' open={open} onOpenChange={onOpenChange} {...props} />
	);
};

Sheet.displayName = 'Sheet';
