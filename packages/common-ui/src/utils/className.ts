import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function that combines class names using clsx and tailwind-merge.
 * This function is designed to work with Tailwind CSS classes and provides
 * proper class merging and deduplication.
 *
 * @param inputs - Class values to be combined (strings, objects, arrays, etc.)
 * @returns A string of merged Tailwind CSS classes
 *
 * @example
 * ```tsx
 * cn("bg-blue-500", "text-white", { "p-4": true, "m-2": false })
 * // Returns: "bg-blue-500 text-white p-4"
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
