import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@repo/tailwind-config';
import { labelVariants } from '~/components/Label/Label.variants';
import type { ILabel } from '~/components/Label/Label.types';

const Label = ({
	className,
	nativeLabel = true,
	emphasis = true,
	required = false,
	children,
	...props
}: ILabel) => {
	const classes = cn(labelVariants({ emphasis }), className);

	const content = (
		<>
			{children}

			{required && (
				<>
					{/* The symbol carries the requirement visually; the control's own
					`required`/`aria-required` carries it to assistive technology. Hiding the symbol
					stops screen readers announcing "Email star", and the `sr-only` text covers the
					case where a caller forgot to mark the control itself. */}
					<span aria-hidden='true' className='text-destructive'>
						*
					</span>
					<span className='sr-only'>(required)</span>
				</>
			)}
		</>
	);

	// Destructuring has already consumed `nativeLabel`, so TypeScript can no longer use it to narrow
	// the props union — hence the assertion in each branch. The discriminant is still what decides
	// which element renders; only the compiler's view of `props` needs the nudge.
	if (!nativeLabel) {
		return (
			<span
				data-slot='label'
				className={classes}
				{...(props as React.ComponentProps<'span'>)}
			>
				{content}
			</span>
		);
	}

	// Deliberately not `LabelPrimitive.Root` in non-native mode: Radix's Root adds a `mousedown`
	// guard against double-click text selection, which is behaviour for something that focuses a
	// control on click. A group heading focuses nothing.
	return (
		<LabelPrimitive.Root
			data-slot='label'
			className={classes}
			{...(props as React.ComponentProps<typeof LabelPrimitive.Root>)}
		>
			{content}
		</LabelPrimitive.Root>
	);
};

export { Label };
