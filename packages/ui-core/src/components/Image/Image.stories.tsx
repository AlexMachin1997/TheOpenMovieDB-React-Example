import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';

import { Image } from '~/components/Image/Image';
import type { IImage } from '~/components/Image/Image.types';

interface IFixture {
	/** Intrinsic width of the served image. */
	w?: number;
	/** Intrinsic height of the served image. */
	h?: number;
	/** Hold the response this many milliseconds, as a slow or mobile connection would. */
	delay?: number;
	/** Answer with this HTTP status instead of an image. */
	status?: number;
	/** Drop the connection with no response, as losing connectivity would. */
	abort?: boolean;
}

/**
 * A URL on the Storybook dev server's image fixture route (`apps/storybook/.storybook/imageFixtures.ts`),
 * whose network behaviour the story chooses. Every story passes its own `id` so no two stories
 * share a URL, which keeps the browser's in-page image cache from answering for the server.
 */
const fixtureUrl = (id: string, { w, h, delay, status, abort }: IFixture = {}) => {
	const query = new URLSearchParams({ id });
	if (w !== undefined) query.set('w', String(w));
	if (h !== undefined) query.set('h', String(h));
	if (delay !== undefined) query.set('delay', String(delay));
	if (status !== undefined) query.set('status', String(status));
	if (abort === true) query.set('abort', '');
	return `/__image-fixture?${query.toString()}`;
};

/** Resolves once the image has settled, loaded or failed, whichever comes first. */
const settled = (img: HTMLImageElement) =>
	new Promise<'load' | 'error'>((resolve) => {
		if (img.complete) {
			resolve(img.naturalWidth > 0 ? 'load' : 'error');
			return;
		}
		img.addEventListener('load', () => resolve('load'), { once: true });
		img.addEventListener('error', () => resolve('error'), { once: true });
	});

/** The rendered box's width over its height, to two decimal places. */
const boxRatio = (el: Element) => {
	const { width, height } = el.getBoundingClientRect();
	return Math.round((width / height) * 100) / 100;
};

const meta: Meta<IImage> = {
	title: 'UI Core/Image',
	component: Image,
	parameters: {
		layout: 'centered',
		a11y: {
			test: 'error'
		}
	}
};

export default meta;
type Story = StoryObj<IImage>;

/**
 * `IImage` is a union, which strips Storybook's inference from the `play` context. One alias rather
 * than an annotation per story. `step` returns `void | Promise<void>`, not `Promise<void>`.
 */
type PlayContext = {
	args: IImage;
	canvasElement: HTMLElement;
	step: (label: string, run: () => Promise<void>) => void | Promise<void>;
};

/* -------------------------------------------------------------------------------------------------
 * Shape
 * ---------------------------------------------------------------------------------------------- */

export const IntrinsicSize: Story = {
	args: {
		src: fixtureUrl('intrinsic-size', { w: 140, h: 140, delay: 1500 }),
		width: 140,
		height: 140,
		alt: 'The Movie Database'
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Image } from '@repo/ui-core';

<Image src={logoUrl} width={140} height={140} alt='The Movie Database' />`
			}
		}
	},
	play: async ({ canvasElement, step }: PlayContext) => {
		const img = within(canvasElement).getByRole<HTMLImageElement>('img');

		await step('Before the source arrives, the box already has the file’s ratio', async () => {
			await expect(img.complete).toBe(false);
			await expect(img.getBoundingClientRect().width).toBe(140);
			await expect(boxRatio(img)).toBe(1);
		});

		await step('The integers reach the HTML attributes, where the browser reads them', async () => {
			await expect(img).toHaveAttribute('width', '140');
			await expect(img).toHaveAttribute('height', '140');
			await expect(img).not.toHaveAttribute('style');
		});

		await step('Once loaded, the box has not moved', async () => {
			await expect(await settled(img)).toBe('load');
			await expect(boxRatio(img)).toBe(1);
		});
	}
};

export const Ratio: Story = {
	args: {
		src: fixtureUrl('ratio', { w: 300, h: 450, delay: 1500 }),
		ratio: '2/3',
		alt: 'Poster for Dune: Part Two',
		className: 'w-[300px]'
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Image } from '@repo/ui-core';

<Image src={posterUrl} ratio='2/3' alt='Poster for Dune: Part Two' className='w-[300px]' />`
			}
		}
	},
	play: async ({ canvasElement, step }: PlayContext) => {
		const img = within(canvasElement).getByRole<HTMLImageElement>('img');

		await step(
			'Before the source arrives, the box is already 2:3 at the width it was given',
			async () => {
				await expect(img.complete).toBe(false);
				await expect(img.getBoundingClientRect().width).toBe(300);
				await expect(img.getBoundingClientRect().height).toBe(450);
			}
		);

		await step('No intrinsic size is written, so nothing contradicts the ratio', async () => {
			await expect(img).not.toHaveAttribute('width');
			await expect(img).not.toHaveAttribute('height');
		});

		await step('Once loaded, the box has not moved', async () => {
			await expect(await settled(img)).toBe('load');
			await expect(img.getBoundingClientRect().height).toBe(450);
		});
	}
};

/**
 * The case `ratio` exists for: the source is not the shape of the slot. A 2:3 poster in a 16:9
 * box is cropped to cover it, never squashed.
 */
export const RatioWithAnotherShape: Story = {
	args: {
		src: fixtureUrl('ratio-other-shape', { w: 300, h: 450 }),
		ratio: '16/9',
		alt: 'A thumbnail for Dune: Part Two',
		className: 'w-[320px]'
	},
	play: async ({ canvasElement, step }: PlayContext) => {
		const img = within(canvasElement).getByRole<HTMLImageElement>('img');
		await expect(await settled(img)).toBe('load');

		await step('The box keeps its own 16:9 shape, not the source’s 2:3', async () => {
			await expect(boxRatio(img)).toBe(1.78);
			await expect(img.naturalWidth / img.naturalHeight).toBeCloseTo(2 / 3);
		});

		await step('The source covers the box rather than stretching to it', async () => {
			await expect(getComputedStyle(img).objectFit).toBe('cover');
		});
	}
};

/** `object-contain` in `className` letterboxes the source instead of cropping it. */
export const RatioContained: Story = {
	args: {
		src: fixtureUrl('ratio-contained', { w: 300, h: 450 }),
		ratio: '16/9',
		alt: 'A thumbnail for Dune: Part Two',
		className: 'w-[320px] object-contain bg-muted'
	},
	play: async ({ canvasElement }: PlayContext) => {
		const img = within(canvasElement).getByRole<HTMLImageElement>('img');
		await expect(getComputedStyle(img).objectFit).toBe('contain');
	}
};

/** A caller's own width replaces the default, without `!important`. */
export const SizedByClassName: Story = {
	args: {
		src: fixtureUrl('sized-by-class', { w: 300, h: 450 }),
		ratio: '2/3',
		alt: 'Poster for Dune: Part Two',
		className: 'w-[130px]'
	},
	play: async ({ canvasElement }: PlayContext) => {
		const img = within(canvasElement).getByRole<HTMLImageElement>('img');
		await expect(img.getBoundingClientRect().width).toBe(130);
		await expect(img.getBoundingClientRect().height).toBeCloseTo(195, 0);
	}
};

/* -------------------------------------------------------------------------------------------------
 * Name and native attributes
 * ---------------------------------------------------------------------------------------------- */

export const Named: Story = {
	args: {
		src: fixtureUrl('named', { w: 300, h: 450 }),
		ratio: '2/3',
		alt: 'Poster for Dune: Part Two',
		className: 'w-[200px]'
	},
	play: async ({ canvasElement, step }: PlayContext) => {
		const img = within(canvasElement).getByRole('img', { name: 'Poster for Dune: Part Two' });

		await step('alt is the only name: no aria-label, no title', async () => {
			await expect(img).toHaveAttribute('alt', 'Poster for Dune: Part Two');
			await expect(img).not.toHaveAttribute('aria-label');
			await expect(img).not.toHaveAttribute('title');
		});

		await step('Images are lazy unless the caller says otherwise', async () => {
			await expect(img).toHaveAttribute('loading', 'lazy');
		});
	}
};

/** `loading`, `decoding`, `srcSet`, `sizes` and `fetchPriority` are the browser's own and pass through. */
export const NativeAttributes: Story = {
	args: {
		src: fixtureUrl('native-attributes', { w: 300, h: 450 }),
		srcSet: `${fixtureUrl('native-attributes-1x', { w: 300, h: 450 })} 1x, ${fixtureUrl('native-attributes-2x', { w: 600, h: 900 })} 2x`,
		sizes: '200px',
		ratio: '2/3',
		alt: 'Poster for Dune: Part Two',
		className: 'w-[200px]',
		loading: 'eager',
		decoding: 'async',
		fetchPriority: 'high'
	},
	play: async ({ args, canvasElement }: PlayContext) => {
		const img = within(canvasElement).getByRole('img');

		await expect(img).toHaveAttribute('loading', 'eager');
		await expect(img).toHaveAttribute('decoding', 'async');
		await expect(img).toHaveAttribute('fetchpriority', 'high');
		await expect(img).toHaveAttribute('sizes', '200px');
		await expect(img).toHaveAttribute('srcset', args.srcSet);
	}
};

/* -------------------------------------------------------------------------------------------------
 * Network
 * ---------------------------------------------------------------------------------------------- */

/**
 * The response is held for three seconds, as on a slow mobile connection. The reserved box is what
 * you see until it arrives; nothing on the page moves when it does.
 */
export const SlowConnection: Story = {
	args: {
		src: fixtureUrl('slow-connection', { w: 300, h: 450, delay: 3000 }),
		ratio: '2/3',
		alt: 'Poster for Dune: Part Two',
		className: 'w-[200px] bg-muted'
	},
	render: (args: IImage) => (
		<div className='flex w-[200px] flex-col gap-2'>
			<Image {...args} />
			<p className='text-sm'>Text below the image does not move when it loads.</p>
		</div>
	),
	play: async ({ canvasElement }: PlayContext) => {
		const canvas = within(canvasElement);
		const img = canvas.getByRole<HTMLImageElement>('img');
		const text = canvas.getByText(/does not move/);
		const before = text.getBoundingClientRect().top;

		await waitFor(() => expect(img.complete).toBe(true), { timeout: 5000 });
		await expect(text.getBoundingClientRect().top).toBe(before);
	}
};
