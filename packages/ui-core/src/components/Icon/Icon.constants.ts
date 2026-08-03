/**
 * The Iconify collection icons are resolved from.
 *
 * `lucide` is Iconify's mirror of the same upstream icon data the `lucide-react` package
 * shipped, so icons migrated onto this component are visually identical to what they replaced.
 * Callers never write this prefix — they pass a bare `name` (e.g. `'search'`) and `Icon`
 * builds the full `lucide:search` identifier internally.
 */
export const ICON_COLLECTION = 'lucide';

/**
 * Every icon name `Icon` can render.
 *
 * Declared `as const` so it serves as both the runtime list (Storybook controls, the showcase
 * story) and the source of the compile-time {@link IconName} union — one edit updates both.
 *
 * Five of these are Iconify *aliases* rather than canonical names, kept because they match the
 * `lucide-react` exports they replaced and read more naturally at the call site. Iconify
 * resolves them transparently:
 *
 * - `alert-triangle`  → `triangle-alert`
 * - `check-circle`    → `circle-check-big`
 * - `home`            → `house`
 * - `more-horizontal` → `ellipsis`
 * - `x-circle`        → `circle-x`
 *
 * To add an icon, confirm it exists in the collection first:
 * `https://icon-sets.iconify.design/lucide/<name>/`
 */
export const ICON_NAMES = [
	'alert-triangle',
	'bot',
	'calendar',
	'check',
	'check-circle',
	'chevron-down',
	'chevron-left',
	'chevron-right',
	'chevrons-up-down',
	'circle',
	'credit-card',
	'file-text',
	'git-fork',
	'heart',
	'home',
	'info',
	'keyboard',
	'loader-circle',
	'log-out',
	'monitor',
	'moon',
	'more-horizontal',
	'search',
	'settings',
	'star',
	'sun',
	'user',
	'x',
	'x-circle'
] as const;

/**
 * The set of icon names `Icon` accepts.
 *
 * An unrecognised name is a TypeScript error at the call site — there is no runtime fallback
 * for an invalid name, by design.
 */
export type IconName = (typeof ICON_NAMES)[number];
