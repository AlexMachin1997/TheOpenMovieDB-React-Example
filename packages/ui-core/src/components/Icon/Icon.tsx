import { Icon as IconifyIcon } from '@iconify/react';
import { cn } from '@repo/tailwind-config';
import { iconVariants } from '~/components/Icon/Icon.variants';
import { ICON_COLLECTION } from '~/components/Icon/Icon.constants';
import type { IIcon } from '~/components/Icon/Icon.types';

/**
 * Renders an icon by name, at a consistent size, always marked decorative.
 *
 * Icons are **always** `aria-hidden` and there is no prop to change that. An icon must never be
 * the only thing naming a control — pair it with visible text, or an `aria-label` on the parent
 * (as Button's icon-only usage already requires).
 *
 * Icon data resolves over the network from Iconify's CDN, so the very first render of a given
 * icon shows a correctly-sized blank placeholder until the data arrives. Bundling icon data to
 * remove that gap is a planned follow-up.
 *
 * @example
 * ```tsx
 * <Icon name="search" />
 * <Icon name="loader-circle" className="animate-spin" />
 * ```
 */
const Icon = ({ name, size, className, ...props }: IIcon) => {
	const classes = cn(iconVariants({ size }), className);

	return (
		<IconifyIcon
			// Spread first, deliberately: everything below it is part of Icon's contract and must
			// not be overridable by a caller (`aria-hidden` above all).
			{...props}
			icon={`${ICON_COLLECTION}:${name}`}
			data-slot='icon'
			className={classes}
			aria-hidden='true'
			// TODO: remove once icon data is bundled offline. Without a fallback Iconify renders a
			// bare, unstyled `<span>` while fetching, which breaks every parent rule that targets a
			// direct `svg` child (Alert's `has-[>svg]` grid, Button's `has-[>svg]` padding,
			// Accordion's rotate-on-open, Dialog's close-button sizing). An identically-classed
			// placeholder keeps the layout stable so only the glyph appears on load. `role='img'`
			// mirrors what Iconify puts on the resolved icon, so the element is queryable the same
			// way in both states — `getByRole('img', { hidden: true })`.
			fallback={
				<svg
					data-slot='icon'
					className={classes}
					role='img'
					aria-hidden='true'
					viewBox='0 0 24 24'
				/>
			}
		/>
	);
};

Icon.displayName = 'Icon';

export { Icon };
