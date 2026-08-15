import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import type { Option } from '@repo/core';
import { RadioGroup } from './RadioGroup';
import { Field } from '../Field/Field';

const meta: Meta<typeof RadioGroup> = {
	title: 'UI Core/Radio group',
	// Required for the MDX page: `<Controls />` and the primary story block both resolve their
	// args from here. Without it the docs page renders "No Preview" and an error panel.
	component: RadioGroup,
	parameters: {
		layout: 'centered'
	}
};

export default meta;

const sampleOptions: Option[] = [
	{ id: 'plan-1', value: 'monthly', label: 'Monthly' },
	{ id: 'plan-2', value: 'quarterly', label: 'Quarterly' },
	{ id: 'plan-3', value: 'yearly', label: 'Yearly' }
];

const sampleOptionsWithDisabled: Option[] = [
	{ id: 'plan-1', value: 'monthly', label: 'Monthly' },
	{ id: 'plan-2', value: 'quarterly', label: 'Quarterly (Disabled)', disabled: true },
	{ id: 'plan-3', value: 'yearly', label: 'Yearly' }
];

type RadioGroupTemplateProps = Omit<
	React.ComponentProps<typeof RadioGroup>,
	'value' | 'onChange'
> & {
	initialValue?: string;
};

const RadioGroupTemplate = ({ options, initialValue = '', ...props }: RadioGroupTemplateProps) => {
	const [currentValue, setCurrentValue] = React.useState(initialValue);

	return (
		<div className='space-y-4'>
			<RadioGroup
				{...props}
				options={options}
				value={currentValue}
				onChange={(data) => setCurrentValue(data.value)}
			/>
			<div className='p-3 bg-gray-50 rounded border'>
				<p className='text-sm font-medium text-gray-700'>Current Selection:</p>
				<p className='text-sm text-gray-600'>{currentValue || 'None selected'}</p>
			</div>
		</div>
	);
};

export const Default: StoryObj<typeof RadioGroup> = {
	render: () => <RadioGroupTemplate options={sampleOptions} name='plan' />
};

export const WithInitialSelection: StoryObj<typeof RadioGroup> = {
	render: () => <RadioGroupTemplate options={sampleOptions} name='plan' initialValue='quarterly' />
};

export const WithDisabledOption: StoryObj<typeof RadioGroup> = {
	render: () => <RadioGroupTemplate options={sampleOptionsWithDisabled} name='plan' />
};

export const WithDisabledGroup: StoryObj<typeof RadioGroup> = {
	render: () => <RadioGroupTemplate options={sampleOptions} name='plan' disabled />
};

export const NoOptionsAvailable: StoryObj<typeof RadioGroup> = {
	render: () => <RadioGroupTemplate options={[]} name='plan' />
};

export const CustomNoOptionsMessage: StoryObj<typeof RadioGroup> = {
	render: () => (
		<RadioGroupTemplate
			options={[]}
			name='plan'
			noOptionsAvailableMessage='No billing plans are available for your account.'
		/>
	)
};

export const HorizontalLayout: StoryObj<typeof RadioGroup> = {
	render: () => (
		<RadioGroupTemplate
			options={sampleOptions}
			name='plan'
			className='grid-flow-col auto-cols-max'
		/>
	)
};

/**
 * `Radio` on its own is a `RadioGroupPrimitive.Item` and only works inside a group root. Before
 * this component existed a consumer had to import `@radix-ui/react-radio-group` directly to get
 * one working — this story is the proof that they no longer need to.
 */
export const SelectionWithoutReachingForRadix: StoryObj<typeof RadioGroup> = {
	render: () => <RadioGroupTemplate options={sampleOptions} name='plan' />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const monthly = canvas.getByRole('radio', { name: 'Monthly' });
		const quarterly = canvas.getByRole('radio', { name: 'Quarterly' });
		const yearly = canvas.getByRole('radio', { name: 'Yearly' });

		await step('Clicking an option selects it', async () => {
			await userEvent.click(quarterly);
			await waitFor(() => {
				expect(quarterly).toBeChecked();
			});
		});

		await step('Selecting another deselects the first — single selection is enforced', async () => {
			await userEvent.click(yearly);
			await waitFor(() => {
				expect(yearly).toBeChecked();
			});
			expect(quarterly).not.toBeChecked();
			expect(monthly).not.toBeChecked();
		});

		await step('The controlled value round-trips back into the group', async () => {
			await waitFor(() => {
				expect(canvas.getByText('yearly')).toBeInTheDocument();
			});
		});
	}
};

export const DisabledOptionCannotBeSelected: StoryObj<typeof RadioGroup> = {
	render: () => <RadioGroupTemplate options={sampleOptionsWithDisabled} name='plan' />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const disabledOption = canvas.getByRole('radio', { name: 'Quarterly (Disabled)' });

		await step('The disabled option is disabled and stays unselected', async () => {
			await expect(disabledOption).toBeDisabled();
			await userEvent.click(disabledOption, { pointerEventsCheck: 0 });
			await expect(disabledOption).not.toBeChecked();
		});
	}
};

/* -------------------------------------------------------------------------------------------------
 * Keyboard navigation
 *
 * These scripts are written to be character-identical to the ones in CheckboxGroup.stories.tsx,
 * apart from the role queried and the group component itself. RadioGroup gets this behaviour free
 * from RadioGroupPrimitive.Root; CheckboxGroup reproduces it by hand. Keeping the assertions
 * identical is what turns a future divergence into a test failure rather than a bug report.
 * ---------------------------------------------------------------------------------------------- */

const keyboardOptions: Option[] = [
	{ id: 'kb-1', value: 'apples', label: 'Apples' },
	{ id: 'kb-2', value: 'bananas', label: 'Bananas', disabled: true },
	{ id: 'kb-3', value: 'cherries', label: 'Cherries' },
	{ id: 'kb-4', value: 'dates', label: 'Dates' }
];

const KeyboardComponent = () => {
	const [currentValue, setCurrentValue] = React.useState('');

	return (
		<RadioGroup
			options={keyboardOptions}
			name='keyboard-group'
			value={currentValue}
			onChange={(data) => setCurrentValue(data.value)}
		/>
	);
};

export const KeyboardNavigationSkipsDisabled: StoryObj<typeof RadioGroup> = {
	render: () => <KeyboardComponent />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const items = canvas.getAllByRole('radio');

		await step('Tab enters the group on its single tab stop', async () => {
			await userEvent.tab();
			await expect(items[0]).toHaveFocus();
			await expect(items[0]).toHaveAttribute('tabindex', '0');
			await expect(items[2]).toHaveAttribute('tabindex', '-1');
		});

		await step('ArrowDown skips the disabled option entirely', async () => {
			await userEvent.keyboard('{ArrowDown}');
			await expect(items[2]).toHaveFocus();
			await expect(items[1]).not.toHaveFocus();
		});

		await step('ArrowRight advances, ArrowUp and ArrowLeft retreat', async () => {
			await userEvent.keyboard('{ArrowRight}');
			await expect(items[3]).toHaveFocus();

			await userEvent.keyboard('{ArrowUp}');
			await expect(items[2]).toHaveFocus();

			await userEvent.keyboard('{ArrowLeft}');
			await expect(items[0]).toHaveFocus();
		});

		await step('End jumps to the last enabled option, Home back to the first', async () => {
			await userEvent.keyboard('{End}');
			await expect(items[3]).toHaveFocus();

			await userEvent.keyboard('{Home}');
			await expect(items[0]).toHaveFocus();
		});

		await step('Arrowing past either end wraps around', async () => {
			await userEvent.keyboard('{ArrowUp}');
			await expect(items[3]).toHaveFocus();

			await userEvent.keyboard('{ArrowDown}');
			await expect(items[0]).toHaveFocus();
		});
	}
};

/**
 * The one deliberate difference between the two groups: arrowing a radio group also *selects*,
 * because that is radio semantics and what Radix does. `CheckboxGroup`'s equivalent story asserts
 * the opposite, and must keep doing so.
 *
 * The keys are held down (`{Arrow…>}`) rather than tapped, and that is load-bearing. Radix defers
 * its focus move with `setTimeout(() => focusFirst(...))`, while the flag that turns "focused" into
 * "selected" is set on a document `keydown` and cleared on `keyup`. A tap dispatches both faster
 * than the deferred callback runs, so the flag is already back to `false` by the time focus lands
 * and nothing gets selected — an artefact of synthetic input, not something a human can reproduce.
 * `{/ArrowDown}` releases at the end.
 */
export const ArrowKeysAlsoSelect: StoryObj<typeof RadioGroup> = {
	render: () => <KeyboardComponent />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const items = canvas.getAllByRole('radio');

		await step('Arrowing to an option selects it', async () => {
			await userEvent.tab();
			await userEvent.keyboard('{ArrowDown>}');
			await waitFor(() => {
				expect(items[2]).toHaveFocus();
			});
			await waitFor(() => {
				expect(items[2]).toBeChecked();
			});
			await userEvent.keyboard('{/ArrowDown}');
		});

		await step('Only one option is ever selected', async () => {
			await userEvent.keyboard('{ArrowDown>}');
			await waitFor(() => {
				expect(items[3]).toBeChecked();
			});
			await userEvent.keyboard('{/ArrowDown}');
			expect(items[2]).not.toBeChecked();
		});
	}
};

const SingleTabStopComponent = () => {
	const [currentValue, setCurrentValue] = React.useState('');

	return (
		<div className='space-y-2'>
			<button type='button'>before</button>
			<RadioGroup
				options={keyboardOptions}
				name='tab-stop-group'
				value={currentValue}
				onChange={(data) => setCurrentValue(data.value)}
			/>
			<button type='button'>after</button>
		</div>
	);
};

export const GroupIsASingleTabStop: StoryObj<typeof RadioGroup> = {
	render: () => <SingleTabStopComponent />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Tab reaches the group once, then leaves it entirely', async () => {
			await userEvent.tab();
			await expect(canvas.getByRole('button', { name: 'before' })).toHaveFocus();

			await userEvent.tab();
			await expect(canvas.getAllByRole('radio')[0]).toHaveFocus();

			await userEvent.tab();
			await expect(canvas.getByRole('button', { name: 'after' })).toHaveFocus();
		});
	}
};

const FieldComposition = () => {
	const [value, setValue] = React.useState('quarterly');

	return (
		<div className='w-96'>
			{/*
			 * `nativeLabel={false}` because a single native <label> cannot name several controls.
			 * Note the role: Radix's Root already reports `radiogroup`, which is more specific than
			 * `group` and is what makes assistive technology announce set position. RadioGroup
			 * therefore takes aria-labelledby but no role — see plan.md, D2.
			 */}
			<Field
				label='Billing plan'
				id='billing'
				nativeLabel={false}
				required
				description='You can change this later.'
			>
				{(control) => (
					<RadioGroup
						{...control}
						name='billing'
						options={sampleOptions}
						value={value}
						onChange={(data) => setValue(data.value)}
					/>
				)}
			</Field>
		</div>
	);
};

export const WithField: StoryObj<typeof RadioGroup> = {
	render: () => <FieldComposition />,
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Field, RadioGroup } from '@repo/ui-core';

<Field label='Billing plan' id='billing' nativeLabel={false} required>
  {(control) => (
    <RadioGroup {...control} name='billing' options={options} value={value} onChange={onChange} />
  )}
</Field>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('The group keeps radiogroup, and takes the heading as its name', async () => {
			// Deliberately NOT role='group': overwriting Radix's radiogroup to match the
			// requirement's literal wording would lose set-position announcements.
			const group = canvas.getByRole('radiogroup', { name: /Billing plan/ });
			await expect(group).toHaveAttribute('aria-labelledby', 'billing-label');
			await expect(group).toHaveAttribute('aria-describedby', 'billing-message');
			await expect(canvas.queryByRole('group')).not.toBeInTheDocument();
		});

		await step('Each option still reports its own per-item label separately', async () => {
			await expect(canvas.getByRole('radio', { name: 'Monthly' })).toBeInTheDocument();
			await expect(canvas.getByRole('radio', { name: 'Quarterly' })).toBeChecked();
			await expect(canvas.getByRole('radio', { name: 'Yearly' })).toBeInTheDocument();
		});

		await step('And the group is still operable', async () => {
			await userEvent.click(canvas.getByRole('radio', { name: 'Yearly' }));
			await waitFor(async () => {
				await expect(canvas.getByRole('radio', { name: 'Yearly' })).toBeChecked();
			});
		});
	}
};
