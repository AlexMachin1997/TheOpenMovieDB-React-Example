import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@repo/tailwind-config';

import { useOverlayContainer } from '~/components/Overlay/hooks/useOverlayContainer';

import type { IPopoverContent } from '~/components/Popover/Popover.types';

export const PopoverContent = ({
	className,
	align = 'center',
	sideOffset = 4,
	title,
	description,
	children,
	'aria-label': ariaLabel,
	'aria-labelledby': ariaLabelledBy,
	'aria-describedby': ariaDescribedBy,
	...props
}: IPopoverContent) => {
	// Inside a modal, `document.body` is behind the top layer and inert, so a popover portalled
	// there is both invisible and unclickable. This puts it inside the dialog instead. Outside a
	// modal the container is undefined and Radix falls back to the body, unchanged.
	const container = useOverlayContainer();

	const titleId = React.useId();
	const descriptionId = React.useId();

	const hasTitle = title !== undefined;
	const hasDescription = description !== undefined;
	const hasHeader = hasTitle || hasDescription;

	// Ranked as `Dialog` ranks them: a caller who writes ARIA by hand beats what the component would
	// have generated.
	const labelledBy = ariaLabelledBy ?? (ariaLabel || !hasTitle ? undefined : titleId);
	const describedBy = ariaDescribedBy ?? (hasDescription ? descriptionId : undefined);

	// The role follows the name. Tab moves out of a popover, so it is not a dialog and must not claim
	// to be one; `group` carries a name with no keyboard contract attached. An unnamed group is skipped
	// by screen readers, so an unnamed popover claims nothing and is announced as its contents.
	const isNamed = Boolean(labelledBy || ariaLabel);

	return (
		<PopoverPrimitive.Portal container={container}>
			<PopoverPrimitive.Content
				data-slot='popover-content'
				align={align}
				sideOffset={sideOffset}
				className={cn(
					'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden',
					hasHeader && 'flex flex-col gap-4',
					className
				)}
				{...props}
				// Present even when undefined: Radix defaults `role` to "dialog", and only a key that
				// exists overrides it.
				role={isNamed ? 'group' : undefined}
				aria-label={ariaLabel}
				aria-labelledby={labelledBy}
				aria-describedby={describedBy}
			>
				{hasHeader && (
					<div data-slot='popover-header' className='flex flex-col gap-1'>
						{hasTitle && (
							<div id={titleId} data-slot='popover-title' className='leading-none font-medium'>
								{title}
							</div>
						)}
						{hasDescription && (
							<p
								id={descriptionId}
								data-slot='popover-description'
								className='text-muted-foreground text-sm'
							>
								{description}
							</p>
						)}
					</div>
				)}
				{children}
			</PopoverPrimitive.Content>
		</PopoverPrimitive.Portal>
	);
};
