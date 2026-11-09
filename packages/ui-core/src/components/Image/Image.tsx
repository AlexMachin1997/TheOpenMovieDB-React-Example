import * as React from 'react';

import { cn } from '@repo/tailwind-config';
import { imageVariants } from '~/components/Image/Image.variants';
import { Icon } from '~/components/Icon/Icon';
import {
	RATIO_TOLERANCE,
	RATIO_VALUES,
	isUsableSrc,
	warn
} from '~/components/Image/Image.constants';
import type { IImage, ImageStage } from '~/components/Image/Image.types';

const STAGE_ORDER: Record<ImageStage, number> = { primary: 0, fallback: 1, builtIn: 2 };

/**
 * An `<img>` that reserves its layout space before it loads and has exactly one accessible name.
 *
 * State the shape one of three ways: `width` and `height` as the file's real pixel size, a `ratio`
 * for a slot whose shape is fixed whatever the source, or `unsized` to opt out on purpose. Name it
 * with `alt`, or mark it `decorative`.
 *
 * When `src` fails or is missing, it shows a `fallback` if one was given, then a muted box with an
 * `image-off` icon, painted from theme tokens. Neither announces the failure: both keep the name
 * the caller gave in `alt`.
 *
 * Renders a single `<img>` and nothing else, until the built-in fallback, which is one `<span>`. Native attributes such as `srcSet`, `sizes`,
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
	srcSet,
	sizes,
	loading = 'lazy',
	onError,
	ref,
	...props
}: IImage) => {
	const node = React.useRef<HTMLImageElement | null>(null);
	const setRef = (element: HTMLImageElement | null) => {
		node.current = element;
		if (typeof ref === 'function') ref(element);
		else if (ref) ref.current = element;
	};
	const hasFallback = isUsableSrc(fallback);
	const firstStage: ImageStage = isUsableSrc(src)
		? 'primary'
		: hasFallback
			? 'fallback'
			: 'builtIn';

	/*
	 * Keyed on `src`, and reset while rendering rather than in an effect: a card whose node is reused
	 * for another item must not paint one frame of the previous item's failure.
	 */
	const [failed, setFailed] = React.useState<{ src: typeof src; stage: ImageStage }>({
		src,
		stage: 'primary'
	});
	let reached = failed.stage;
	if (failed.src !== src) {
		setFailed({ src, stage: 'primary' });
		reached = 'primary';
	}

	const stage = STAGE_ORDER[reached] > STAGE_ORDER[firstStage] ? reached : firstStage;

	const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
		if (stage === 'primary') {
			setFailed({ src, stage: hasFallback ? 'fallback' : 'builtIn' });
			onError?.(event);
		} else if (stage === 'fallback') {
			setFailed({ src, stage: 'builtIn' });
			// The component papers over this, so the console is the only place the caller sees it.
			warn(`the fallback "${fallback}" also failed to load, so the built-in fallback is shown.`);
		}
	};

	React.useEffect(() => {
		// `?? ''` for an untyped caller who passes neither, which should warn rather than throw.
		if (decorative !== true && (alt ?? '').trim() === '') {
			warn(
				'`alt` is empty. Describe the image, or pass `decorative` if it conveys nothing — an empty name by accident looks identical to one on purpose.'
			);
		}
	}, [alt, decorative]);

	/*
	 * `aspect-ratio` only sizes a box with one automatic dimension, so a caller who fixes both in
	 * `className` reserves a box of their own shape and the ratio does nothing. The type system cannot
	 * see a class name, so check the rendered box instead. A box with no size (hidden at this
	 * breakpoint) has nothing to compare.
	 */
	React.useEffect(() => {
		const element = node.current;
		if (ratio === undefined || element === null) return;

		const box = element.getBoundingClientRect();
		if (box.width === 0 || box.height === 0) return;

		const expected = RATIO_VALUES[ratio];
		if (Math.abs(box.width / box.height - expected) / expected > RATIO_TOLERANCE) {
			warn(
				`\`ratio="${ratio}"\` is not taking effect: the box renders at ${Math.round(box.width)}×${Math.round(box.height)}. Size only one dimension in \`className\` and let the ratio set the other.`
			);
		}
	}, [ratio, className]);

	if (stage === 'builtIn') {
		/*
		 * Not an <img>: an image cannot contain the icon. The element takes the image's place at the
		 * same size — integer attributes become an aspect ratio and a default width, both overridable
		 * by `className` exactly as on the <img> — and takes over its name, since `alt` names nothing
		 * once there is no image.
		 */
		const intrinsic: (React.CSSProperties & Record<'--image-width', string>) | undefined =
			width !== undefined && height !== undefined
				? { aspectRatio: `${width} / ${height}`, '--image-width': `${width}px` }
				: undefined;

		return (
			<span
				data-slot='image'
				data-state='fallback'
				role={decorative === true ? undefined : 'img'}
				aria-label={decorative === true ? undefined : alt}
				aria-hidden={decorative === true ? true : undefined}
				style={intrinsic}
				className={cn(
					'bg-muted text-muted-foreground inline-flex max-w-full items-center justify-center overflow-hidden align-middle',
					intrinsic !== undefined && 'w-(--image-width)',
					imageVariants({ ratio }),
					className
				)}
			>
				<Icon name='image-off' className='h-auto w-[min(3rem,40%)]' />
			</span>
		);
	}

	return (
		<img
			ref={setRef}
			data-slot='image'
			data-state={stage === 'primary' ? undefined : 'fallback'}
			src={(stage === 'primary' ? src : fallback) ?? undefined}
			// A candidate list would win over `src`, so it only belongs to the primary source.
			srcSet={stage === 'primary' ? srcSet : undefined}
			sizes={stage === 'primary' ? sizes : undefined}
			alt={decorative === true ? '' : alt}
			width={width}
			height={height}
			loading={loading}
			onError={handleError}
			className={cn(imageVariants({ ratio }), className)}
			{...props}
		/>
	);
};

Image.displayName = 'Image';

export { Image };
