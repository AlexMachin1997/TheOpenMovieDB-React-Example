import { describe, it, expectTypeOf } from 'vitest';
import type { IImage } from '~/components/Image/Image.types';

/*
 * Only `check-types` runs these: `vitest run` does not type-check. Each `@ts-expect-error` is the
 * test — if the line it sits on ever compiles, the directive itself becomes the error and the
 * build fails.
 */
describe('IImage', () => {
	it('accepts each shape on its own', () => {
		expectTypeOf({ alt: 'Logo', width: 140, height: 140 }).toExtend<IImage>();
		expectTypeOf({ alt: 'Poster', ratio: '2/3' as const }).toExtend<IImage>();
		expectTypeOf({ alt: 'Banner', unsized: true as const }).toExtend<IImage>();
	});

	it('rejects a CSS length as width or height', () => {
		// @ts-expect-error — integers only (AC3)
		const lengthWidth: IImage = { alt: 'Poster', width: '250px', height: 141 };
		// @ts-expect-error — integers only (AC3)
		const lengthHeight: IImage = { alt: 'Poster', width: 250, height: '141px' };
		void [lengthWidth, lengthHeight];
	});

	it('rejects an image with no shape', () => {
		// @ts-expect-error — a shape, or an explicit `unsized` (AC4)
		const noShape: IImage = { alt: 'Poster', src: '/poster.jpg' };
		// @ts-expect-error — one dimension is not a shape (AC4)
		const halfShape: IImage = { alt: 'Poster', width: 300 };
		void [noShape, halfShape];
	});

	it('rejects more than one shape', () => {
		// @ts-expect-error — the ratio would silently override the integers (AC5)
		const both: IImage = { alt: 'Poster', ratio: '2/3', width: 300, height: 450 };
		// @ts-expect-error — `unsized` contradicts a ratio
		const unsizedRatio: IImage = { alt: 'Poster', ratio: '2/3', unsized: true };
		void [both, unsizedRatio];
	});

	it('rejects a ratio outside the fixed set', () => {
		// @ts-expect-error — literals only, not an arbitrary string
		const arbitrary: IImage = { alt: 'Poster', ratio: '7/5' };
		// @ts-expect-error — literals, not domain names
		const named: IImage = { alt: 'Poster', ratio: 'poster' };
		void [arbitrary, named];
	});

	it('requires exactly one of a name or decorative', () => {
		expectTypeOf({ decorative: true as const, unsized: true as const }).toExtend<IImage>();

		// @ts-expect-error — no name and not marked decorative
		const unnamed: IImage = { unsized: true };
		// @ts-expect-error — a decorative image has no name
		const both: IImage = { alt: 'Poster', decorative: true, unsized: true };
		void [unnamed, both];
	});

	it('removes the props that would shadow alt', () => {
		// @ts-expect-error — `aria-label` overrides `alt` on an <img>
		const ariaLabel: IImage = { alt: 'Poster', unsized: true, 'aria-label': 'Poster' };
		// @ts-expect-error — `title` is a second name
		const title: IImage = { alt: 'Poster', unsized: true, title: 'Poster' };
		void [ariaLabel, title];
	});
});
