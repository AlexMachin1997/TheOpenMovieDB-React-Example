import * as React from 'react';

interface IUseOverlayLabelling {
	/** `'dialog'` or `'sheet'`, used to name the component in warnings. */
	slot: string;

	/** Warnings only fire while the overlay is open, so a closed one stays quiet. */
	open: boolean;

	ariaLabel?: string;
	ariaLabelledBy?: string;
	ariaDescribedBy?: string;

	/** Id of the heading rendered from the `title` prop, when one was supplied. */
	titleId?: string;

	/** Id of the paragraph rendered from the `description` prop, when one was supplied. */
	descriptionId?: string;
}

/**
 * Work out what names and describes an overlay, and say so when nothing does.
 *
 * Four routes can name one: an `aria-labelledby` from the caller, an `aria-label` from the caller,
 * the `title` prop, or a compound title in `children`. They are ranked in that order — a caller who
 * writes ARIA by hand always beats what the component would have generated (requirement 4), and the
 * documented props path beats the escape hatch (ADR-6).
 *
 * Descriptions follow the same ranking but stop short of one rule: if nothing described the
 * overlay, no attribute is emitted at all. An `aria-describedby` pointing at an id that does not
 * exist is worse than its absence (ADR-3), and owning the primitive is what makes "did anything
 * describe this?" answerable rather than guessed.
 */
export const useOverlayLabelling = ({
	slot,
	open,
	ariaLabel,
	ariaLabelledBy,
	ariaDescribedBy,
	titleId,
	descriptionId
}: IUseOverlayLabelling) => {
	// Titles and descriptions lend the overlay their ids rather than the overlay hunting for them in
	// the DOM. Owning the primitive is what makes this possible, and it is the whole reason the
	// warnings below can tell "nothing named this" from "something named it somewhere I cannot see".
	const [titleIds, setTitleIds] = React.useState<string[]>([]);
	const [descriptionIds, setDescriptionIds] = React.useState<string[]>([]);

	const registerTitle = React.useCallback((id: string) => {
		setTitleIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
		return () => setTitleIds((ids) => ids.filter((existing) => existing !== id));
	}, []);

	const registerDescription = React.useCallback((id: string) => {
		setDescriptionIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
		return () => setDescriptionIds((ids) => ids.filter((existing) => existing !== id));
	}, []);

	const labelledBy = ariaLabelledBy ?? (ariaLabel ? undefined : (titleId ?? titleIds[0]));
	const describedBy = ariaDescribedBy ?? descriptionId ?? descriptionIds[0];

	const component = slot === 'sheet' ? 'SheetContent' : 'DialogContent';
	const titlePart = slot === 'sheet' ? 'SheetTitle' : 'DialogTitle';

	// In an effect rather than in render, unlike `Button`'s equivalent: children register their ids
	// on mount, which lands a commit after the parent renders, so a render-phase check would report
	// every correctly-labelled overlay as unnamed on its first paint.
	React.useEffect(() => {
		if (!open) return;

		if (!ariaLabel && !labelledBy) {
			console.warn(
				`[ui-overlays] ${component}: this overlay has no accessible name. Pass a \`title\`, render a \`${titlePart}\`, or set \`aria-label\` — without one it is announced as nothing but "dialog".`
			);
		}

		if (titleId && titleIds.length > 1) {
			console.warn(
				`[ui-overlays] ${component}: a \`title\` prop and a \`${titlePart}\` in \`children\` both name this overlay. Both render, and the prop is what names it. Remove one.`
			);
		}
	}, [open, ariaLabel, labelledBy, titleId, titleIds.length, component, titlePart]);

	return { registerTitle, registerDescription, labelledBy, describedBy };
};
