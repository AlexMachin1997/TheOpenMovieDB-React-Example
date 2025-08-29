export interface CommandProviderProps {
	children: React.ReactNode;
	items: unknown[];
	setItems: (items: unknown[]) => void;
	open: boolean;
	setOpen: (open: boolean) => void;
	closeOnSelect?: boolean;
	defaultSearchValue?: string;
}
