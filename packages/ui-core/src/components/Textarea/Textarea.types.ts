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
// A type alias rather than an empty `interface … extends`, which is what
// `@typescript-eslint/no-empty-object-type` was warning about — it adds no members, so the
// interface form buys nothing and costs a lint warning. `ILabel` and `SelectProps` are aliases too.
export type ITextarea = React.ComponentProps<'textarea'>;
