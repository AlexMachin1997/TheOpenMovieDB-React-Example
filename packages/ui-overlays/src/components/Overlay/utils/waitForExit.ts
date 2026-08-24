/** Never hold an overlay open longer than this, whatever the animations claim. */
const EXIT_DEADLINE_CAP_MS = 1000;

/** Slack on top of an animation's own end time, to absorb a late final frame. */
const EXIT_GRACE_MS = 50;

/**
 * Resolve once the exit animations on these elements have finished, or once they have had long
 * enough that they never will.
 *
 * The deadline is not belt and braces, it is load-bearing. `animation.finished` is the accurate
 * signal while a page is visible, but a hidden or throttled page freezes animations at
 * `currentTime: 0` and they never resolve at all — which would leave the overlay open for as long
 * as the fallback allows. Deriving the deadline from the animations' own `endTime` keeps the
 * fallback proportionate: a 200ms fade waits 250ms, not a flat second.
 *
 * Deliberately reads `getAnimations()` on the given elements only, never their subtrees: a spinner
 * inside a dialog runs `iterations: Infinity`, and waiting on that would hold the dialog open for
 * good. The `Infinity` filter below covers the same hazard if an element ever animates that way
 * itself.
 */
export const waitForExit = (elements: (Element | null)[], signal: AbortSignal) => {
	const animations = elements
		.filter((element): element is Element => element !== null)
		// `getAnimations()` flushes pending style changes, so this sees the exit animations applied
		// by the `data-state='closed'` classes in the same commit.
		.flatMap((element) => element.getAnimations())
		.filter((animation) => animation.effect?.getComputedTiming().iterations !== Infinity);

	// Nothing to wait for, which is also what reduced motion looks like.
	if (animations.length === 0) return Promise.resolve();

	const longestEndTime = animations.reduce((longest, animation) => {
		const endTime = Number(animation.effect?.getComputedTiming().endTime ?? 0);
		return Number.isFinite(endTime) ? Math.max(longest, endTime) : longest;
	}, 0);

	const deadline = Math.min(longestEndTime + EXIT_GRACE_MS, EXIT_DEADLINE_CAP_MS);

	return new Promise<void>((resolve) => {
		let timeout = 0;

		const settle = () => {
			window.clearTimeout(timeout);
			signal.removeEventListener('abort', settle);
			resolve();
		};

		timeout = window.setTimeout(settle, deadline);
		signal.addEventListener('abort', settle, { once: true });

		void Promise.allSettled(animations.map((animation) => animation.finished)).then(settle);
	});
};
