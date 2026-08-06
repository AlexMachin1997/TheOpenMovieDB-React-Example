import { cva } from 'class-variance-authority';

// The base string is `Label`'s original class list verbatim, minus `font-medium` — the weight moved
// into the `emphasis` variant so a field label and a per-item checkbox label can differ without
// either one hand-writing a Tailwind class. See docs/05-ui-forms-field-pattern/plan.md, D4.
export const labelVariants = cva(
	'flex items-center gap-2 text-sm leading-none select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
	{
		variants: {
			emphasis: {
				true: 'font-semibold',
				false: 'font-medium'
			}
		},
		defaultVariants: {
			// Emphasised by default: the common case is a field or group heading, which should read
			// as the heading of its control. `CheckboxLabel`/`RadioLabel` opt out, because a per-item
			// option label sits beside its control rather than above a whole field.
			emphasis: true
		}
	}
);
