import type * as React from 'react';

export interface UseRovingTabIndexOptions {
	/** How many items the group contains. */
	itemCount: number;

	/**
	 * Whether the item at `index` is disabled. Disabled items are never focused and are skipped by
	 * arrow navigation.
	 */
	isItemDisabled?: (index: number) => boolean;

	/**
	 * Whether the item at `index` is selected. Used only to decide which item owns the tab stop
	 * before anything has been focused — tabbing into a group should land on the current selection.
	 */
	isItemChecked?: (index: number) => boolean;

	/**
	 * Whether arrow navigation wraps around at the ends.
	 *
	 * @default true
	 */
	loop?: boolean;

	/** Disables navigation for the whole group. */
	disabled?: boolean;
}

/** The props to spread onto each item in the group. */
export interface RovingTabIndexItemProps {
	/** `0` for the single item that owns the group's tab stop, `-1` for every other. */
	tabIndex: 0 | -1;
	onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
	onFocus: () => void;
	ref: (node: HTMLElement | null) => void;
}

export interface UseRovingTabIndexResult {
	/** The index that currently owns the tab stop, or `-1` when every item is disabled. */
	tabStopIndex: number;

	/** Props for the item at `index`. */
	getItemProps: (index: number) => RovingTabIndexItemProps;
}
