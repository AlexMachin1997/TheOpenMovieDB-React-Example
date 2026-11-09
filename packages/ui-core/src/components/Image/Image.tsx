import { cn } from '@repo/tailwind-config';
import { imageVariants } from '~/components/Image/Image.variants';
import type { IImage } from '~/components/Image/Image.types';

/**
 * An `<img>` that reserves its layout space before it loads and has exactly one accessible name.
 *
 * State the shape one of three ways: `width` and `height` as the file's real pixel size, a `ratio`
 * for a slot whose shape is fixed whatever the source, or `unsized` to opt out on purpose. Name it
 * with `alt`, or mark it `decorative`.
 *
 * Renders a single `<img>` and nothing else. Native attributes such as `srcSet`, `sizes`,
 * `decoding` and `fetchPriority` pass straight through; `loading` defaults to `lazy`.
 *
 * @example
 * ```tsx
 * <Image src={posterUrl} ratio='2/3' alt={`Poster for ${title}`} className='w-[300px]' />
 * <Image src={logoUrl} width={140} height={140} alt='The Movie Database' />
 * ```
 */
const Image = ({
	className,
	ratio,
	width,
	height,
	unsized,
	alt,
	decorative,
	src,
	fallback,
	loading = 'lazy',
	...props
}: IImage) => {
	return (
		<img
			data-slot='image'
			src={src ?? undefined}
			alt={decorative === true ? '' : alt}
			width={width}
			height={height}
			loading={loading}
			className={cn(imageVariants({ ratio }), className)}
			{...props}
		/>
	);
};

Image.displayName = 'Image';

export { Image };
