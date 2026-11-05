import { describe, it, expectTypeOf } from 'vitest';

import type { ISheetContent } from '~/components/Sheet/Sheet.types';

// Only `pnpm check-types` runs these. `vitest run` transpiles and discards types.
describe('ISheetContent', () => {
	/*
	 * `Dialog` and `Sheet` are one component wearing different clothes, so the restriction has to be
	 * identical on both — `Dialog.types.spec.ts` is the twin of this file and says why each prop is
	 * gone.
	 */
	it('accepts none of the handlers the shared surface owns', () => {
		expectTypeOf<ISheetContent>().not.toHaveProperty('onClick');
		expectTypeOf<ISheetContent>().not.toHaveProperty('onKeyDown');
		expectTypeOf<ISheetContent>().not.toHaveProperty('onCancel');
		expectTypeOf<ISheetContent>().not.toHaveProperty('onClose');
		expectTypeOf<ISheetContent>().not.toHaveProperty('ref');
	});

	it('accepts nothing that would break the overlay', () => {
		expectTypeOf<ISheetContent>().not.toHaveProperty('open');
		expectTypeOf<ISheetContent>().not.toHaveProperty('popover');
		expectTypeOf<ISheetContent>().not.toHaveProperty('aria-modal');
		expectTypeOf<ISheetContent>().not.toHaveProperty('slot');
	});

	it('narrows role to the two a dialog element may carry', () => {
		expectTypeOf<ISheetContent['role']>().toEqualTypeOf<'dialog' | 'alertdialog' | undefined>();
	});

	it('leaves the caller what is theirs', () => {
		expectTypeOf<ISheetContent>().toHaveProperty('className');
		expectTypeOf<ISheetContent>().toHaveProperty('side');
		expectTypeOf<ISheetContent>().toHaveProperty('aria-label');
		expectTypeOf<ISheetContent>().toHaveProperty('onRequestClose');
	});
});
