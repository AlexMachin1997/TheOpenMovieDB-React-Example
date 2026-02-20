import * as React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

/** Properties for the HoverCard root. */
export interface IHoverCard extends React.ComponentProps<typeof HoverCardPrimitive.Root> {}

/** Properties for HoverCardTrigger. */
export interface IHoverCardTrigger
	extends React.ComponentProps<typeof HoverCardPrimitive.Trigger> {}

/** Properties for HoverCardContent. */
export interface IHoverCardContent
	extends React.ComponentProps<typeof HoverCardPrimitive.Content> {}
