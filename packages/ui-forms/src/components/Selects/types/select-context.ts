/**
 * Context value interface for select functionality
 *
 * This interface defines select-specific functionality without extending the command context.
 * Command functionality is reached directly through `useCommandContext`.
 *
 * The two contexts stay layered rather than merged, deliberately. `Command` is a standalone
 * component that `Select` happens to be built from — it has to keep working on its own, as a search
 * dialog for instance — so folding selection state into it would couple the two. They are also
 * disjoint in practice: everything below is selection, and nothing below is something
 * `ICommandContext` already carries.
 *
 * @interface SelectContext
 */
export interface ISelectContext {
	/** Set of currently selected values */
	selectedValues: Set<string>;
	/** Function to toggle a value's selection state */
	toggleValue: (value: string) => void;
	/** Selection mode - either 'single' or 'multiple' */
	mode: 'single' | 'multiple';
}
