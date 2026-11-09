import * as React from 'react';

/**
 * The fixed shapes `ratio` accepts, written in CSS `aspect-ratio` syntax (width / height).
 *
 * Literals rather than names: `'poster'` is TMDB vocabulary, not library vocabulary. Adding a shape
 * is one entry here and one in the class map.
 */
export type ImageRatio = '2/3' | '16/9';

/**
 * Which source is showing. It only ever moves forward — `primary`, then the caller's `fallback`,
 * then the built-in one — until `src` changes.
 */
export type ImageStage = 'primary' | 'fallback' | 'builtIn';

/**
 * The image's shape is known from the file: its real width and height, in pixels.
 *
 * Both are written to the HTML attributes, so the browser reserves a box of that ratio before the
 * source loads. Integers only — a CSS length such as `'250px'` is rejected. Size the rendered box
 * with `className`; the attributes describe the file, not the layout.
 */
interface IImageIntrinsicSize {
	/** The source's intrinsic width in pixels. */
	width: number;
	/** The source's intrinsic height in pixels. */
	height: number;
	ratio?: never;
	unsized?: never;
}

/**
 * The image's shape is fixed by the slot it sits in, whatever the source's own dimensions.
 *
 * The box fills the width it is given and takes its height from the ratio. The source is scaled to
 * cover the box without distortion, cropping what overflows; pass `object-contain` in `className`
 * to letterbox it instead.
 */
interface IImageRatio {
	/** The box's shape, as `width/height`. */
	ratio: ImageRatio;
	width?: never;
	height?: never;
	unsized?: never;
}

/**
 * An explicit opt-out: this image reserves no space before it loads, and the layout will move when
 * it does. The caller has said so on purpose, rather than forgotten.
 */
interface IImageUnsized {
	/** Opts out of reserving layout space. */
	unsized: true;
	width?: never;
	height?: never;
	ratio?: never;
}

/** A named image: `alt` is announced by assistive technology, and is its only name. */
interface IImageNamed {
	/**
	 * What the image shows, announced by assistive technology. It is also kept when the image fails
	 * and the fallback is shown, because the fallback stands in for this image.
	 *
	 * An empty string warns. For an image that conveys nothing, pass `decorative` instead.
	 */
	alt: string;
	decorative?: never;
}

/** A decorative image, exposed to assistive technology as nothing at all. */
interface IImageDecorative {
	/**
	 * Marks the image as conveying nothing, so assistive technology skips it whether it loads or
	 * fails. Distinguishes "empty on purpose" from a forgotten `alt`.
	 */
	decorative: true;
	alt?: never;
}

/**
 * Properties for the Image component.
 *
 * A type alias rather than an interface, unlike every other `I`-prefixed prop type: the shape and
 * the name are each a choice of exactly one form, and an interface cannot express that.
 * `naming-convention` only inspects interfaces, so nothing enforces the prefix here.
 *
 * `width` and `height` are narrowed to integers, and `aria-label` and `title` are removed: either
 * would give the image a second name that shadows `alt`.
 */
export type IImage = Omit<
	React.ComponentProps<'img'>,
	'width' | 'height' | 'alt' | 'src' | 'aria-label' | 'title'
> &
	(IImageIntrinsicSize | IImageRatio | IImageUnsized) &
	(IImageNamed | IImageDecorative) & {
		/**
		 * The image to load. Empty or missing renders the fallback, with no request made: an empty
		 * `src` would otherwise re-request the current page in some browsers.
		 */
		src?: string | null;

		/**
		 * An image to show instead when `src` fails or is missing. If it fails too, the built-in
		 * fallback is shown and a warning names it.
		 */
		fallback?: string;

		/**
		 * Called once when `src` fails to load, after the component has already switched to the
		 * fallback. A failing `fallback` does not call it again, and a missing `src` is not a
		 * failure.
		 */
		onError?: React.ReactEventHandler<HTMLImageElement>;

		/**
		 * Called when `src`, or your `fallback`, finishes loading. Not called for the built-in
		 * fallback, which is not an image; clear a loading placeholder from `onError` as well.
		 */
		onLoad?: React.ReactEventHandler<HTMLImageElement>;

		/** @default 'lazy' */
		loading?: 'lazy' | 'eager';
	};
