import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function that combines class names using clsx and tailwind-merge.
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
