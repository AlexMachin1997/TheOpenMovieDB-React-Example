import type { ImageRatio } from '~/components/Image/Image.types';

/** Each `ratio` as a number, for checking the rendered box against it. */
export const RATIO_VALUES: Record<ImageRatio, number> = { '2/3': 2 / 3, '16/9': 16 / 9 };

/**
 * How far the rendered box may drift from `ratio` before it counts as not taking effect. Absorbs
 * sub-pixel rounding; a box a caller has pinned to another shape misses by far more.
 */
export const RATIO_TOLERANCE = 0.02;
