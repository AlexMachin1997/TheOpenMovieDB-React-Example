import { createContext } from 'react';
import type { IFormContext } from '~/components/Form/Form.types';

/**
 * Carries the form instance and the form-level error message to every descendant of a `Form`.
 *
 * This is what removes the `form` prop from `FormField` and the six bound field components — naming
 * a field becomes the only thing a caller writes.
 *
 * Lives in its own file rather than beside `Form` because `react-refresh/only-export-components` is
 * an **error** in this repo's ESLint config: a module exporting a component may export nothing else.
 */
export const FormContext = createContext<IFormContext | null>(null);
