import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Button } from '~/components/Button/Button';
import { Icon } from '~/components/Icon/Icon';
import { ICON_NAMES } from '~/components/Icon/Icon.constants';

const VARIANTS = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;

/**
 * A `<div>`-backed control — the case `asChild` cannot handle on its own. It has no native
 * keyboard behaviour whatsoever, so everything it responds to comes from Button.
 */
const CustomTarget = ({ children, ...props }: React.ComponentPropsWithRef<'div'>) => (
	<div {...props}>{children}</div>
);

/**
 * Swaps `console.warn` for a spy for the lifetime of a story.
 *
 * The diagnostic fires while Button renders, which is before `play()` runs — so the spy has to be
 * installed in `beforeEach`, not inside the test body.
 */
const captureConsoleWarn = (spy: ReturnType<typeof fn>) => () => {
	const original = console.warn;
	spy.mockClear();
	console.warn = spy;

	return () => {
		console.warn = original;
	};
};

/** Button's own diagnostics, ignoring any unrelated warning that happened to land on the spy. */
const buttonWarnings = (spy: ReturnType<typeof fn>) =>
	spy.mock.calls
		.map((call) => String(call[0]))
		.filter((message) => message.startsWith('[ui-core] Button'));

const meta = {
	title: 'UI Core/Button',
	component: Button,
	parameters: {
		layout: 'centered',
		a11y: {
			// Scoped to Button deliberately. The rest of the library has its own pre-existing
			// violations, so turning this on globally in one go isn't realistic — see
			// docs/components/02-button-enhancements/spec.md, Accessibility.
			test: 'error'
		}
	},
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: [...VARIANTS]
		},
		size: {
			control: { type: 'select' },
			options: ['default', 'sm', 'lg', 'icon']
		},
		startIcon: {
			control: { type: 'select' },
			options: [...ICON_NAMES],
			description: 'An icon rendered before the children. Decorative.'
		},
		endIcon: {
			control: { type: 'select' },
			options: [...ICON_NAMES],
			description: 'An icon rendered after the children. Replaced by the spinner while loading.'
		},
		loading: {
			control: { type: 'boolean' },
			table: { defaultValue: { summary: 'false' } }
		},
		disabled: { control: { type: 'boolean' } },
		asChild: { control: { type: 'boolean' } }
	}
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Button'
	}
};

export const Variants: Story = {
	render: () => (
		<div className='flex flex-wrap gap-4'>
			<Button variant='default'>Default</Button>
			<Button variant='destructive'>Destructive</Button>
			<Button variant='outline'>Outline</Button>
			<Button variant='secondary'>Secondary</Button>
			<Button variant='ghost'>Ghost</Button>
			<Button variant='link'>Link</Button>
		</div>
	)
};

export const Sizes: Story = {
	render: () => (
		<div className='flex items-center gap-4'>
			<Button size='sm'>Small</Button>
			<Button size='default'>Default</Button>
			<Button size='lg'>Large</Button>
			<Button size='icon' aria-label='Search'>
				<Icon name='search' />
			</Button>
		</div>
	)
};

export const Interactive: Story = {
	args: {
		children: 'Click me!',
		variant: 'default',
		size: 'default'
	}
};

export const AsChild: Story = {
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `// Button lends its styling and behaviour to whatever you pass it.
<Button asChild><a href='#example'>Link Button</a></Button>
<Button asChild variant='outline'><span>Span Button</span></Button>`
			}
		}
	},
	render: () => (
		<div className='flex gap-4'>
			<Button asChild>
				<a href='#example'>Link Button</a>
			</Button>
			<Button asChild variant='outline'>
				<span>Span Button</span>
			</Button>
		</div>
	)
};

/* -------------------------------------------------------------------------------------------------
 * type
 * ---------------------------------------------------------------------------------------------- */

/** The form's own submit handler, kept out of `args` — it belongs to the story, not to Button. */
const onFormSubmit = fn();

export const InAForm: Story = {
	beforeEach: () => {
		onFormSubmit.mockClear();
	},
	argTypes: {
		// The story renders two buttons of its own; a single set of controls has nothing to act on.
		children: { control: false }
	},
	parameters: {
		layout: 'padded',
		docs: {
			source: {
				language: 'tsx',
				code: `import { Button } from '@repo/ui-core';

// Button defaults to type='button', so this cannot submit the form by accident.
<form onSubmit={onSubmit}>
	<Button onClick={onCancel}>Cancel</Button>
	<Button type='submit'>Save</Button>
</form>`
			}
		}
	},
	render: () => (
		<form
			className='flex gap-4'
			onSubmit={(event) => {
				event.preventDefault();
				onFormSubmit(event);
			}}
		>
			<Button>Cancel</Button>
			<Button type='submit'>Save</Button>
		</form>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const cancel = canvas.getByRole('button', { name: 'Cancel' });
		const save = canvas.getByRole('button', { name: 'Save' });

		await step('A Button with no type prop defaults to type="button"', async () => {
			await expect(cancel).toHaveAttribute('type', 'button');
		});

		await step('So clicking it does not submit the surrounding form', async () => {
			await userEvent.click(cancel);
			await expect(onFormSubmit).not.toHaveBeenCalled();
		});

		await step('An explicit type="submit" is not overridden by the default', async () => {
			await expect(save).toHaveAttribute('type', 'submit');
			await userEvent.click(save);
			await expect(onFormSubmit).toHaveBeenCalledTimes(1);
		});
	}
};

/* -------------------------------------------------------------------------------------------------
 * Icons
 * ---------------------------------------------------------------------------------------------- */

export const WithIcons: Story = {
	argTypes: {
		startIcon: { control: false },
		endIcon: { control: false }
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Button } from '@repo/ui-core';

// Icons are named, not imported — sizing, spacing and aria-hidden are handled for you.
<Button startIcon='plus'>Add Item</Button>
<Button variant='outline' endIcon='download'>Download</Button>
<Button variant='secondary' startIcon='check' endIcon='chevron-right'>Continue</Button>`
			}
		}
	},
	render: () => (
		<div className='flex flex-wrap gap-4'>
			<Button startIcon='plus'>Add Item</Button>
			<Button variant='outline' endIcon='download'>
				Download
			</Button>
			<Button variant='secondary' startIcon='check' endIcon='chevron-right'>
				Continue
			</Button>
		</div>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('startIcon renders before the text', async () => {
			const button = canvas.getByRole('button', { name: 'Add Item' });
			await expect(button.firstElementChild).toHaveAttribute('data-slot', 'icon');
			await expect(button.firstElementChild).toHaveClass('size-4');
		});

		await step('endIcon renders after the text', async () => {
			const button = canvas.getByRole('button', { name: 'Download' });
			await expect(button.lastElementChild).toHaveAttribute('data-slot', 'icon');
			await expect(button.firstElementChild).toBe(button.lastElementChild);
		});

		await step('Both render simultaneously, in their respective positions', async () => {
			const button = canvas.getByRole('button', { name: 'Continue' });
			const icons = button.querySelectorAll('[data-slot="icon"]');
			await expect(icons).toHaveLength(2);
			await expect(button.firstElementChild).toBe(icons[0]);
			await expect(button.lastElementChild).toBe(icons[1]);
		});

		await step('Every icon is decorative, so none of them names its button', async () => {
			for (const icon of canvasElement.querySelectorAll('[data-slot="icon"]')) {
				await expect(icon).toHaveAttribute('aria-hidden', 'true');
			}
		});
	}
};

export const IconSizesAcrossButtonSizes: Story = {
	argTypes: {
		size: { control: false },
		startIcon: { control: false }
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `// The icon stays at 16px across the whole size scale — only the button's padding changes.
<Button size='sm' startIcon='check'>Small</Button>
<Button size='default' startIcon='check'>Default</Button>
<Button size='lg' startIcon='check'>Large</Button>
<Button size='icon' aria-label='Confirm' startIcon='check' />`
			}
		}
	},
	render: () => (
		<div className='flex items-center gap-4'>
			<Button size='sm' startIcon='check'>
				Small
			</Button>
			<Button size='default' startIcon='check'>
				Default
			</Button>
			<Button size='lg' startIcon='check'>
				Large
			</Button>
			<Button size='icon' aria-label='Confirm' startIcon='check' />
		</div>
	),
	play: async ({ canvasElement, step }) => {
		await step('Icons are sized identically at every button size', async () => {
			const icons = canvasElement.querySelectorAll('[data-slot="icon"]');
			await expect(icons).toHaveLength(4);

			for (const icon of icons) {
				await expect(icon).toHaveClass('size-4');
			}
		});
	}
};

/* -------------------------------------------------------------------------------------------------
 * Loading
 * ---------------------------------------------------------------------------------------------- */

export const Loading: Story = {
	args: {
		children: 'Save changes',
		endIcon: 'chevron-right',
		loading: true
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Button } from '@repo/ui-core';

// The spinner takes the end icon's place. The label is deliberately unchanged, so the
// button doesn't rename itself out from under a screen reader mid-action.
<Button endIcon='chevron-right' loading={isSaving}>Save changes</Button>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'Save changes', hidden: true });

		await step('The spinner replaces the end icon', async () => {
			const icons = button.querySelectorAll('[data-slot="icon"]');
			await expect(icons).toHaveLength(1);
			await expect(button.lastElementChild).toHaveClass('animate-spin');
		});

		await step('The button reports itself as busy', async () => {
			await expect(button).toHaveAttribute('aria-busy', 'true');
		});

		await step('And as disabled, both natively and explicitly', async () => {
			await expect(button).toBeDisabled();
			await expect(button).toHaveAttribute('aria-disabled', 'true');
		});

		await step('The accessible name is unchanged from the non-loading state', async () => {
			await expect(button).toHaveTextContent('Save changes');
		});
	}
};

export const LoadingWithoutEndIcon: Story = {
	args: {
		children: 'Submitting',
		loading: true
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `// No endIcon to replace — the spinner still occupies the end position.
<Button loading>Submitting</Button>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'Submitting', hidden: true });

		await step('The spinner still renders at the end position', async () => {
			await expect(button.lastElementChild).toHaveAttribute('data-slot', 'icon');
			await expect(button.lastElementChild).toHaveClass('animate-spin');
		});
	}
};

export const LoadingWithStartIcon: Story = {
	args: {
		children: 'Uploading',
		startIcon: 'plus',
		endIcon: 'chevron-right',
		loading: true
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `// Only the end slot is taken over — a leading icon stays put.
<Button startIcon='plus' endIcon='chevron-right' loading>Uploading</Button>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'Uploading', hidden: true });

		await step('The start icon survives', async () => {
			await expect(button.firstElementChild).toHaveAttribute('data-slot', 'icon');
			await expect(button.firstElementChild).not.toHaveClass('animate-spin');
		});

		await step('Only the end icon was replaced', async () => {
			await expect(button.lastElementChild).toHaveClass('animate-spin');
			await expect(button.querySelectorAll('[data-slot="icon"]')).toHaveLength(2);
		});
	}
};

export const LoadingBlocksOnClick: Story = {
	args: {
		children: 'Processing',
		loading: true,
		onClick: fn()
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `// A loading Button is genuinely inert — no need to also guard the handler yourself.
<Button loading onClick={onSubmit}>Processing</Button>`
			}
		}
	},
	play: async ({ args, canvasElement, step }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'Processing', hidden: true });

		await step('Clicking does not fire onClick', async () => {
			// A direct DOM click rather than userEvent: the button sets `pointer-events: none` while
			// loading, so userEvent would refuse to click it and prove nothing about the handler.
			button.click();
			await expect(args.onClick).not.toHaveBeenCalled();
		});

		await step('Neither does activating it from the keyboard', async () => {
			button.focus();
			await userEvent.keyboard('{Enter}');
			await userEvent.keyboard('[Space]');
			await expect(args.onClick).not.toHaveBeenCalled();
		});
	}
};

export const LoadingVariants: Story = {
	argTypes: {
		variant: { control: false },
		loading: { control: false }
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `<Button variant='destructive' loading>Deleting</Button>`
			}
		}
	},
	render: () => (
		<div className='flex flex-wrap gap-4'>
			{VARIANTS.map((variant) => (
				<Button key={variant} variant={variant} loading>
					{variant}
				</Button>
			))}
		</div>
	),
	play: async ({ canvasElement, step }) => {
		await step('Every variant shows a spinner and reports itself busy', async () => {
			const buttons = canvasElement.querySelectorAll('[data-slot="button"]');
			await expect(buttons).toHaveLength(VARIANTS.length);

			for (const button of buttons) {
				await expect(button).toHaveAttribute('aria-busy', 'true');
				await expect(button.lastElementChild).toHaveClass('animate-spin');
			}
		});
	}
};

/* -------------------------------------------------------------------------------------------------
 * Disabled
 * ---------------------------------------------------------------------------------------------- */

export const Disabled: Story = {
	render: () => (
		<div className='flex flex-wrap gap-4'>
			{VARIANTS.map((variant) => (
				<Button key={variant} variant={variant} disabled>
					Disabled {variant}
				</Button>
			))}
		</div>
	),
	play: async ({ canvasElement, step }) => {
		await step('Disabled is expressed both natively and explicitly', async () => {
			const buttons = canvasElement.querySelectorAll('[data-slot="button"]');
			await expect(buttons).toHaveLength(VARIANTS.length);

			for (const button of buttons) {
				await expect(button).toBeDisabled();
				await expect(button).toHaveAttribute('aria-disabled', 'true');
			}
		});

		await step('But not busy — nothing is in flight', async () => {
			const button = canvasElement.querySelector('[data-slot="button"]');
			await expect(button).not.toHaveAttribute('aria-busy');
		});
	}
};

export const DisabledAndLoading: Story = {
	args: {
		children: 'Both',
		disabled: true,
		loading: true
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `// Loading adds nothing disabled doesn't already cover, but aria-busy still tracks
// loading specifically — so assistive tech can tell "unavailable" from "working".
<Button disabled loading>Both</Button>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'Both', hidden: true });

		await step('It behaves as disabled', async () => {
			await expect(button).toBeDisabled();
			await expect(button).toHaveAttribute('aria-disabled', 'true');
		});

		await step('And aria-busy still reflects loading specifically', async () => {
			await expect(button).toHaveAttribute('aria-busy', 'true');
		});
	}
};

/* -------------------------------------------------------------------------------------------------
 * Keyboard activation
 * ---------------------------------------------------------------------------------------------- */

export const NativeKeyboardActivation: Story = {
	args: {
		children: 'Native button',
		onClick: fn()
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `// Nothing to configure — a real button already handles Enter and Space, and Button
// is careful not to synthesise a second activation on top of it.
<Button onClick={onClick}>Native button</Button>`
			}
		}
	},
	play: async ({ args, canvasElement, step }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'Native button' });

		button.focus();

		await step('Enter fires onClick exactly once', async () => {
			await userEvent.keyboard('{Enter}');
			await expect(args.onClick).toHaveBeenCalledTimes(1);
		});

		await step('Space fires onClick exactly once', async () => {
			await userEvent.keyboard('[Space]');
			await expect(args.onClick).toHaveBeenCalledTimes(2);
		});

		await step('No redundant button semantics are added to a real button', async () => {
			await expect(button).not.toHaveAttribute('role');
			await expect(button).not.toHaveAttribute('tabindex');
		});
	}
};

export const KeyboardActivation: Story = {
	args: {
		asChild: true,
		onClick: fn()
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Button } from '@repo/ui-core';

// A div-backed control is inert to a keyboard on its own. Button gives it role="button",
// makes it focusable, and wires Enter/Space up to the same behaviour as a click.
<Button asChild onClick={onClick}>
	<CustomTarget>Custom element</CustomTarget>
</Button>`
			}
		}
	},
	render: (args) => (
		<Button {...args}>
			<CustomTarget>Custom element</CustomTarget>
		</Button>
	),
	play: async ({ args, canvasElement, step }) => {
		const canvas = within(canvasElement);
		const target = canvas.getByRole('button', { name: 'Custom element' });

		await step('The non-native element is given button semantics and made focusable', async () => {
			await expect(target).toHaveAttribute('role', 'button');
			await expect(target).toHaveAttribute('tabindex', '0');
		});

		target.focus();

		await step('Enter fires onClick exactly once', async () => {
			await userEvent.keyboard('{Enter}');
			await expect(args.onClick).toHaveBeenCalledTimes(1);
		});

		await step('Space fires onClick exactly once', async () => {
			await userEvent.keyboard('[Space]');
			await expect(args.onClick).toHaveBeenCalledTimes(2);
		});
	}
};

export const AsChildAnchor: Story = {
	args: {
		asChild: true,
		// The spy also suppresses the navigation. Both activations here end in a real click on a
		// real link, and letting the test page actually navigate tears down the test runner.
		onClick: fn((event: React.MouseEvent) => {
			event.preventDefault();
		})
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `// An anchor activates on Enter natively, so only Space is synthesised — Enter is
// deliberately left alone rather than being fired twice.
<Button asChild>
	<a href='#somewhere'>Link button</a>
</Button>`
			}
		}
	},
	render: (args) => (
		<Button {...args}>
			<a href='#as-child-anchor'>Link button</a>
		</Button>
	),
	play: async ({ args, canvasElement, step }) => {
		const canvas = within(canvasElement);
		const link = canvas.getByRole('link', { name: 'Link button' });

		await step('A real link keeps its own semantics', async () => {
			await expect(link).not.toHaveAttribute('role');
			await expect(link).not.toHaveAttribute('type');
		});

		link.focus();

		await step('Enter fires once — natively, not doubled by the new mechanism', async () => {
			await userEvent.keyboard('{Enter}');
			await expect(args.onClick).toHaveBeenCalledTimes(1);
		});

		await step('Space fires once — synthesised, since anchors ignore it', async () => {
			await userEvent.keyboard('[Space]');
			await expect(args.onClick).toHaveBeenCalledTimes(2);
		});
	}
};

export const AsChildNativeButton: Story = {
	args: {
		asChild: true,
		onClick: fn()
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `// asChild wrapping a real button is still a real button — no synthesised keys,
// no redundant role, and the type default still applies.
<Button asChild>
	<button>Wrapped native button</button>
</Button>`
			}
		}
	},
	render: (args) => (
		<Button {...args}>
			<button>Wrapped native button</button>
		</Button>
	),
	play: async ({ args, canvasElement, step }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'Wrapped native button' });

		await step('It is treated as the native button it is', async () => {
			await expect(button).not.toHaveAttribute('role');
			await expect(button).not.toHaveAttribute('tabindex');
			await expect(button).toHaveAttribute('type', 'button');
		});

		button.focus();

		await step('Enter fires onClick exactly once', async () => {
			await userEvent.keyboard('{Enter}');
			await expect(args.onClick).toHaveBeenCalledTimes(1);
		});
	}
};

export const AsChildLoading: Story = {
	args: {
		asChild: true,
		loading: true
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `// A div can't carry the disabled attribute, so the same semantics are expressed
// through aria-disabled — which also drives the dimmed, non-interactive styling.
<Button asChild loading>
	<CustomTarget>Saving</CustomTarget>
</Button>`
			}
		}
	},
	render: (args) => (
		<Button {...args}>
			<CustomTarget>Saving</CustomTarget>
		</Button>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const target = canvas.getByRole('button', { name: 'Saving', hidden: true });

		await step('Disabled and busy semantics still apply', async () => {
			await expect(target).toHaveAttribute('aria-disabled', 'true');
			await expect(target).toHaveAttribute('aria-busy', 'true');
		});

		await step('Without an invalid disabled attribute on a non-form element', async () => {
			await expect(target).not.toHaveAttribute('disabled');
		});

		await step('And the spinner renders', async () => {
			await expect(target.lastElementChild).toHaveClass('animate-spin');
		});
	}
};

export const ConsumerKeyHandlerPreserved: Story = {
	args: {
		children: 'Both handlers run',
		onClick: fn(),
		onKeyDown: fn()
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `// Your own key handler is composed with Button's, not replaced by it. Call
// event.preventDefault() in yours to opt out of the built-in activation for that press.
<Button onKeyDown={onKeyDown} onClick={onClick}>Both handlers run</Button>`
			}
		}
	},
	play: async ({ args, canvasElement, step }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'Both handlers run' });

		button.focus();

		await step("The caller's own onKeyDown still fires", async () => {
			await userEvent.keyboard('{Enter}');
			await expect(args.onKeyDown).toHaveBeenCalled();
		});

		await step('And activation is unaffected', async () => {
			await expect(args.onClick).toHaveBeenCalledTimes(1);
		});
	}
};

/* -------------------------------------------------------------------------------------------------
 * Pressed state
 * ---------------------------------------------------------------------------------------------- */

export const PressedVisualState: Story = {
	argTypes: {
		asChild: { control: false }
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `// Holding Enter or Space marks the button pressed, whatever it renders as — so a
// div-backed button feels identical to a native one.
<Button>Native</Button>
<Button asChild><CustomTarget>Custom</CustomTarget></Button>`
			}
		}
	},
	render: () => (
		<div className='flex gap-4'>
			<Button>Native</Button>
			<Button asChild>
				<CustomTarget>Custom</CustomTarget>
			</Button>
		</div>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		// A session rather than the one-shot API: holding a key down in one call and releasing it
		// in the next only works if both share the same keyboard state.
		const user = userEvent.setup();

		for (const name of ['Native', 'Custom']) {
			const element = canvas.getByRole('button', { name });
			element.focus();

			await step(`${name}: holding Space engages the pressed state`, async () => {
				await user.keyboard('[Space>]');
				await expect(element).toHaveAttribute('data-pressed', 'true');
			});

			await step(`${name}: releasing clears it`, async () => {
				await user.keyboard('[/Space]');
				await expect(element).not.toHaveAttribute('data-pressed');
			});

			await step(`${name}: holding Enter engages it too`, async () => {
				await user.keyboard('[Enter>]');
				await expect(element).toHaveAttribute('data-pressed', 'true');
				await user.keyboard('[/Enter]');
				await expect(element).not.toHaveAttribute('data-pressed');
			});
		}
	}
};

export const PressedGlowVariants: Story = {
	argTypes: {
		variant: { control: false }
	},
	parameters: {
		layout: 'padded',
		docs: {
			source: {
				language: 'tsx',
				code: `// The pressed glow takes its colour from the variant, so it reads as the same
// button rather than a generic grey shadow. Nothing to opt into — it's built in.
<Button variant='destructive'>Destructive</Button>`
			}
		}
	},
	render: () => (
		<div className='flex flex-wrap items-center gap-4'>
			{VARIANTS.map((variant) => (
				<Button key={variant} variant={variant}>
					{variant}
				</Button>
			))}
		</div>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const user = userEvent.setup();
		const button = canvas.getByRole('button', { name: 'destructive' });

		button.focus();

		await step('The glow is driven by data-pressed, on every variant alike', async () => {
			await user.keyboard('[Space>]');
			await expect(button).toHaveAttribute('data-pressed', 'true');
			await user.keyboard('[/Space]');
			await expect(button).not.toHaveAttribute('data-pressed');
		});
	}
};

/**
 * The button disables itself from its own keydown handler, which is the realistic version of the
 * race: an async action starts, the button becomes busy, and the keyup that would normally clear
 * the pressed state never arrives because the element is disabled by then.
 */
const PressedThenDisabled = () => {
	const [loading, setLoading] = React.useState(false);

	return (
		<Button
			loading={loading}
			onKeyDown={() => {
				setLoading(true);
			}}
		>
			Save
		</Button>
	);
};

export const PressedStateClearsWhenDisabled: Story = {
	argTypes: {
		loading: { control: false }
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `// If the button becomes disabled or loading mid-press, the pressed treatment clears
// immediately rather than waiting for a keyup that a disabled element never receives.
const [loading, setLoading] = useState(false);

<Button loading={loading} onKeyDown={() => setLoading(true)}>Save</Button>`
			}
		}
	},
	render: () => <PressedThenDisabled />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const user = userEvent.setup();
		const button = canvas.getByRole('button', { name: 'Save' });

		button.focus();

		await step('Holding Space both presses the button and starts the action', async () => {
			await user.keyboard('[Space>]');
			await expect(canvas.getByRole('button', { name: 'Save', hidden: true })).toHaveAttribute(
				'aria-busy',
				'true'
			);
		});

		await step('The pressed state is gone in that same update, not left stuck', async () => {
			await expect(canvas.getByRole('button', { name: 'Save', hidden: true })).not.toHaveAttribute(
				'data-pressed'
			);
		});

		await user.keyboard('[/Space]');
	}
};

/* -------------------------------------------------------------------------------------------------
 * Icon-only accessibility
 * ---------------------------------------------------------------------------------------------- */

const labelledWarnSpy = fn();

export const IconOnlyWithLabel: Story = {
	args: {
		size: 'icon',
		variant: 'ghost',
		startIcon: 'x',
		'aria-label': 'Dismiss'
	},
	beforeEach: captureConsoleWarn(labelledWarnSpy),
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Button } from '@repo/ui-core';

// The icon is decorative, so the button itself has to carry the name.
<Button size='icon' variant='ghost' startIcon='x' aria-label='Dismiss' />`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('The aria-label supplies the accessible name', async () => {
			await expect(canvas.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
		});

		await step('No diagnostic is emitted', async () => {
			await expect(buttonWarnings(labelledWarnSpy)).toHaveLength(0);
		});
	}
};

const unlabelledWarnSpy = fn();

export const IconOnlyWithoutLabel: Story = {
	args: {
		size: 'icon',
		variant: 'ghost',
		startIcon: 'x'
	},
	beforeEach: captureConsoleWarn(unlabelledWarnSpy),
	parameters: {
		// This story exists to prove the diagnostic fires; the button it renders is, by design, the
		// broken case axe is right to reject.
		a11y: { test: 'off' },
		docs: {
			source: {
				language: 'tsx',
				code: `// ✗ Nothing names this button — the icon is aria-hidden. Button warns in the
// console rather than throwing, so you find out while building it.
<Button size='icon' variant='ghost' startIcon='x' />`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		await step('The button still renders — the diagnostic never throws', async () => {
			await expect(canvasElement.querySelector('[data-slot="button"]')).toBeInTheDocument();
		});

		await step('A diagnostic is emitted naming the omission', async () => {
			const warnings = buttonWarnings(unlabelledWarnSpy);
			await expect(warnings.length).toBeGreaterThan(0);
			await expect(warnings[0]).toContain('accessible name');
		});
	}
};
