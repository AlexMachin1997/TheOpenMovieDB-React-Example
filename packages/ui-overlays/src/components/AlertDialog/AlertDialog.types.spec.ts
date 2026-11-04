import { describe, it, expectTypeOf } from 'vitest';

import type { IAlertDialogContent } from '~/components/AlertDialog/AlertDialog.types';

/**
 * AC7 is a claim about compilation, so it cannot be a `play()` assertion — a story that omitted a
 * required prop would not build, and a story that supplied one proves nothing. These are the
 * repo's existing mechanism for a type-level acceptance criterion, as `Form.types.spec.ts` is.
 *
 * Only `pnpm check-types` (and therefore `pnpm build`) runs them. `vitest run` transpiles and
 * discards types, so a green suite here says nothing either way.
 */
describe('IAlertDialogContent', () => {
	it('requires the title, the description and both actions', () => {
		// `toExtend` rather than four `Required` checks: an object with the four omitted has to fail
		// to be assignable, which is exactly what "omitting it fails to compile" means at a call site.
		expectTypeOf<Record<string, never>>().not.toExtend<IAlertDialogContent>();

		expectTypeOf<IAlertDialogContent>().toHaveProperty('title');
		expectTypeOf<IAlertDialogContent>().toHaveProperty('description');
		expectTypeOf<IAlertDialogContent>().toHaveProperty('cancel');
		expectTypeOf<IAlertDialogContent>().toHaveProperty('confirm');

		// Required, not optional. `toExtend` above catches all four missing at once; these pin each
		// one individually, so dropping `required` from a single prop is caught rather than masked by
		// the other three.
		expectTypeOf<Omit<IAlertDialogContent, 'title'>>().not.toExtend<IAlertDialogContent>();
		expectTypeOf<Omit<IAlertDialogContent, 'description'>>().not.toExtend<IAlertDialogContent>();
		expectTypeOf<Omit<IAlertDialogContent, 'cancel'>>().not.toExtend<IAlertDialogContent>();
		expectTypeOf<Omit<IAlertDialogContent, 'confirm'>>().not.toExtend<IAlertDialogContent>();
	});

	// The other half of requirements 1 and 3: not merely defaulted, but absent from the surface, so
	// there is no prop to pass. `role` is on `ComponentProps<'dialog'>`, and the other two are on
	// `IDialogContent`, so all three would be accepted without the `Omit`.
	it('offers no way to re-role the overlay or add a close button', () => {
		expectTypeOf<IAlertDialogContent>().not.toHaveProperty('role');
		expectTypeOf<IAlertDialogContent>().not.toHaveProperty('showCloseButton');
		expectTypeOf<IAlertDialogContent>().not.toHaveProperty('icon');
		expectTypeOf<IAlertDialogContent>().not.toHaveProperty('footer');
	});
});
