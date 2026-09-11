import { within, userEvent, expect, waitFor } from 'storybook/test';

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

/**
 * Returns the combobox trigger button from the story canvas.
 */
export const getTrigger = (canvasElement: HTMLElement) => {
	return within(canvasElement).getByRole('combobox');
};

/**
 * Returns the open select's listbox (rendered in a portal on `document.body`).
 *
 * The popover around it has no role — it has no name, so it claims nothing — which makes the
 * listbox the thing to query. `openSelect` separately proves the trigger's `aria-controls` leads
 * here.
 */
export const getListbox = () => {
	return within(document.body).getByRole('listbox');
};

/**
 * Returns a specific option inside the open listbox by its accessible name.
 * Auto-retries — the option may not exist yet if the search debounce (or, for large
 * virtualized lists, the subsequent re-render) hasn't settled.
 */
export const getOption = (name: string) => {
	return within(getListbox()).findByRole('option', { name });
};

/**
 * Returns the search input of the open select.
 *
 * Queried from the document, not the listbox: the input is the listbox's sibling inside the popover,
 * and only one select is open at a time.
 */
export const getSearchInput = () => {
	return within(document.body).getByRole('textbox');
};

// ---------------------------------------------------------------------------
// Action helpers
// ---------------------------------------------------------------------------

/**
 * Opens the select dropdown by clicking the trigger.
 * Asserts the trigger transitions to `aria-expanded="true"`, and that its `aria-controls`
 * resolves to the listbox its `aria-haspopup` promises.
 */
export const openSelect = async (canvasElement: HTMLElement) => {
	const trigger = getTrigger(canvasElement);
	await userEvent.click(trigger);
	await expect(trigger).toHaveAttribute('aria-expanded', 'true');

	// Waits for the transition, not the outcome: the attribute is absent until the listbox mounts
	// and reports its id.
	await waitFor(() => expect(trigger).toHaveAttribute('aria-controls', getListbox().id));

	return trigger;
};

/**
 * Closes the select dropdown by pressing Escape.
 * Asserts the trigger transitions to `aria-expanded="false"`.
 */
export const closeSelect = async (canvasElement: HTMLElement) => {
	const trigger = getTrigger(canvasElement);
	await userEvent.keyboard('{Escape}');
	await expect(trigger).toHaveAttribute('aria-expanded', 'false');
};

/**
 * Types a search term into the search input of the open select.
 */
export const searchFor = async (term: string) => {
	const input = getSearchInput();
	await userEvent.clear(input);
	await userEvent.type(input, term);
	// Wait for the debounce to trigger the search (Command uses a debounce scale)
	await new Promise((resolve) => setTimeout(resolve, 350));
};

/**
 * Selects an option by its accessible name inside the open listbox.
 */
export const selectOption = async (name: string) => {
	const option = await getOption(name);
	await userEvent.click(option);
};

// ---------------------------------------------------------------------------
// Assertion helpers
// ---------------------------------------------------------------------------

/**
 * Asserts the trigger is in its closed state and shows the expected placeholder.
 */
export const expectClosed = async (canvasElement: HTMLElement, placeholder: string) => {
	const trigger = getTrigger(canvasElement);
	await expect(trigger).toBeInTheDocument();
	await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	await expect(trigger).toHaveTextContent(placeholder);
};

/**
 * Asserts the trigger shows a specific selected value text.
 */
export const expectTriggerText = async (canvasElement: HTMLElement, text: string) => {
	const trigger = getTrigger(canvasElement);
	await expect(trigger).toHaveTextContent(text);
};

/**
 * Asserts a given option is visible inside the open listbox.
 */
export const expectOptionVisible = async (name: string) => {
	const option = await getOption(name);
	await expect(option).toBeInTheDocument();
};

/**
 * Asserts that no option with the given name exists inside the open listbox.
 */
export const expectNoOption = async (name: string) => {
	const option = within(getListbox()).queryByRole('option', { name });
	await expect(option).not.toBeInTheDocument();
};
