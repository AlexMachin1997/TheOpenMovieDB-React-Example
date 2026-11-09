import type { ImageRatio } from '~/components/Image/Image.types';

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
