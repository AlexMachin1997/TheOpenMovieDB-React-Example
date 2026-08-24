import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Dialog } from '@repo/ui-overlays';
import { ICommandSearchConfig, IEmptyStateConfig } from '~/components/Command/types';

export interface ICommand extends React.ComponentProps<typeof CommandPrimitive> {
	className?: string;
}

// `ref` is dropped rather than forwarded: `Dialog` now exposes an imperative handle, and
// `CommandDialog` owns its own open state through `useCommandContext`, so a caller holding that
// handle could drive the two out of step.
export interface ICommandDialog extends Omit<React.ComponentProps<typeof Dialog>, 'ref'> {
	className?: string;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	/** Names the palette. Applied as `aria-label`, since the search input is the visible affordance. */
	title?: string;
	children?: React.ReactNode;
	showCloseButton?: boolean;
}

export interface ICommandSearch
	extends React.ComponentProps<typeof CommandPrimitive.Input>,
		ICommandSearchConfig {}

export interface ICommandInterface extends ICommand {
	children?: React.ReactNode;
	emptyState?: IEmptyStateConfig;
	searchConfig?: ICommandSearchConfig;
}

export interface ICommandEmpty extends React.ComponentProps<typeof CommandPrimitive.Empty> {
	className?: string;
	noOptionsMessage?: string;
	noSearchResultsMessage?: string;
	formatSearchTerm?: (searchTerm: string) => string;
}

export interface ICommandGroup extends React.ComponentProps<typeof CommandPrimitive.Group> {
	className?: string;
	heading?: string;
}

export interface ICommandItem extends React.ComponentProps<typeof CommandPrimitive.Item> {
	className?: string;
	disabled?: boolean;
	selected?: boolean;
	onSelect?: (value: string) => void;
}

export interface ICommandList extends React.ComponentProps<typeof CommandPrimitive.List> {
	className?: string;
}

export interface ICommandSeparator extends React.ComponentProps<typeof CommandPrimitive.Separator> {
	className?: string;
}

export interface ICommandShortcut extends React.ComponentProps<'span'> {
	className?: string;
}
