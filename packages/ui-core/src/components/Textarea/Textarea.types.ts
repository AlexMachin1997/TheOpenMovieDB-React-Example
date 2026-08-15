import * as React from 'react';

/**
 * Properties for the Textarea component.
 *
 * Extends the native HTML `<textarea>` props.
 *
 * @example
 * ```tsx
 * <Textarea placeholder="Write your message..." />
 * ```
 */
// A type alias rather than an empty `interface … extends`: it adds no members, so there is nothing
// for the interface form to carry. `ILabel` and `SelectProps` are aliases too. Both spellings lint
// clean — see docs/16-type-hygiene/plan.md.
export interface ITextarea extends React.ComponentProps<'textarea'> {}
