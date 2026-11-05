import { describe, it, expectTypeOf } from 'vitest';

import type { IAlertDialogContent } from '~/components/AlertDialog/AlertDialog.types';

// AC7 is a claim about compilation, so it cannot be a `play()`. Only `pnpm check-types` runs these.
describe('IAlertDialogContent', () => {
	it('requires the title, the description and both actions', () => {
		expectTypeOf<Omit<IAlertDialogContent, 'title'>>().not.toExtend<IAlertDialogContent>();
		expectTypeOf<Omit<IAlertDialogContent, 'description'>>().not.toExtend<IAlertDialogContent>();
		expectTypeOf<Omit<IAlertDialogContent, 'cancel'>>().not.toExtend<IAlertDialogContent>();
		expectTypeOf<Omit<IAlertDialogContent, 'confirm'>>().not.toExtend<IAlertDialogContent>();
	});

	it('offers no way to override what the component guarantees', () => {
		expectTypeOf<IAlertDialogContent>().not.toHaveProperty('role');
		expectTypeOf<IAlertDialogContent>().not.toHaveProperty('showCloseButton');
		expectTypeOf<IAlertDialogContent>().not.toHaveProperty('icon');
		expectTypeOf<IAlertDialogContent>().not.toHaveProperty('footer');
	});

	it('offers no way to break the shared surface', () => {
		expectTypeOf<IAlertDialogContent>().not.toHaveProperty('onClick');
		expectTypeOf<IAlertDialogContent>().not.toHaveProperty('onKeyDown');
		expectTypeOf<IAlertDialogContent>().not.toHaveProperty('onCancel');
		expectTypeOf<IAlertDialogContent>().not.toHaveProperty('onClose');
		expectTypeOf<IAlertDialogContent>().not.toHaveProperty('ref');
		expectTypeOf<IAlertDialogContent>().not.toHaveProperty('slot');
		expectTypeOf<IAlertDialogContent>().not.toHaveProperty('popover');
		expectTypeOf<IAlertDialogContent>().not.toHaveProperty('open');
		expectTypeOf<IAlertDialogContent>().not.toHaveProperty('aria-modal');
	});

	it('leaves the caller what is theirs', () => {
		expectTypeOf<IAlertDialogContent>().toHaveProperty('className');
		expectTypeOf<IAlertDialogContent>().toHaveProperty('id');
		expectTypeOf<IAlertDialogContent>().toHaveProperty('style');
		expectTypeOf<IAlertDialogContent>().toHaveProperty('aria-label');
		expectTypeOf<IAlertDialogContent>().toHaveProperty('onRequestClose');
	});
});
