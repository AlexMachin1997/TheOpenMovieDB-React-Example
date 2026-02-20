import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

/** Properties for the DropdownMenu root. */
export interface IDropdownMenu extends React.ComponentProps<typeof DropdownMenuPrimitive.Root> {}

/** Properties for DropdownMenuPortal. */
export interface IDropdownMenuPortal
	extends React.ComponentProps<typeof DropdownMenuPrimitive.Portal> {}

/** Properties for DropdownMenuTrigger. */
export interface IDropdownMenuTrigger
	extends React.ComponentProps<typeof DropdownMenuPrimitive.Trigger> {}

/** Properties for DropdownMenuContent. */
export interface IDropdownMenuContent
	extends React.ComponentProps<typeof DropdownMenuPrimitive.Content> {}

/** Properties for DropdownMenuGroup. */
export interface IDropdownMenuGroup
	extends React.ComponentProps<typeof DropdownMenuPrimitive.Group> {}

/** Properties for DropdownMenuItem. */
export interface IDropdownMenuItem extends React.ComponentProps<typeof DropdownMenuPrimitive.Item> {
	/** When true, adds left padding for alignment with icons. */
	inset?: boolean;
	/** Visual variant of the menu item. */
	variant?: 'default' | 'destructive';
}

/** Properties for DropdownMenuCheckboxItem. */
export interface IDropdownMenuCheckboxItem
	extends React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> {}

/** Properties for DropdownMenuRadioGroup. */
export interface IDropdownMenuRadioGroup
	extends React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup> {}

/** Properties for DropdownMenuRadioItem. */
export interface IDropdownMenuRadioItem
	extends React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> {}

/** Properties for DropdownMenuLabel. */
export interface IDropdownMenuLabel
	extends React.ComponentProps<typeof DropdownMenuPrimitive.Label> {
	inset?: boolean;
}

/** Properties for DropdownMenuSeparator. */
export interface IDropdownMenuSeparator
	extends React.ComponentProps<typeof DropdownMenuPrimitive.Separator> {}

/** Properties for DropdownMenuShortcut (plain span). */
export interface IDropdownMenuShortcut extends React.ComponentProps<'span'> {}

/** Properties for DropdownMenuSub. */
export interface IDropdownMenuSub extends React.ComponentProps<typeof DropdownMenuPrimitive.Sub> {}

/** Properties for DropdownMenuSubTrigger. */
export interface IDropdownMenuSubTrigger
	extends React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> {
	inset?: boolean;
}

/** Properties for DropdownMenuSubContent. */
export interface IDropdownMenuSubContent
	extends React.ComponentProps<typeof DropdownMenuPrimitive.SubContent> {}
