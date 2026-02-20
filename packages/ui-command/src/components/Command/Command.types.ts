import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Dialog } from '@repo/ui-overlays';
import { ICommandSearchConfig, IEmptyStateConfig } from '~/components/Command/types';

export interface ICommand extends React.ComponentProps<typeof CommandPrimitive> {
	className?: string;
}

export interface ICommandDialog extends React.ComponentProps<typeof Dialog> {
	className?: string;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	title?: string;
	description?: string;
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
