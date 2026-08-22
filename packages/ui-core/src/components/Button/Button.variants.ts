import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
	// Two additions worth knowing about:
	//
	// - The `aria-disabled:*` rules mirror the `disabled:*` ones. `disabled` is meaningless on the
	//   div or anchor an `asChild` Button can render, so `aria-disabled` is what actually stops
	//   pointer events and dims those elements.
	// - The pressed treatment is `scale-[0.97]` plus a tight, variant-tinted `shadow-sm`. Both
	//   triggers produce the same look: `:active` covers pointer presses on any element, and
	//   `data-pressed` is set by Button from `useKeyboardActivation` for keyboard presses.
	//
	//   The scale is doing most of the work. A shadow that *grows* on press reads as the button
	//   lifting off the page — the elevation metaphor — which is the opposite of being pressed, and
	//   an earlier version that relied on `shadow-md` alone was genuinely hard to notice for exactly
	//   that reason. Shrinking the button and pulling the shadow in tight (`shadow-sm`, close to the
	//   resting `shadow-xs`) reads as sinking instead. Each variant supplies its own shadow *colour*
	//   below, so the halo matches the button rather than being a generic grey.
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:cursor-not-allowed active:scale-[0.97] active:shadow-sm data-[pressed=true]:scale-[0.97] data-[pressed=true]:shadow-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				// Alphas run higher than they would for a large shadow: `shadow-sm` spreads over far
				// fewer pixels than `shadow-md`, so the tint has to be stronger to stay legible.
				default:
					'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 active:shadow-primary/60 data-[pressed=true]:shadow-primary/60',
				destructive:
					'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 active:shadow-destructive/60 data-[pressed=true]:shadow-destructive/60',
				outline:
					'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 active:shadow-foreground/30 data-[pressed=true]:shadow-foreground/30',
				// `secondary` and `ghost` glow with their *foreground* token, not their surface one:
				// `--secondary` and `--accent` are both near-white in the light theme, so a shadow
				// tinted with them is invisible against the page. The foreground is the colour that
				// actually reads as "this button", and it inverts correctly in dark mode.
				secondary:
					'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 active:shadow-secondary-foreground/35 data-[pressed=true]:shadow-secondary-foreground/35',
				ghost:
					'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 active:shadow-accent-foreground/30 data-[pressed=true]:shadow-accent-foreground/30',
				link: 'text-primary underline-offset-4 hover:underline active:shadow-primary/40 data-[pressed=true]:shadow-primary/40'
			},
			size: {
				default: 'h-9 px-4 py-4 has-[>svg]:px-3',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				icon: 'size-7'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
);
