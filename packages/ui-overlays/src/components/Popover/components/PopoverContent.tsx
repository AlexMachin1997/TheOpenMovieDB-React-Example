import * as React from 'react';
import { cn } from '@repo/tailwind-config';

import { OverlayCloseButton } from '~/components/Overlay/OverlayCloseButton';
import { usePopoverElement } from '~/components/Popover/hooks/usePopoverElement';
import { usePopoverRootContext } from '~/components/Popover/hooks/usePopoverRootContext';
import { getPopoverPosition } from '~/components/Popover/utils/popoverPosition';

import type { IPopoverContent } from '~/components/Popover/Popover.types';

export const PopoverContent = ({
	className,
	style,
	side = 'bottom',
	align = 'center',
	title,
	description,
	showCloseButton = false,
	children,
	onKeyDown,
	'aria-label': ariaLabel,
	'aria-labelledby': ariaLabelledBy,
	'aria-describedby': ariaDescribedBy,
	...props
}: IPopoverContent) => {
	const { open, setOpen, contentId, anchorName, triggerNode, isPressingTrigger } =
		usePopoverRootContext();

	const {
		popoverRef,
		present,
		dismiss,
		onKeyDown: onPopoverKeyDown
	} = usePopoverElement({
		open,
		setOpen,
		triggerNode,
		isPressingTrigger
	});

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
		<div
			{...props}
			ref={popoverRef}
			id={contentId}
			popover='auto'
			// Focusable but never tabbable, so a popover with nothing focusable inside still takes
			// focus on open rather than leaving it on the trigger.
			tabIndex={-1}
			data-slot='popover-content'
			role={isNamed ? 'group' : undefined}
			aria-label={ariaLabel}
			aria-labelledby={labelledBy}
			aria-describedby={describedBy}
			style={{ ...getPopoverPosition(anchorName, side, align), ...style }}
			className={cn(
				// `inset-auto m-0` undo the user-agent stylesheet, which centres a popover in the viewport
				// with `inset: 0; margin: auto` — positioning that would beat `position-area` outright.
				// `overflow-auto` for the last-resort positions in `Popover.css`, which size the popover to
				// the space beside its trigger and leave the rest to scroll.
				'bg-popover text-popover-foreground inset-auto m-0 w-72 overflow-auto rounded-md border p-4 shadow-md outline-hidden',
				// An opacity fade in both directions. `allow-discrete` on `display` and `overlay` keeps
				// the element showing, and in the top layer, until the fade has finished — including when
				// the browser closed it. `starting:` supplies the value it fades in from, since a hidden
				// popover has no previous style to leave.
				'opacity-0 transition-[opacity,display,overlay] transition-discrete duration-150 ease-out open:opacity-100 starting:open:opacity-0',
				// `open:` rather than a bare `flex`, which would beat the user-agent rule hiding a closed
				// popover and leave an empty box on the page.
				hasHeader && 'open:flex flex-col gap-4',
				className
			)}
			onKeyDown={(event) => {
				onKeyDown?.(event);
				onPopoverKeyDown(event);
			}}
		>
			{present ? (
				<>
					{hasHeader && (
						<div
							data-slot='popover-header'
							className={cn('flex flex-col gap-1', showCloseButton && 'pr-8')}
						>
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
					{showCloseButton ? (
						<OverlayCloseButton slot='popover' className='top-2 right-2' onClose={dismiss} />
					) : null}
				</>
			) : null}
		</div>
	);
};

PopoverContent.displayName = 'PopoverContent';
