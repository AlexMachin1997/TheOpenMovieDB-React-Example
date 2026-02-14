import { cva } from 'class-variance-authority';

export const alertVariants = cva(
	'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
	{
		variants: {
			variant: {
				default: 'bg-card text-card-foreground',
				destructive:
					'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
				success:
					'text-green-600 bg-green-50 border-green-200 [&>svg]:text-current *:data-[slot=alert-description]:text-green-600/90 dark:text-green-400 dark:bg-green-950/20 dark:border-green-800',
				warning:
					'text-amber-600 bg-amber-50 border-amber-200 [&>svg]:text-current *:data-[slot=alert-description]:text-amber-600/90 dark:text-amber-400 dark:bg-amber-950/20 dark:border-amber-800',
				error:
					'text-red-600 bg-red-50 border-red-200 [&>svg]:text-current *:data-[slot=alert-description]:text-red-600/90 dark:text-red-400 dark:bg-red-950/20 dark:border-red-800'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
);
