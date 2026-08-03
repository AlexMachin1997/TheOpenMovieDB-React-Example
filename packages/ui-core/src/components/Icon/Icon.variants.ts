import { cva } from 'class-variance-authority';

/**
 * The icon size scale.
 *
 * Defined independently of Button's size scale: Button forces `size-4` on any child svg at
 * every one of its own sizes, so there is no per-button-size icon scale to mirror.
 *
 * Sizes smaller than `xs` (e.g. the 8px filled dot used by Radio and DropdownMenu's radio
 * item) are intentionally not tokens — they're one-off treatments, handled via `className`.
 */
export const iconVariants = cva('shrink-0', {
	variants: {
		size: {
			xs: 'size-3',
			sm: 'size-3.5',
			md: 'size-4',
			lg: 'size-5',
			xl: 'size-6'
		}
	},
	defaultVariants: {
		size: 'md'
	}
});
