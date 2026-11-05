import { describe, it, expectTypeOf } from 'vitest';

import type { IDialogContent } from '~/components/Dialog/Dialog.types';

// Only `pnpm check-types` runs these. `vitest run` transpiles and discards types.
describe('IDialogContent', () => {
	/*
	 * Each of these was accepted and then overwritten by `OverlaySurface`, which writes its own after
	 * `{...props}` on the element. A prop that type-checks and does nothing is worse than one that
	 * does not compile, so they are gone from the surface rather than made to work.
	 */
	it('accepts none of the handlers the shared surface owns', () => {
		expectTypeOf<IDialogContent>().not.toHaveProperty('onClick');
		expectTypeOf<IDialogContent>().not.toHaveProperty('onKeyDown');
		expectTypeOf<IDialogContent>().not.toHaveProperty('onCancel');
		expectTypeOf<IDialogContent>().not.toHaveProperty('onClose');
		expectTypeOf<IDialogContent>().not.toHaveProperty('ref');
	});

	it('accepts nothing that would break the overlay', () => {
		expectTypeOf<IDialogContent>().not.toHaveProperty('open');
		expectTypeOf<IDialogContent>().not.toHaveProperty('popover');
		expectTypeOf<IDialogContent>().not.toHaveProperty('aria-modal');
	});

	/*
	 * `slot` is the sharpest of them: `DialogContent` passes `slot='dialog'` *before* `{...props}`,
	 * so a caller supplying it renamed every `data-slot` in the tree.
	 */
	it('does not let a caller rename the slot namespace', () => {
		expectTypeOf<IDialogContent>().not.toHaveProperty('slot');
	});

	/*
	 * `role` is narrowed rather than removed. A preset built on this surface has to pin it — the
	 * alert dialog does — and both values are legitimate on a `<dialog>`, while `presentation` or
	 * `alert` would take the semantics off the element.
	 */
	it('narrows role to the two a dialog element may carry', () => {
		expectTypeOf<IDialogContent['role']>().toEqualTypeOf<'dialog' | 'alertdialog' | undefined>();
	});

	it('leaves the caller what is theirs', () => {
		expectTypeOf<IDialogContent>().toHaveProperty('className');
		expectTypeOf<IDialogContent>().toHaveProperty('id');
		expectTypeOf<IDialogContent>().toHaveProperty('style');
		expectTypeOf<IDialogContent>().toHaveProperty('aria-label');
		expectTypeOf<IDialogContent>().toHaveProperty('onRequestClose');
	});
});
