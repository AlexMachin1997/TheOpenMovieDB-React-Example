// Deliberately absent from `packages/ui-core/src/index.ts`. `FieldMessage` is `Field`'s internal
// rendering of a description or validation message, not a standalone export — see
// docs/05-ui-forms-field-pattern/spec.md, Acceptance Criteria. This barrel exists for use inside the
// package; promote it to the public surface only when a second, genuinely separate use case for an
// icon+text status line turns up.
export { FieldMessage } from '~/components/FieldMessage/FieldMessage';
export type {
	IFieldMessage,
	FieldMessageVariant
} from '~/components/FieldMessage/FieldMessage.types';
