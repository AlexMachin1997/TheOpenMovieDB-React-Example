/**
 * The props every bound field shares, as Storybook `argTypes`.
 *
 * These are what fill the prop table on each field's docs page. They are declared explicitly rather
 * than left to docgen because the field components are arrow functions with their props supplied by
 * a type alias, which react-docgen does not extract — leaving the table empty with nothing pointing
 * at the cause.
 *
 * Plain data, no React, so it belongs in `__fixtures__/`.
 */
export const boundFieldArgTypes = {
	name: {
		control: 'text',
		description:
			"The field's name, resolved against the surrounding `Form`. A plain string — nothing checks it exists."
	},
	label: {
		control: 'text',
		description: 'Names the control. Never omit it in favour of a placeholder.'
	},
	description: {
		control: 'text',
		description: 'Helper text shown under the control, alongside any error.'
	},
	required: {
		control: 'boolean',
		description:
			'Renders a native `required` attribute plus a non-colour indicator. `Form` sets `noValidate`, so this does not hand validation back to the browser.',
		table: { defaultValue: { summary: 'false' } }
	},
	disabled: {
		control: 'boolean',
		description: 'Disables the control.',
		table: { defaultValue: { summary: 'false' } }
	},
	showErrorsWhen: {
		control: 'select',
		options: ['touched', 'blurred', 'always'],
		description:
			'When the error becomes visible. `touched` also covers submit, which marks every mounted field touched.',
		table: { defaultValue: { summary: 'touched' } }
	},
	validators: {
		control: false,
		description: "Passed straight through to the form library's own field component."
	},
	id: {
		control: 'text',
		description: "The control's DOM id. Defaults to `name`.",
		table: { defaultValue: { summary: 'name' } }
	}
} as const;
