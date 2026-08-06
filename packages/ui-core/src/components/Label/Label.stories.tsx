import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Label } from '~/components/Label/Label';
import type { ILabel } from '~/components/Label/Label.types';
import { Input } from '~/components/Input/Input';
import { Checkbox, CheckboxLabel } from '~/components/Checkbox/Checkbox';

const meta: Meta<ILabel> = {
	title: 'UI Core/Label',
	// `<Controls />` and the primary block in the MDX page both resolve their args from here.
	component: Label,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		emphasis: {
			control: 'boolean',
			description: 'Renders bold rather than at the default text weight.',
			table: { defaultValue: { summary: 'true' } }
		},
		required: {
			control: 'boolean',
			description: 'Renders a `*` symbol plus a visually-hidden `(required)`.',
			table: { defaultValue: { summary: 'false' } }
		},
		nativeLabel: {
			control: 'boolean',
			description: 'Whether to render a native `<label>` or a plain `<span>`.',
			table: { defaultValue: { summary: 'true' } }
		}
	}
};

export default meta;

// `Label`'s props are a union (native vs non-native), and a union collapses
// `StoryObj<typeof meta>`'s `args` to `never` — every story then fails to compile asking for an
// `args` it cannot satisfy. `Select` hit this first, its props being a union too; follow its shape
// and type the stories against the props directly rather than against the meta.
type Story = StoryObj<ILabel>;

// The same union also strips the inferred `play` context, so it has to be annotated. `Select` does
// this inline per story; one alias keeps it to a single place.
type PlayContext = {
	canvasElement: HTMLElement;
	step: (label: string, run: () => Promise<void>) => void | Promise<void>;
};

export const Default: Story = {
	render: () => (
		<div className='grid gap-2'>
			<Label htmlFor='email'>Email address</Label>
			<Input id='email' type='email' placeholder='john@example.com' />
		</div>
	),
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Input, Label } from '@repo/ui-core';

<Label htmlFor='email'>Email address</Label>
<Input id='email' type='email' />`
			}
		}
	}
};

export const Required: Story = {
	render: () => (
		<div className='grid gap-2'>
			<Label htmlFor='full-name' required>
				Full name
			</Label>
			<Input id='full-name' type='text' required />
		</div>
	),
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Input, Label } from '@repo/ui-core';

<Label htmlFor='full-name' required>Full name</Label>
<Input id='full-name' type='text' required />`
			}
		}
	}
};

export const Weights: Story = {
	render: () => (
		<div className='grid gap-4'>
			<Label htmlFor='emphasised'>Emphasised — the default</Label>
			<Label htmlFor='unemphasised' emphasis={false}>
				Unemphasised — what per-item option labels use
			</Label>
		</div>
	)
};

export const NonNative: Story = {
	render: () => (
		<div className='grid gap-2'>
			<Label nativeLabel={false}>A heading, labelling nothing in particular</Label>
			<p className='text-muted-foreground text-sm'>
				Rendered as a <code>&lt;span&gt;</code>. Used outside a group like this, it needs no
				association wiring at all.
			</p>
		</div>
	),
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Label } from '@repo/ui-core';

<Label nativeLabel={false}>Section heading</Label>`
			}
		}
	}
};

export const AsAGroupHeading: Story = {
	render: () => (
		<div className='grid gap-3'>
			<Label nativeLabel={false} id='notify-heading' required>
				Notify me about
			</Label>

			{/* The association runs the opposite way from a native label: the group points back at
			the heading's id, because a <span> cannot claim a control with htmlFor. */}
			<div role='group' aria-labelledby='notify-heading' aria-required='true' className='grid gap-3'>
				<div className='flex items-center space-x-2'>
					<Checkbox id='notify-comments' />
					<CheckboxLabel htmlFor='notify-comments'>Comments</CheckboxLabel>
				</div>
				<div className='flex items-center space-x-2'>
					<Checkbox id='notify-mentions' defaultChecked />
					<CheckboxLabel htmlFor='notify-mentions'>Mentions</CheckboxLabel>
				</div>
			</div>
		</div>
	),
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Checkbox, CheckboxLabel, Label } from '@repo/ui-core';

<Label nativeLabel={false} id='notify-heading' required>Notify me about</Label>

<div role='group' aria-labelledby='notify-heading' aria-required='true'>
  <Checkbox id='notify-comments' />
  <CheckboxLabel htmlFor='notify-comments'>Comments</CheckboxLabel>
</div>`
			}
		}
	},
	play: async ({ canvasElement, step }: PlayContext) => {
		const canvas = within(canvasElement);

		await step('The group takes its accessible name from the non-native label', async () => {
			await expect(canvas.getByRole('group', { name: /Notify me about/ })).toBeInTheDocument();
		});

		await step('Each option still reports its own per-item label separately', async () => {
			await expect(canvas.getByRole('checkbox', { name: 'Comments' })).toBeInTheDocument();
			await expect(canvas.getByRole('checkbox', { name: 'Mentions' })).toBeInTheDocument();
		});
	}
};

export const NativeLabelFocusesItsControl: Story = {
	render: () => (
		<div className='grid gap-6'>
			<div className='grid gap-2'>
				<Label htmlFor='claims-it'>Claims the input below</Label>
				<Input id='claims-it' type='text' />
			</div>

			<div className='grid gap-2'>
				<Label nativeLabel={false} data-testid='non-native'>
					Claims nothing
				</Label>
				<Input id='unclaimed' type='text' />
			</div>
		</div>
	),
	play: async ({ canvasElement, step }: PlayContext) => {
		const canvas = within(canvasElement);
		const claimed = canvas.getByRole('textbox', { name: 'Claims the input below' });

		await step('Clicking a native label focuses the control it names', async () => {
			await userEvent.click(canvas.getByText('Claims the input below'));
			await expect(claimed).toHaveFocus();
		});

		await step('Clicking a non-native label focuses nothing', async () => {
			// Renders a <span>, so there is no htmlFor and no implicit activation behaviour. This is
			// the whole reason `htmlFor` is typed as `never` in non-native mode.
			await userEvent.click(canvas.getByTestId('non-native'));
			await expect(claimed).not.toHaveFocus();
			await expect(canvas.getByRole('textbox', { name: '' })).not.toHaveFocus();
		});
	}
};

export const RequiredIsNotConveyedByColourAlone: Story = {
	render: () => (
		<div className='grid gap-2'>
			<Label htmlFor='required-input' required data-testid='required-label'>
				Full name
			</Label>
			<Input id='required-input' type='text' required />
		</div>
	),
	play: async ({ canvasElement, step }: PlayContext) => {
		const canvas = within(canvasElement);

		await step('The symbol is hidden from assistive technology', async () => {
			const symbol = canvas.getByText('*');
			await expect(symbol).toHaveAttribute('aria-hidden', 'true');
		});

		await step('A visually-hidden "(required)" carries the meaning instead', async () => {
			await expect(canvas.getByText('(required)')).toHaveClass('sr-only');
		});

		await step('And the control itself is marked required', async () => {
			await expect(canvas.getByRole('textbox', { name: /Full name/ })).toBeRequired();
		});
	}
};

export const EmphasisRegressionGuard: Story = {
	render: () => (
		<div className='grid gap-3'>
			<Label htmlFor='guard-default' data-testid='default-weight'>
				Default weight
			</Label>

			<div className='flex items-center space-x-2'>
				<Checkbox id='guard-checkbox' />
				<CheckboxLabel htmlFor='guard-checkbox' data-testid='checkbox-weight'>
					Per-item option weight
				</CheckboxLabel>
			</div>
		</div>
	),
	play: async ({ canvasElement, step }: PlayContext) => {
		const canvas = within(canvasElement);

		await step('A bare Label is emphasised by default', async () => {
			await expect(canvas.getByTestId('default-weight')).toHaveClass('font-semibold');
		});

		await step('CheckboxLabel opts out, keeping the weight it had before `emphasis` existed', async () => {
			const checkboxLabel = canvas.getByTestId('checkbox-weight');
			await expect(checkboxLabel).toHaveClass('font-medium');
			await expect(checkboxLabel).not.toHaveClass('font-semibold');
		});
	}
};
