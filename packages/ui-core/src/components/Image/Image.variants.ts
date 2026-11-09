import { cva } from 'class-variance-authority';

/*
 * The intrinsic-size form needs no classes: Tailwind's preflight already gives every <img>
 * `max-width: 100%; height: auto`, which is what lets the browser derive the box's ratio from the
 * `width` and `height` attributes.
 *
 * The ratio form fills the width it is given, because `aspect-ratio` can only size a box with one
 * automatic dimension, and covers it so a source of another shape is cropped rather than squashed.

 */
export const imageVariants = cva('', {
	variants: {
		ratio: {
			'2/3': 'aspect-[2/3] w-full object-cover',
			'16/9': 'aspect-video w-full object-cover'
		}
	}
});
