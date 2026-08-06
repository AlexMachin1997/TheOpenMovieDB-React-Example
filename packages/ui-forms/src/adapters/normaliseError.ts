/**
 * Normalises an unknown error-ish value to a displayable string.
 *
 * Three shapes reach this, from three unrelated directions, which is why it is defensive rather than
 * a cast:
 *
 * - a plain `string`, which is what a hand-written validator function conventionally returns;
 * - an object carrying `message` — a Standard Schema issue from zod and friends, and also every
 *   `Error` instance, which is what `Form` catches out of a failed submission;
 * - anything else at all, because a validator can return whatever it likes.
 *
 * Returns `undefined` for anything it cannot turn into text, **including empty and whitespace-only
 * strings**. A blank message would put a field in a permanently invalid-but-silent state, and would
 * make a form-level live region announce nothing at all — both worse than showing nothing and
 * falling back to generic wording.
 */
export const normaliseError = (candidate: unknown): string | undefined => {
	if (typeof candidate === 'string') {
		return candidate.trim() === '' ? undefined : candidate;
	}

	if (typeof candidate === 'object' && candidate !== null && 'message' in candidate) {
		const { message } = candidate as { message: unknown };
		return typeof message === 'string' && message.trim() !== '' ? message : undefined;
	}

	return undefined;
};
