import { cva } from 'class-variance-authority';

export const searchWrapperVariants = cva('flex items-center gap-2 border-b px-3');

export const searchClearButtonVariants = cva(
	'data-slot="search-clear-button" p-0 hover:bg-transparent rounded px-1 aria-disabled:opacity-50',
	{
		variants: {
			visible: {
				true: 'flex',
				false: 'hidden'
			}
		},
		defaultVariants: {
			visible: false
		}
	}
);

export const searchDebouncableInputVariants = cva('border-none px-0 py-3 shadow-none focus-visible:ring-0');
