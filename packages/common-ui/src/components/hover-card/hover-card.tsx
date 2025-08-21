import * as React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

import { cn } from '~/utils/className';

const HoverCard = ({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Root>) => {
	return <HoverCardPrimitive.Root data-slot='hover-card' {...props} />;
};

const HoverCardTrigger = ({
	...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) => {
	return <HoverCardPrimitive.Trigger data-slot='hover-card-trigger' {...props} />;
};

const HoverCardContent = ({
	className,
	align = 'center',
	sideOffset = 4,
	...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) => {
	return (
		<HoverCardPrimitive.Portal data-slot='hover-card-portal'>
			<HoverCardPrimitive.Content
				data-slot='hover-card-content'
				align={align}
				sideOffset={sideOffset}
				className={cn(
					'group/content',
					'bg-popover text-popover-foreground border',
					'[--hover-card-bg:theme(colors.popover)] [--hover-card-border:theme(colors.border)]',
					'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
					'overflow-visible z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md shadow-md outline-none',
					className
				)}
				{...props}
			>
				<div className='p-4'>{props.children}</div>
				<HoverCardPrimitive.Arrow asChild>
					<svg width='12' height='8' viewBox='0 0 12 8' xmlns='http://www.w3.org/2000/svg'>
						<polygon points='0,0 12,0 6,8' className='fill-[var(--hover-card-bg)]' stroke='none' />

						<line
							x1='0'
							y1='0'
							x2='6'
							y2='8'
							className='stroke-[var(--hover-card-border)]'
							stroke='none'
						/>

						<line
							x1='12'
							y1='0'
							x2='6'
							y2='8'
							className='stroke-[var(--hover-card-border)]'
							stroke='none'
						/>
					</svg>
				</HoverCardPrimitive.Arrow>
			</HoverCardPrimitive.Content>
		</HoverCardPrimitive.Portal>
	);
};

export { HoverCard, HoverCardTrigger, HoverCardContent };
