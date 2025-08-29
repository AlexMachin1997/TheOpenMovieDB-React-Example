import { createContext } from 'react';

export interface CommandContextValue {
	open: boolean;
	searchValue: string;
	items: unknown[];
	setItems: (items: unknown[]) => void;
	closeOnSelect?: boolean;
	close: () => void;
	openMenu: () => void;
	toggle: () => void;
	setOpen: (open: boolean) => void;
	onSearchChange: (value: string) => void;
}

export const CommandContext = createContext<CommandContextValue | null>(null);
