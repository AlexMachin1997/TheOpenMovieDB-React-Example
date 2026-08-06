import type * as React from 'react';
import type { Button } from '@repo/ui-core';

/**
 * `Button`'s own props, derived from the component rather than imported by name — `ui-core` exports
 * `Button` but not `IButton`, and adding that export for one consumer is a bigger change than this.
 */
type ButtonProps = React.ComponentProps<typeof Button>;

/**
 * Properties for the SubmitButton component.
 *
 * Three of `Button`'s props are omitted rather than forwarded:
 *
 * - **`type`**, because submit semantics are the entire reason this component exists. `Button`
 *   defaults to `type='button'` deliberately, so a plain `<Button>Save</Button>` inside a form
 *   renders correctly, looks right, and does nothing at all.
 * - **`loading`**, because it is driven by the form's own submitting state. A caller-supplied value
 *   would either fight it or lie about it.
 * - **`asChild`**, because `Button` only applies the native `disabled` attribute when it renders a
 *   real `<button>`. Slotting something else would silently lose both the in-flight guarantee and
 *   the `type` attribute — the exact failure this component exists to prevent.
 *
 * `disabled` is kept: a caller may have their own reason to disable the button, and it is OR-ed
 * with the form's.
 *
 * @example
 * ```tsx
 * <SubmitButton>Create account</SubmitButton>
 * ```
 */
export type ISubmitButton = Omit<ButtonProps, 'type' | 'loading' | 'asChild'>;
