import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '~/utils/className';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '~/components/dialog/dialog';
import { CommandSearch } from './command-search';

const Command = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) => {
	return (
		<CommandPrimitive
			data-slot='command'
			className={cn(
				'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
				className
			)}
			{...props}
		/>
	);
};

type CommandDialogProps = React.ComponentProps<typeof Dialog> & {
	title?: string;
	description?: string;
	className?: string;
	showCloseButton?: boolean;
};

const CommandDialog = ({
	title = 'Command Palette',
	description = 'Search for a command to run...',
	children,
	className,
	showCloseButton = true,
	...props
}: CommandDialogProps) => {
	return (
		<Dialog {...props}>
			<DialogHeader className='sr-only'>
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description}</DialogDescription>
			</DialogHeader>
			<DialogContent
				className={cn('overflow-hidden p-0', className)}
				showCloseButton={showCloseButton}
			>
				<Command className='[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'>
					{children}
				</Command>
			</DialogContent>
		</Dialog>
	);
};

type CommandListProps = React.ComponentProps<typeof CommandPrimitive.List> & {
	className?: string;
};

const CommandList = ({ className, ...props }: CommandListProps) => {
	return (
		<CommandPrimitive.List
			data-slot='command-list'
			className={cn('max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto', className)}
			{...props}
		/>
	);
};

type CommandEmptyProps = React.ComponentProps<typeof CommandPrimitive.Empty> & {
	className?: string;
};

const CommandEmpty = ({ className, ...props }: CommandEmptyProps) => {
	return (
		<CommandPrimitive.Empty
			data-slot='command-empty'
			className='py-6 text-center text-sm'
			{...props}
		/>
	);
};

type CommandGroupProps = React.ComponentProps<typeof CommandPrimitive.Group> & {
	className?: string;
};

const CommandGroup = ({ className, ...props }: CommandGroupProps) => {
	return (
		<CommandPrimitive.Group
			data-slot='command-group'
			className={cn(
				'text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
				className
			)}
			{...props}
		/>
	);
};

type CommandSeparatorProps = React.ComponentProps<typeof CommandPrimitive.Separator> & {
	className?: string;
};

const CommandSeparator = ({ className, ...props }: CommandSeparatorProps) => {
	return (
		<CommandPrimitive.Separator
			data-slot='command-separator'
			className={cn('bg-border -mx-1 h-px', className)}
			{...props}
		/>
	);
};

type CommandItemProps = React.ComponentProps<typeof CommandPrimitive.Item> & {
	className?: string;
};

const CommandItem = ({ className, ...props }: CommandItemProps) => {
	return (
		<CommandPrimitive.Item
			data-slot='command-item'
			className={cn(
				"data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		/>
	);
};

type CommandShortcutProps = React.ComponentProps<'span'> & {
	className?: string;
};

const CommandShortcut = ({ className, ...props }: CommandShortcutProps) => {
	return (
		<span
			data-slot='command-shortcut'
			className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
			{...props}
		/>
	);
};

export {
	Command,
	CommandDialog,
	CommandSearch as CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandShortcut,
	CommandSeparator
};
