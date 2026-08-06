export { Form } from '~/components/Form/Form';

// `useForm` is an untouched re-export — nothing here wraps, extends or replaces it.
//
// It used to live in a `form.ts` beside this file. That name cannot coexist with `Form.tsx` on a
// case-insensitive filesystem: TypeScript refuses two modules whose paths differ only in casing, so
// `~/components/Form/Form` resolved to the wrong one and the barrel failed to compile. A one-line
// re-export belongs in the barrel anyway.
export { useForm } from '@tanstack/react-form';
export { useFormContext } from '~/components/Form/hooks/useFormContext';
export type { IForm, IFormApiLike, IFormContext } from '~/components/Form/Form.types';
