import type { ImageRatio } from '~/components/Image/Image.types';

/**
 * The built-in fallback's source: a transparent SVG, inlined so showing it makes no request.
 *
 * It carries the caller's intrinsic size rather than being a 1×1 pixel. With integer `width` and
 * `height`, the box's ratio is `aspect-ratio: auto w / h`, and `auto` means the loaded image's own
 * ratio wins over the attributes — a square pixel would turn a 2:3 box square the moment it
 * loaded. The ratio form sets an explicit `aspect-ratio`, so the size there does not matter.
 *
 * What the user sees is the `bg-muted` painted behind it, which follows the app's colour scheme;
 * the SVG itself could not, because an image is sandboxed from the document's CSS variables.
 */
export const builtInFallbackSrc = (width = 1, height = 1) =>
	`data:image/svg+xml,${encodeURIComponent(
		`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"/>`
	)}`;

/** Each `ratio` as a number, for checking the rendered box against it. */
export const RATIO_VALUES: Record<ImageRatio, number> = { '2/3': 2 / 3, '16/9': 16 / 9 };

/**
 * How far the rendered box may drift from `ratio` before it counts as not taking effect. Absorbs
 * sub-pixel rounding; a box a caller has pinned to another shape misses by far more.
 */
export const RATIO_TOLERANCE = 0.02;

/** Every diagnostic carries the same prefix as the rest of the package's. */
export const warn = (message: string) => console.warn(`[ui-core] Image: ${message}`);

/** A source the browser can actually request. Empty and whitespace-only strings are not. */
export const isUsableSrc = (src: string | null | undefined): src is string =>
	typeof src === 'string' && src.trim() !== '';
