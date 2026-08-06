import { describe, it, expectTypeOf } from 'vitest';
import { useForm } from '@tanstack/react-form';
import type { IFormApiLike } from '~/components/Form/Form.types';

interface IAccount {
	email: string;
	age: number;
}

/**
 * Never called. It exists so TypeScript infers a genuine `useForm` result — with all twelve
 * generics resolved the way a real call site resolves them — for the assertion below to check
 * against. Named `use…` so `react-hooks/rules-of-hooks` reads it as a custom hook rather than a
 * plain function calling a hook.
 */
const useAccountForm = () =>
	useForm({
		defaultValues: { email: '', age: 0 } satisfies IAccount,
		onSubmit: async () => {}
	});

describe('IFormApiLike', () => {
	// Only `check-types` catches this — `vitest run` does not typecheck. It is here so that if
	// TanStack changes the shape `useForm` returns, the build fails rather than `Form` silently
	// accepting something that no longer carries `Field`, `store` or `handleSubmit`.
	it('accepts a real useForm result', () => {
		expectTypeOf<ReturnType<typeof useAccountForm>>().toExtend<IFormApiLike>();
	});

	// The trade recorded in the spec: the form travels by context, context is not generic, so
	// `TFormData` is `any` and `name` is a plain string. This pins the consequence rather than
	// leaving it as prose — `DeepKeys<any>` is `string`, not `never`, which is what keeps
	// `form.Field`'s own typing working instead of being cast around.
	it('leaves field names as plain strings', () => {
		expectTypeOf<Parameters<IFormApiLike['Field']>[0]['name']>().toEqualTypeOf<string>();
	});
});
