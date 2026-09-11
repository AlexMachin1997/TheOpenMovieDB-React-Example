import { describe, expect, it } from 'vitest';

import { toAnchorName } from '~/components/Popover/utils/toAnchorName';

/** A custom property name: two hyphens, then identifier characters. */
const DASHED_IDENT = /^--[\w-]+$/;

describe('toAnchorName', () => {
	it.each(['«r0»', ':r1:', '_r_2_', '«R2l5bb»'])(
		'turns the React id %s into a valid dashed ident',
		(reactId) => {
			expect(toAnchorName(reactId)).toMatch(DASHED_IDENT);
		}
	);

	it('returns the same name for the same id, so a re-render keeps the anchor', () => {
		expect(toAnchorName('«r0»')).toBe(toAnchorName('«r0»'));
	});

	it('keeps different ids apart, so two popovers cannot share an anchor', () => {
		expect(toAnchorName('«r0»')).not.toBe(toAnchorName('«r1»'));
	});
});
