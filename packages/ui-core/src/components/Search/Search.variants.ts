import { cva } from 'class-variance-authority';

export const searchWrapperVariants = cva('flex items-center gap-2 border-b px-3');

export const searchClearButtonVariants = cva(
	'p-0 hover:bg-transparent rounded px-1 aria-disabled:opacity-50',
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

// `DebouncableInput` renders `Input`, which brings a border, shadow, focus ring, `h-9` and
// `text-base md:text-sm`. Search supplies its own chrome via `searchWrapperVariants` (the `border-b`
// wrapper), so all of that is stripped here. `h-10` and `text-sm` are not new styling — they hold
// Search's rendered box exactly where it was before `DebouncableInput` started composing `Input`.
export const searchDebouncableInputVariants = cva(
	'h-10 border-none px-0 py-3 text-sm shadow-none focus-visible:ring-0'
);
