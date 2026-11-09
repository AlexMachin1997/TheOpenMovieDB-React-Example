/** A source the browser can actually request. Empty and whitespace-only strings are not. */
export const isUsableSrc = (src: string | null | undefined): src is string =>
	typeof src === 'string' && src.trim() !== '';
