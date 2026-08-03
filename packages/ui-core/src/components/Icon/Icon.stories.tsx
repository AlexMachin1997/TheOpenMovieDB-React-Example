import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Icon } from '~/components/Icon/Icon';
import { Button } from '~/components/Button/Button';
import { ICON_NAMES, type IconName } from '~/components/Icon/Icon.constants';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

const SIZE_PIXELS: Record<(typeof SIZES)[number], string> = {
	xs: '12px',
	sm: '14px',
	md: '16px',
	lg: '20px',
	xl: '24px'
};

/** Backs the ChosenAtRuntime story — see its docs source for the pattern. */
const STATUS_ICONS: Record<'ok' | 'warning' | 'error', IconName> = {
	ok: 'check-circle',
	warning: 'alert-triangle',
	error: 'x-circle'
};

const meta = {
	title: 'UI Core/Icon',
	component: Icon,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		name: {
			control: { type: 'select' },
			options: [...ICON_NAMES],
			description: 'The icon to render, as a bare name. Unknown names are a compile error.'
		},
		size: {
			control: { type: 'select' },
			options: [...SIZES],
			description: 'The size preset for the icon.',
			table: { defaultValue: { summary: 'md' } }
		},
		className: {
			control: { type: 'text' },
			description:
				'Merged after the size preset, so a `size-*` utility here overrides the `size` prop.'
		}
	}
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		name: 'search'
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Icon } from '@repo/ui-core';

<Icon name='search' />`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		// `hidden: true` is required: Icon is always aria-hidden, so it is deliberately absent
		// from the accessibility tree and an ordinary role query would not reach it.
		const icon = canvas.getByRole('img', { hidden: true });

		await step('Renders an svg', async () => {
			await expect(icon).toBeInTheDocument();
			await expect(icon.tagName.toLowerCase()).toBe('svg');
		});

		await step('Is always decorative', async () => {
			await expect(icon).toHaveAttribute('aria-hidden', 'true');
		});

		await step('Uses the default size preset', async () => {
			await expect(icon).toHaveClass('size-4');
		});
	}
};

export const Sizes: Story = {
	args: {
		name: 'star'
	},
	argTypes: {
		// Each column hard-codes its own size so the whole scale is visible at once — a single
		// `size` control would have nothing to act on here.
		size: { control: false }
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `<Icon name='star' size='xs' />
<Icon name='star' size='sm' />
<Icon name='star' size='md' />
<Icon name='star' size='lg' />
<Icon name='star' size='xl' />`
			}
		}
	},
	render: (args) => (
		<div className='flex items-end gap-6'>
			{SIZES.map((size) => (
				<div key={size} className='flex flex-col items-center gap-2'>
					<Icon {...args} size={size} />
					<span className='text-muted-foreground text-xs'>
						{size} · {SIZE_PIXELS[size]}
					</span>
				</div>
			))}
		</div>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const icons = canvas.getAllByRole('img', { hidden: true });

		await step('Renders every size in the scale', async () => {
			await expect(icons).toHaveLength(SIZES.length);
		});

		await step('Applies the matching size class to each', async () => {
			await expect(icons[0]).toHaveClass('size-3');
			await expect(icons[4]).toHaveClass('size-6');
		});
	}
};

export const Showcase: Story = {
	args: {
		name: 'search',
		size: 'lg'
	},
	argTypes: {
		// Every name in the dictionary is rendered, so choosing a single one is meaningless here.
		name: { control: false }
	},
	parameters: {
		layout: 'padded',
		docs: {
			source: {
				language: 'tsx',
				code: `<Icon name='calendar' size='lg' />`
			}
		}
	},
	render: (args) => (
		<div className='grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-4'>
			{ICON_NAMES.map((name) => (
				<div
					key={name}
					className='flex flex-col items-center gap-2 rounded-md border p-3 text-center'
				>
					<Icon {...args} name={name} />
					<span className='text-muted-foreground text-xs break-all'>{name}</span>
				</div>
			))}
		</div>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Renders every name in the dictionary', async () => {
			const icons = canvas.getAllByRole('img', { hidden: true });
			await expect(icons).toHaveLength(ICON_NAMES.length);
		});
	}
};

export const WithClassName: Story = {
	args: {
		name: 'circle',
		className: 'size-2 **:fill-current text-primary'
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `// The size scale deliberately stops at 12px, so one-off treatments like a filled
// indicator dot go through className instead of earning their own token.
<Icon name='circle' className='size-2 **:fill-current text-primary' />`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const icon = canvas.getByRole('img', { hidden: true });

		await step('className overrides the size preset', async () => {
			await expect(icon).toHaveClass('size-2');
			await expect(icon).not.toHaveClass('size-4');
		});
	}
};

export const InButtonWithText: Story = {
	args: {
		name: 'check'
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Button, Icon } from '@repo/ui-core';

// No sizing needed — Button already sizes child icons to match Icon's default.
<Button>
	<Icon name='check' />
	Approve
</Button>`
			}
		}
	},
	render: (args) => (
		<Button>
			<Icon {...args} />
			Approve
		</Button>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('The visible text names the button, not the icon', async () => {
			const button = canvas.getByRole('button', { name: /approve/i });
			await expect(button).toBeInTheDocument();
		});

		await step('The icon stays decorative', async () => {
			const icon = canvas.getByRole('img', { hidden: true });
			await expect(icon).toHaveAttribute('aria-hidden', 'true');
		});
	}
};

export const InIconOnlyButton: Story = {
	args: {
		name: 'x'
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Button, Icon } from '@repo/ui-core';

// The icon names nothing, so the button must carry an aria-label.
<Button variant='ghost' size='icon' aria-label='Delete item'>
	<Icon name='x' />
</Button>`
			}
		}
	},
	render: (args) => (
		<Button variant='ghost' size='icon' aria-label='Delete item'>
			<Icon {...args} />
		</Button>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('The aria-label supplies the accessible name', async () => {
			const button = canvas.getByRole('button', { name: /delete item/i });
			await expect(button).toBeInTheDocument();
		});
	}
};

export const AsLoadingSpinner: Story = {
	args: {
		name: 'loader-circle',
		className: 'animate-spin'
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Button, Icon } from '@repo/ui-core';

// Icon has no animation prop — the spin is applied through className.
<Button disabled aria-busy='true'>
	<Icon name='loader-circle' className='animate-spin' />
	Saving…
</Button>`
			}
		}
	},
	render: (args) => (
		<Button disabled aria-busy='true'>
			<Icon {...args} />
			Saving…
		</Button>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('The button reports itself as busy and disabled', async () => {
			const button = canvas.getByRole('button', { name: /saving/i, hidden: true });
			await expect(button).toHaveAttribute('aria-busy', 'true');
			await expect(button).toBeDisabled();
		});
	}
};

export const InListItem: Story = {
	args: {
		name: 'calendar',
		className: 'text-muted-foreground'
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `<li className='flex items-center gap-2'>
	<Icon name='calendar' className='text-muted-foreground' />
	<span>Release date</span>
</li>`
			}
		}
	},
	render: (args) => (
		<ul className='space-y-2 text-sm'>
			<li className='flex items-center gap-2'>
				<Icon {...args} />
				<span>Release date</span>
			</li>
		</ul>
	)
};

export const ChosenAtRuntime: Story = {
	args: {
		name: 'check-circle'
	},
	argTypes: {
		// The rendered icons come from the STATUS_ICONS lookup, not from a single name.
		name: { control: false }
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Icon, type IconName } from '@repo/ui-core';

// A typed lookup keeps runtime-chosen icons safe: TypeScript flags an unhandled
// status or a misspelled name.
const STATUS_ICONS: Record<'ok' | 'warning' | 'error', IconName> = {
	ok: 'check-circle',
	warning: 'alert-triangle',
	error: 'x-circle'
};

<Icon name={STATUS_ICONS[status]} />`
			}
		}
	},
	render: (args) => (
		<div className='flex items-center gap-6 text-sm'>
			{(Object.keys(STATUS_ICONS) as (keyof typeof STATUS_ICONS)[]).map((status) => (
				<span key={status} className='flex items-center gap-2'>
					<Icon {...args} name={STATUS_ICONS[status]} />
					{status}
				</span>
			))}
		</div>
	)
};
