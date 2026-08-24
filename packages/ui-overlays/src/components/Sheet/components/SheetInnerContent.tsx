import { cn } from '@repo/tailwind-config';

import type { ISheetInnerContent } from '~/components/Sheet/Sheet.types';

export const SheetInnerContent = ({ className, children, ...props }: ISheetInnerContent) => {
	return (
		<div
			// A scrolling region a keyboard user cannot reach is a scrolling region they cannot
			// scroll: arrow keys move the focused element's scroll container, and without a tab stop
			// there is nothing focused inside a long sheet body. This costs a tab stop on every sheet
			// that has one, which is the trade the rule is asking for.
			tabIndex={0}
			className={cn('flex-1 overflow-y-auto p-6', className)}
			{...props}
		>
			{children}
		</div>
	);
};

SheetInnerContent.displayName = 'SheetInnerContent';
