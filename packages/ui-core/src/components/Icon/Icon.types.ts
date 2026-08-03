import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { iconVariants } from '~/components/Icon/Icon.variants';
import type { IconName } from '~/components/Icon/Icon.constants';

type IconVariants = VariantProps<typeof iconVariants>;

/**
 * Properties for the Icon component.
 *
 * Icons are always decorative — see the `Icon` component's own documentation for why there is
 * no prop to change that.
 *
 * @example
 * ```tsx
 * <Icon name="search" />
 * <Icon name="x" size="xl" />
 * <Icon name="circle" className="size-2 **:fill-current" />
 * ```
 */
export interface IIcon
	extends Omit<
		React.ComponentPropsWithRef<'svg'>,
		// Icon's own contract, not the caller's to set.
		| 'aria-hidden'
		| 'children'
		| 'dangerouslySetInnerHTML'
		// Sizing goes through `size`/`className` so it stays consistent, rather than reopening
		// the per-call-site ad-hoc sizing this component exists to replace.
		| 'width'
		| 'height'
		// SVG presentation attributes that collide with a same-named `@iconify/react` prop.
		// `color` and `rotate` are Iconify customisations (use `text-*` / `rotate-*` classes
		// instead), `mode` selects Iconify's render mode, and `onLoad` is its data-loaded
		// callback rather than a DOM event.
		| 'color'
		| 'rotate'
		| 'mode'
		| 'onLoad'
	> {
	/**
	 * The icon to render, as a bare name (e.g. `'search'`).
	 *
	 * The Iconify collection prefix is added internally, so callers never write `'lucide:search'`.
	 * Only names in the icon dictionary are accepted — anything else is a compile error.
	 */
	name: IconName;
	/**
	 * The size preset for the icon.
	 *
	 * For a size the scale doesn't cover, use `className` instead — it's merged last, so a
	 * `size-*` utility there wins.
	 *
	 * @default 'md'
	 */
	size?: IconVariants['size'];
	/**
	 * Data attributes are forwarded to the rendered `<svg>`.
	 *
	 * Useful where the icon's meaning is decided at runtime — `Calendar`'s chevron uses
	 * `data-orientation` so the direction it resolved to is visible in the DOM.
	 */
	[key: `data-${string}`]: unknown;
}
