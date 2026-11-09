import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { cn } from '@repo/tailwind-config';
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

/**
 * Every image request the page has started since `since`, from the Resource Timing buffer.
 *
 * Filtered to `img` initiators so the module requests of other stories sharing the page do not
 * count. A request for a fallback, or for the document URL that an empty `src` resolves to, would
 * appear here.
 */
const imageRequestsSince = (since: number) =>
	performance
		.getEntriesByType('resource')
		.filter(
			(entry): entry is PerformanceResourceTiming =>
				entry instanceof PerformanceResourceTiming &&
				entry.initiatorType === 'img' &&
				entry.startTime >= since
		)
		.map((entry) => new URL(entry.name).pathname + new URL(entry.name).search);

/** When the meta's loader says this story started rendering. */
const startedAt = (loaded: Record<string, unknown>) =>
	typeof loaded.startedAt === 'number' ? loaded.startedAt : 0;

/** Waits for the component to give up on its primary source. */
const toFallback = (img: HTMLElement) =>
	waitFor(() => expect(img).toHaveAttribute('data-state', 'fallback'), { timeout: 3000 });

/**
 * Every story's `console.warn`, swapped for a spy.
 *
 * Image's diagnostics fire from effects and from the error handler, which can run before `play()`
 * does — so the spy is installed in `beforeEach`, not in the test body. Installed for the whole
 * file, so the stories that must stay silent can say so too.
 */
const warnSpy = fn();

/** Image's own diagnostics, ignoring any unrelated warning that happened to land on the spy. */
const imageWarnings = () =>
	warnSpy.mock.calls
		.map((call) => String(call[0]))
		.filter((message) => message.startsWith('[ui-core] Image'));

/** Appends a per-mount nonce to a fixture URL; anything else passes through untouched. */
const withNonce = <T extends string | null | undefined>(url: T, nonce: string): T | string =>
	typeof url === 'string' && url.startsWith('/__image-fixture') ? `${url}&n=${nonce}` : url;

/**
 * `Image`, with every fixture URL made unique to this mount.
 *
 * The preview iframe stays one document across stories, and Chrome answers a URL it has already
 * loaded in that document from its in-memory image cache, whatever `Cache-Control` says. Revisiting
 * a story would then find its image already complete, and a "before load" assertion would fail on
 * the second view only. A fresh URL per mount means every visit is a first visit.
 */
const FreshImage = (props: IImage) => {
	const [nonce] = React.useState(() => Math.random().toString(36).slice(2));
	return (
		<Image
			{...props}
			src={withNonce(props.src, nonce)}
			fallback={props.fallback === undefined ? undefined : withNonce(props.fallback, nonce)}
		/>
	);
};

const meta: Meta<IImage> = {
	title: 'UI Core/Image',
	component: Image,
	render: (args: IImage) => <FreshImage {...args} />,
	beforeEach: () => {
		const original = console.warn;
		warnSpy.mockClear();
		console.warn = warnSpy;

		return () => {
			console.warn = original;
		};
	},
	// Stamped before the story renders, so `imageRequestsSince` sees this story's requests only.
	loaders: [async () => ({ startedAt: performance.now() })],
	/*
	 * Declared by hand: react-docgen extracts nothing from a component whose props are a type alias,
	 * so without these the docs page's props table is empty.
	 */
	argTypes: {
		src: {
			control: 'text',
			description: 'The image to load. Empty or missing shows the fallback, with no request made.',
			table: { type: { summary: 'string | null' } }
		},
		alt: {
			control: 'text',
			description:
				'What the image shows. Its only accessible name, kept when it falls back. Required unless `decorative`.',
			table: { type: { summary: 'string' } }
		},
		decorative: {
			control: 'boolean',
			description: 'The image conveys nothing; renders `alt=""`. Cannot be combined with `alt`.',
			table: { type: { summary: 'true' } }
		},
		width: {
			control: 'number',
			description:
				'The file’s real width in pixels. Pass with `height`; cannot be combined with `ratio` or `unsized`.',
			table: { type: { summary: 'number' } }
		},
		height: {
			control: 'number',
			description:
				'The file’s real height in pixels. Pass with `width`; cannot be combined with `ratio` or `unsized`.',
			table: { type: { summary: 'number' } }
		},
		ratio: {
			control: 'select',
			options: ['2/3', '16/9'],
			description:
				'The slot’s shape, whatever the file’s size. The box fills its width and covers it with the source. Cannot be combined with `width`/`height` or `unsized`.',
			table: { type: { summary: "'2/3' | '16/9'" } }
		},
		unsized: {
			control: false,
			description: 'Reserve no space, on purpose. The layout moves when the image loads.',
			table: { type: { summary: 'true' } }
		},
		fallback: {
			control: 'text',
			description:
				'Shown when `src` fails or is missing. If it fails too, the built-in fallback is shown and a warning names it.',
			table: { type: { summary: 'string' } }
		},
		loading: {
			control: 'inline-radio',
			options: ['lazy', 'eager'],
			description: 'When the browser fetches the image.',
			table: { type: { summary: "'lazy' | 'eager'" }, defaultValue: { summary: "'lazy'" } }
		},
		onError: {
			control: false,
			description:
				'Called once when `src` fails, after the fallback is already showing. Not called for a missing `src`, nor when `fallback` fails.',
			table: { type: { summary: '(event) => void' } }
		},
		onLoad: {
			control: false,
			description: 'Called when whichever source is shown has loaded, the fallback included.',
			table: { type: { summary: '(event) => void' } }
		},
		className: {
			control: 'text',
			description:
				'Size and style the box. With `ratio`, size one dimension only. Merged over the defaults, so no `!important` is needed.',
			table: { type: { summary: 'string' } }
		}
	},
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
	loaded: Record<string, unknown>;
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
			await expect(img.getBoundingClientRect().width).toBeCloseTo(140, 0);
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
				await expect(img.getBoundingClientRect().width).toBeCloseTo(300, 0);
				await expect(img.getBoundingClientRect().height).toBeCloseTo(450, 0);
			}
		);

		await step('No intrinsic size is written, so nothing contradicts the ratio', async () => {
			await expect(img).not.toHaveAttribute('width');
			await expect(img).not.toHaveAttribute('height');
		});

		await step('Once loaded, the box has not moved', async () => {
			await expect(await settled(img)).toBe('load');
			await expect(img.getBoundingClientRect().height).toBeCloseTo(450, 0);
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
		await expect(img.getBoundingClientRect().width).toBeCloseTo(130, 0);
		await expect(img.getBoundingClientRect().height).toBeCloseTo(195, 0);
		// One dimension sized, the ratio sets the other: nothing to warn about.
		await expect(imageWarnings()).toEqual([]);
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
			<FreshImage {...args} />
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

/* -------------------------------------------------------------------------------------------------
 * Failure
 * ---------------------------------------------------------------------------------------------- */

/** The server answers 500. The box stays, painted from `bg-muted`, and keeps the image's name. */
export const FailedToLoad: Story = {
	args: {
		src: fixtureUrl('failed-to-load', { status: 500 }),
		ratio: '2/3',
		alt: 'Poster for Dune: Part Two',
		className: 'w-[200px]',
		onError: fn()
	},
	play: async ({ args, canvasElement, loaded, step }: PlayContext) => {
		const img = within(canvasElement).getByRole<HTMLImageElement>('img');
		await toFallback(img);

		await step('The fallback announces the name the caller gave, not the failure', async () => {
			await expect(
				within(canvasElement).getByRole('img', { name: 'Poster for Dune: Part Two' })
			).toBe(img);
		});

		await step('It is inlined, so showing it requested nothing', async () => {
			await expect(img.getAttribute('src')).toMatch(/^data:image\/svg\+xml,/);
			await expect(await settled(img)).toBe('load');
			await expect(
				imageRequestsSince(startedAt(loaded)).filter((url) => !url.includes('failed-to-load'))
			).toEqual([]);
		});

		await step('The reserved box is unchanged', async () => {
			await expect(img.getBoundingClientRect().width).toBeCloseTo(200, 0);
			await expect(img.getBoundingClientRect().height).toBeCloseTo(300, 0);
		});

		await step('The caller’s onError ran once, after the component handled it', async () => {
			await expect(args.onError).toHaveBeenCalledTimes(1);
		});

		await step('A failed primary is an expected state, so nothing warns', async () => {
			await expect(imageWarnings()).toEqual([]);
		});
	}
};

/**
 * The connection drops with no response, as it would offline. A fetched fallback would fail in
 * exactly this case, which is why the built-in one is painted rather than requested.
 */
export const Offline: Story = {
	args: {
		src: fixtureUrl('offline', { abort: true }),
		width: 300,
		height: 450,
		alt: 'Poster for Dune: Part Two',
		className: 'w-[200px]'
	},
	play: async ({ canvasElement, loaded, step }: PlayContext) => {
		const img = within(canvasElement).getByRole<HTMLImageElement>('img');
		await toFallback(img);
		await expect(await settled(img)).toBe('load');

		await step('No request was issued because of the failure', async () => {
			await expect(
				imageRequestsSince(startedAt(loaded)).filter((url) => !url.includes('offline'))
			).toEqual([]);
		});

		await step(
			'An intrinsic-size box keeps its 2:3 ratio once the fallback has loaded',
			async () => {
				await expect(img.getBoundingClientRect().width).toBeCloseTo(200, 0);
				await expect(img.getBoundingClientRect().height).toBeCloseTo(300, 0);
			}
		);
	}
};

/** An empty `src` never reaches the DOM, where it would re-request the current page. */
export const EmptySrc: Story = {
	args: {
		src: '',
		ratio: '2/3',
		alt: 'Poster for Dune: Part Two',
		className: 'w-[200px]',
		onError: fn()
	},
	play: async ({ args, canvasElement, loaded, step }: PlayContext) => {
		const img = within(canvasElement).getByRole<HTMLImageElement>('img');

		await step('The fallback is shown straight away', async () => {
			await expect(img).toHaveAttribute('data-state', 'fallback');
			await expect(img.getAttribute('src')).toMatch(/^data:/);
		});

		await step('Nothing was requested — not the page URL, not anything', async () => {
			await settled(img);
			await expect(imageRequestsSince(startedAt(loaded))).toEqual([]);
		});

		await step('A missing image is not a failure, so onError does not run', async () => {
			await expect(args.onError).not.toHaveBeenCalled();
		});
	}
};

/** No `src` at all renders the same thing as an empty one. */
export const MissingSrc: Story = {
	args: {
		src: null,
		ratio: '16/9',
		alt: 'A thumbnail for Dune: Part Two',
		className: 'w-[320px]'
	},
	play: async ({ canvasElement }: PlayContext) => {
		const img = within(canvasElement).getByRole('img', { name: 'A thumbnail for Dune: Part Two' });
		await expect(img).toHaveAttribute('data-state', 'fallback');
	}
};

/** A decorative image exposes nothing to assistive technology, loaded or failed. */
export const Decorative: Story = {
	args: { decorative: true, ratio: '16/9' },
	render: () => (
		<div className='flex gap-4'>
			<FreshImage
				decorative
				ratio='16/9'
				className='w-[160px]'
				src={fixtureUrl('decorative-loaded', { w: 320, h: 180 })}
			/>
			<FreshImage
				decorative
				ratio='16/9'
				className='w-[160px]'
				src={fixtureUrl('decorative-failed', { status: 500 })}
			/>
		</div>
	),
	play: async ({ canvasElement, step }: PlayContext) => {
		const images = canvasElement.querySelectorAll('img');

		await step('Both carry an empty alt', async () => {
			for (const img of images) await expect(img).toHaveAttribute('alt', '');
		});

		await step('Neither is reachable as an image, before or after one of them fails', async () => {
			await expect(within(canvasElement).queryAllByRole('img')).toEqual([]);
			const failed = images.item(1);
			if (failed !== null) await toFallback(failed);
			await expect(within(canvasElement).queryAllByRole('img')).toEqual([]);
		});

		await step('An empty name on purpose does not warn', async () => {
			await expect(imageWarnings()).toEqual([]);
		});
	}
};

/** `alt=""` without `decorative` might be an accident, so it warns. */
export const EmptyAlt: Story = {
	args: {
		src: fixtureUrl('empty-alt', { w: 300, h: 450 }),
		ratio: '2/3',
		alt: '',
		className: 'w-[200px]'
	},
	play: async () => {
		await waitFor(() => expect(imageWarnings()).toHaveLength(1));
		await expect(imageWarnings()[0]).toContain('`alt` is empty');
	}
};

/**
 * Both dimensions fixed in `className`: the box is the caller's shape, not 2:3, so the ratio does
 * nothing. `PersonSidebar` does exactly this today. The type system cannot see it, so it warns.
 */
export const RatioOverriddenByClassName: Story = {
	args: {
		src: fixtureUrl('ratio-overridden', { w: 300, h: 450 }),
		ratio: '2/3',
		alt: 'A profile photo of Zendaya',
		className: 'h-[150px] w-[300px]'
	},
	play: async ({ canvasElement }: PlayContext) => {
		const img = within(canvasElement).getByRole('img');
		await expect(boxRatio(img)).toBe(2);
		await waitFor(() => expect(imageWarnings()).toHaveLength(1));
		await expect(imageWarnings()[0]).toContain('`ratio="2/3"` is not taking effect');
	}
};

/**
 * The built-in fallback follows the app's own `.dark` class, not the OS setting. Each panel holds a
 * failed image beside a visually hidden `bg-muted` probe, and the two must match.
 */
export const BothColourSchemes: Story = {
	args: { alt: 'Poster', ratio: '2/3' },
	render: () => (
		<div className='flex gap-4'>
			{(['light', 'dark'] as const).map((scheme) => (
				<div
					key={scheme}
					data-scheme={scheme}
					className={cn(scheme, 'bg-background text-foreground flex items-start gap-2 p-4')}
				>
					<FreshImage
						src={fixtureUrl(`scheme-${scheme}`, { status: 500 })}
						ratio='2/3'
						alt={`A failed poster, ${scheme} scheme`}
						className='w-[100px]'
					/>
					<div data-swatch className='bg-muted sr-only' aria-hidden='true' />
				</div>
			))}
		</div>
	),
	play: async ({ canvasElement }: PlayContext) => {
		const colours: Record<string, string> = {};

		for (const panel of canvasElement.querySelectorAll<HTMLElement>('[data-scheme]')) {
			const img = within(panel).getByRole('img');
			const swatch = panel.querySelector('[data-swatch]');
			await toFallback(img);
			if (swatch === null) throw new Error('missing swatch');

			const colour = getComputedStyle(img).backgroundColor;
			await expect(colour).toBe(getComputedStyle(swatch).backgroundColor);
			colours[panel.dataset.scheme ?? ''] = colour;
		}

		await expect(colours.light).not.toBe(colours.dark);
	}
};

/* -------------------------------------------------------------------------------------------------
 * Caller fallback
 * ---------------------------------------------------------------------------------------------- */

/** A caller's `fallback` is shown when `src` fails. It is fetched like any other image. */
export const CustomFallback: Story = {
	args: {
		src: fixtureUrl('custom-fallback-primary', { status: 404 }),
		fallback: fixtureUrl('custom-fallback-image', { w: 300, h: 450 }),
		ratio: '2/3',
		alt: 'Poster for Dune: Part Two',
		className: 'w-[200px]'
	},
	play: async ({ canvasElement }: PlayContext) => {
		const img = within(canvasElement).getByRole<HTMLImageElement>('img');
		await toFallback(img);
		await expect(img.getAttribute('src')).toContain('custom-fallback-image');
		await expect(await settled(img)).toBe('load');
		await expect(img).not.toHaveClass('bg-muted');
	}
};

/**
 * Both fail. The component ends on its own fallback, and the caller's `onError` still ran once —
 * for the source they asked for, not for the cascade behind it.
 */
export const CustomFallbackFails: Story = {
	args: {
		src: fixtureUrl('fallback-fails-primary', { status: 500 }),
		fallback: fixtureUrl('fallback-fails-fallback', { status: 500 }),
		ratio: '2/3',
		alt: 'Poster for Dune: Part Two',
		className: 'w-[200px]',
		onError: fn()
	},
	play: async ({ args, canvasElement, step }: PlayContext) => {
		const img = within(canvasElement).getByRole<HTMLImageElement>('img');

		await step('The built-in fallback is where it settles', async () => {
			await waitFor(() => expect(img.getAttribute('src')).toMatch(/^data:/), { timeout: 3000 });
			await expect(img).toHaveClass('bg-muted');
		});

		await step('onError ran exactly once', async () => {
			await expect(args.onError).toHaveBeenCalledTimes(1);
		});

		await step(
			'A warning names the fallback that failed, since the caller cannot see it',
			async () => {
				const warnings = imageWarnings();
				await expect(warnings).toHaveLength(1);
				await expect(warnings[0]).toContain(String(args.fallback));
			}
		);
	}
};

/* -------------------------------------------------------------------------------------------------
 * Changing src
 * ---------------------------------------------------------------------------------------------- */

/**
 * Exists to prove the component's own reset: a node reused for a new `src` — a card recycled in a
 * rail — must not keep the previous item's failure.
 */
const SrcSwitcher = () => {
	// Unique per mount for the same reason as `FreshImage`.
	const [nonce] = React.useState(() => Math.random().toString(36).slice(2));
	const [src, setSrc] = React.useState(fixtureUrl(`switch-broken-${nonce}`, { status: 500 }));

	return (
		<div className='flex flex-col items-start gap-2'>
			<Image src={src} ratio='2/3' alt='Poster' className='w-[200px]' />
			<button
				type='button'
				className='rounded border px-2 py-1 text-sm'
				onClick={() => setSrc(fixtureUrl(`switch-working-${nonce}`, { w: 300, h: 450 }))}
			>
				Load another poster
			</button>
		</div>
	);
};

export const SrcChangesAfterFailure: Story = {
	args: { ratio: '2/3', alt: 'Poster' },
	render: () => <SrcSwitcher />,
	play: async ({ canvasElement, loaded, step }: PlayContext) => {
		const canvas = within(canvasElement);
		const img = canvas.getByRole<HTMLImageElement>('img');
		await toFallback(img);

		await step('Left alone, a failed source is never retried', async () => {
			await new Promise((resolve) => setTimeout(resolve, 500));
			await expect(img).toHaveAttribute('data-state', 'fallback');
			await expect(
				imageRequestsSince(startedAt(loaded)).filter((url) => url.includes('switch-broken'))
			).toHaveLength(1);
		});

		await step('A new src resets the failure and loads', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Load another poster' }));
			await waitFor(() => expect(img).not.toHaveAttribute('data-state'));
			await expect(img.getAttribute('src')).toContain('switch-working');
			await expect(await settled(img)).toBe('load');
		});
	}
};
