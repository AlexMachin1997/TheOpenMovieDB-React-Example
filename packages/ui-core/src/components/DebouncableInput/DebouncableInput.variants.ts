import { cva } from 'class-variance-authority';

export const debouncableInputVariants = cva(
	'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent px-3 py-2 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50'
);
