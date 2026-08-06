import type { IFormApiLike } from '~/components/Form/Form.types';

/**
 * What counts as focusable for the purpose of landing on a control.
 *
 * `[tabindex="-1"]` is deliberately excluded: an element can be focused programmatically despite it,
 * but inside a Radix roving-focus group every item but one carries it, and focusing the wrong one
 * desynchronises the group's tab stop.
 */
const FOCUSABLE = [
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'button:not([disabled])',
	'a[href]',
	'[tabindex]:not([tabindex="-1"])'
].join(', ');

/**
 * Moves focus to the first invalid control in the form, in **document** order.
 *
 * Removing the browser's constraint validation removed its focus behaviour with it. This restores
 * it, and it fires only in response to an explicit submit — never while the user is typing.
 *
 * **Names come from form state; order comes from the DOM.** The obvious implementation queries
 * `[aria-invalid="true"]`, but that attribute only exists once React has re-rendered, and
 * `await form.handleSubmit()` resolving means the *store* settled rather than that React committed.
 * A DOM query on the next line reads the pre-submission DOM. Reading which fields are invalid from
 * `fieldMeta` avoids that entirely — but `fieldMeta` is in registration order, which is not what
 * "first" means to someone looking at the page. Handing `querySelector` a comma-joined selector
 * gets both: it returns the first match in document order, not the first entry in the list.
 *
 * This works because each bound field defaults its control's `id` to its `name`.
 *
 * @param form The form instance, read after its submission has settled.
 * @param formElement The `<form>` to search within, so a nested form cannot steal focus.
 */
export const focusFirstInvalid = (form: IFormApiLike, formElement: HTMLFormElement): void => {
	const selector = Object.entries(form.state.fieldMeta)
		.filter(([, meta]) => meta.errors.length > 0)
		// Names can be array paths like `people[0].email` — valid in an id attribute, and a syntax
		// error in a bare CSS selector.
		.map(([name]) => `#${CSS.escape(name)}`)
		.join(', ');

	if (selector === '') {
		return;
	}

	const match = formElement.querySelector<HTMLElement>(selector);

	if (match === null) {
		return;
	}

	if (match.matches(FOCUSABLE)) {
		match.focus();
		return;
	}

	// The match is a container rather than a control — a `RadioGroup` carries the id on its
	// `<div role="radiogroup">` while a radio inside it holds the tab stop. Prefer the element the
	// group has nominated, then anything focusable at all.
	const nominated = match.querySelector<HTMLElement>('[tabindex="0"]');
	(nominated ?? match.querySelector<HTMLElement>(FOCUSABLE))?.focus();
};
